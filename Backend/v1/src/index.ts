import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { cors } from 'hono/cors';

const app = new Hono();

// Add CORS middleware
app.use('/*', cors({
  origin: ['http://localhost:5173', 'https://codeclubagpit.vercel.app'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
  maxAge: 600,
  credentials: true,
}));

// Handle preflight requests
app.options('*', (c) => {
  return new Response(null, { status: 204 });
});

app.get("/", (c) => {
  return c.html(
    '<h1 style="text-align: center ; font-size: 50px">Code Club AGPIT</h1> <h2 style="text-align: center ; font-size: 30px">Backend API</h2> <p style="text-align: center ; font-size: 20px"> <a href="https://codeclubagpit.vercel.app/"> website link </p>'
  );
});

// Initialize Prisma client
const prisma = new PrismaClient({
  datasourceUrl: process.env.DIRECT_URL
}).$extends(withAccelerate());

// Test database connection
app.get('/test-db', async (c) => {
    try {
        console.log('Testing database connection...');
        await prisma.$connect();
        console.log('Database connection successful');
        return c.json({ success: true, message: 'Database connection successful' });
    } catch (error) {
        console.error('Database connection error:', error);
        return c.json({ 
            success: false, 
            error: 'Database connection failed',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, 500);
    }
});

// Page views endpoints
app.post('/page-views/increment', async (c) => {
    try {
        console.log('Increment page views request received');
        
        // Get client IP from Cloudflare headers
        const ip = c.req.header('cf-connecting-ip') || 
                  c.req.header('x-forwarded-for') || 
                  c.req.header('x-real-ip') || 
                  'Unknown';
        
        console.log('Client IP:', ip);

        // Always create a new visitor record
        console.log('Creating new visitor record...');
        const visitor = await prisma.visitor.create({
            data: {
                id: crypto.randomUUID(),
                ipAddress: ip,
                visitDate: new Date(),
                pageVisited: c.req.url,
                browserInfo: c.req.header('user-agent') || 'Unknown',
                deviceType: c.req.header('user-agent')?.includes('Mobile') ? 'Mobile' : 'Desktop'
            },
        });
        console.log('New visitor record created:', visitor);

        // Get the updated count
        const count = await prisma.visitor.count();
        console.log('Updated visitor count:', count);

        return c.json({ 
            success: true, 
            visitor, 
            isNew: true,
            count 
        });
    } catch (error) {
        console.error('Detailed error in incrementPageViews:', error);
        return c.json({ 
            success: false, 
            error: 'Internal server error',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, 500);
    }
});

app.get('/page-views/count', async (c) => {
    try {
        console.log('Getting total visitor count...');
        const count = await prisma.visitor.count();
        console.log('Total visitor count:', count);
        return c.json({ count });
    } catch (error) {
        console.error('Detailed error in getPageViewsCount:', error);
        return c.json({ 
            success: false, 
            error: 'Internal server error',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, 500);
    }
});

export default app;
