import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email('Email is required').min(10),
    password: z.string().min(8, 'Password must be at least 8 characters long')
})

export const registerSchema = z.object({
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    email: z.string().email('Email is required').min(10),
    password: z.string().min(8, 'Password must be at least 8 characters long')
})