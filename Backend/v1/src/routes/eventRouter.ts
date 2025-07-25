import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { cors } from 'hono/cors';

// Define the events router
const eventsRouter = new Hono();

// Initialize Prisma client
const prisma = new PrismaClient({
  datasourceUrl: process.env.DIRECT_URL
}).$extends(withAccelerate());

// Apply CORS middleware for events routes
eventsRouter.use('/*', cors({
  origin: ['http://localhost:5173', 'https://codeclubagpit.vercel.app'],
  allowMethods: ['GET', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}));

// Handle preflight requests
eventsRouter.options('*', (c) => {
  return new Response(null, { status: 204 });
});

// Events route
eventsRouter.get('/events', async (c) => {
  try {
    const events = await prisma.event.findMany({
      select: {
        name1: true,
        year: true,
        detail: true,
        description: true,
        image1: true,
        image2: true,
        image3: true,
        status: true,
      },
    });

    return c.json({ success: true, events });
  } catch (error) {
    console.error('Events fetch error:', error);
    return c.json({ 
      success: false, 
      message: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

export default eventsRouter;