import { z } from 'zod'

export const updatePasswordSchema = z
  .object({
    password: z.string().min(6),
    passwordRepeat: z.string().min(6),
  })
  .refine(data => data.password === data.passwordRepeat, {
    path: ['passwordRepeat'],
  })

export type TypeUpdatePasswordSchema = z.infer<typeof updatePasswordSchema>
