import { z } from 'zod'

export const MemberSchema = z.object({
  name: z.string().min(2),
  email: z.string().email()
})

export const VisitorSchema = z.object({
  page: z.string().min(1)
})
