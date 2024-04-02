import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email('Email is required').min(10),
    password: z.string().min(6, 'Password must be at least 6 characters long')
})

export const registerSchema = z.object({
    first_name: z.string().min(2),
    last_name: z.string().min(2),
    email: z.string().email('Email is required').min(10),
    password: z.string().min(6, 'Password must be at least 6 characters long')
})