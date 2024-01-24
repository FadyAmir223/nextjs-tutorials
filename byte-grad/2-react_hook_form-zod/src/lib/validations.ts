import { z } from 'zod'

export const loginFormSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(4, 'must be at least 4 characters long')
      .max(20, 'must be at most 20 characters long'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'passwords must match',
    path: ['confirmPassword'],
  })

export type LoginFormSchema = z.infer<typeof loginFormSchema>
