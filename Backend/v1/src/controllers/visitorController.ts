import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const incrementPageViews = async (req: Request, res: Response) => {
    try {
        const visitor = await prisma.visitor.create({
            data: {
                id: crypto.randomUUID(),
                ipAddress: req.ip || 'Unknown',
                visitDate: new Date(),
                pageVisited: req.headers.referer || 'Unknown',
                browserInfo: req.headers['user-agent'] || 'Unknown',
                deviceType: req.headers['user-agent']?.includes('Mobile') ? 'Mobile' : 'Desktop',
            },
        });
        res.status(200).json({ success: true, visitor });
    } catch (error) {
        console.error('Error incrementing page views:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

export const getPageViewsCount = async (req: Request, res: Response) => {
    try {
        const count = await prisma.visitor.count();
        res.status(200).json({ count });
    } catch (error) {
        console.error('Error getting page views count:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}; 