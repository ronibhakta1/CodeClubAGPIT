import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.member.create({ data: { name: "Test", email: "test@test.com" } })
  await prisma.visitor.create({ data: { page: "/home", count: 1, total: 1 } })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
