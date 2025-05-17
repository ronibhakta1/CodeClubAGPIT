// src/server.ts
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// Zod Schema (define at top)
const MemberSchema = z.object({
  name: z.string().min(2),
  email: z.string().email()
});

// Add this route with your other endpoints
app.post('/members', async (req, res) => {
  try {
    const data = MemberSchema.parse(req.body);
    const member = await prisma.member.create({ data });
    res.json(member);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.errors
      });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});