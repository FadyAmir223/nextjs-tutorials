import { z } from 'zod'

export const userSchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(1, { message: 'must be at least 1 character long' })
    .max(20, { message: 'must be at most 20 characters long' }),
})

export type User = z.infer<typeof userSchema>
