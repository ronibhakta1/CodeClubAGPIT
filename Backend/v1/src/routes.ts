import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()
app.use(express.json())

// Get all members
app.get('/members', async (req, res) => {
  const members = await prisma.member.findMany()
  res.json(members)
})

// Increment visitor count
app.post('/visitors', async (req, res) => {
  const { page } = req.body
  
  const visitor = await prisma.visitor.upsert({
    where: { page },
    create: { page, count: 1, total: 1 },
    update: { 
      count: { increment: 1 },
      total: { increment: 1 }
    }
  })
  
  res.json(visitor)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => 
  console.log(`Server running on http://localhost:${PORT}`)
)