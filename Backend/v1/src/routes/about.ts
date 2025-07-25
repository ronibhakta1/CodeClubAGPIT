import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { cors } from 'hono/cors';

const aboutRouter = new Hono();

// Initialize Prisma client
const prisma = new PrismaClient({
  datasourceUrl: process.env.DIRECT_URL
}).$extends(withAccelerate());

aboutRouter.use('/*', cors({
  origin: ['http://localhost:5173', 'https://codeclubagpit.vercel.app'],
  allowMethods: ['GET', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}));

aboutRouter.options('*', (c) => {
  return new Response(null, { status: 204 });
});


aboutRouter.get('/board-members', async (c) => {
  try {
    const boardMembers = await prisma.boardMember.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        title: true,
        tagline: true,
        post: true,
      },
    });

    return c.json({ success: true, boardMembers });
  } catch (error) {
    console.error('Board members fetch error:', error);
    return c.json({ 
      success: false, 
      message: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

aboutRouter.get('/carousel-images', async (c) => {
  try {
    const images = await prisma.carouselImage.findMany({
      select: {
        id: true,
        image: true,
        title: true,
        tagline: true,
      },
    });

    return c.json({ success: true, images });
  } catch (error) {
    console.error('Carousel images fetch error:', error);
    return c.json({ 
      success: false, 
      message: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

export default aboutRouter;