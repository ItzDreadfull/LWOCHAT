import { z } from 'zod'

export const usernameValidation = z
    .string()
    .min(2, "Username must be atleast 2 characters")
    .min(2, "Username must be not more than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Usernaem must not contain special character")


export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'password must be at least 6 charecters' })

})