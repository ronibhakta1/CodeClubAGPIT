import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { z } from 'zod';
import { sign, verify } from 'hono/jwt';
import { hash, verify as argonVerify } from 'argon2';
import { cors } from 'hono/cors';

// Define the user router
const userRouter = new Hono();

// Initialize Prisma client
const prisma = new PrismaClient({
  datasourceUrl: process.env.DIRECT_URL
}).$extends(withAccelerate());

// Zod schemas for input validation (matching frontend)
const userSignupInput = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const userSigninInput = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

// Zod schema for board type validation
const boardTypeSchema = z.enum(['TY', 'SY', 'FY']);

// Apply CORS middleware specifically for user routes
userRouter.use('/*', cors({
  origin: ['http://localhost:5173', 'https://codeclubagpit.vercel.app'],
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}));

// Middleware to verify JWT
userRouter.use('/profile', async (c, next) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ success: false, message: 'Unauthorized: No token provided' }, 401);
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = await verify(token, process.env.JWT_SECRET || 'your-secret-key');
    c.set('jwtPayload', payload);
    await next();
  } catch (error) {
    return c.json({ success: false, message: 'Unauthorized: Invalid token' }, 401);
  }
});

// Handle preflight requests
userRouter.options('*', (c) => {
  return new Response(null, { status: 204 });
});

// Signup route
userRouter.post('/signup', async (c) => {
  try {
    const body = await c.req.json();
    const result = userSignupInput.safeParse(body);

    if (!result.success) {
      return c.json({ 
        success: false, 
        message: 'Invalid input',
        errors: result.error.issues 
      }, 400);
    }

    const { name, email, password } = result.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return c.json({ 
        success: false, 
        message: 'User with this email already exists' 
      }, 400);
    }

    // Hash password
    const hashedPassword = await hash(password);

    // Create new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Generate JWT
    const token = await sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key'
    );

    return c.text(token);
  } catch (error) {
    console.error('Signup error:', error);
    return c.json({ 
      success: false, 
      message: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Signin route
userRouter.post('/signin', async (c) => {
  try {
    const body = await c.req.json();
    const result = userSigninInput.safeParse(body);

    if (!result.success) {
      return c.json({ 
        success: false, 
        message: 'Invalid input',
        errors: result.error.issues 
      }, 400);
    }

    const { email, password } = result.data;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return c.json({ 
        success: false, 
        message: 'Invalid email or password' 
      }, 401);
    }

    // Verify password
    const isPasswordValid = await argonVerify(user.password, password);
    
    if (!isPasswordValid) {
      return c.json({ 
        success: false, 
        message: 'Invalid email or password' 
      }, 401);
    }

    // Generate JWT
    const token = await sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key'
    );

    return c.text(token);
  } catch (error) {
    console.error('Signin error:', error);
    return c.json({ 
      success: false, 
      message: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Profile route
userRouter.get('/profile', async (c) => {
  try {
    const payload = c.get('jwtPayload');
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        skills: true,
        bio: true,
      },
    });

    if (!user) {
      return c.json({ success: false, message: 'User not found' }, 404);
    }

    return c.json({ success: true, user });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return c.json({ 
      success: false, 
      message: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});


export default userRouter;