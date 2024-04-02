import {z} from 'zod'

export const CreateChallengeSchema = z.object({
  title: z.string().min(1),
  category: z.string().min(1),
  level: z.enum(['Easy', 'Moderate', 'Hard']),
//   description: z.string().nullable(),
//   code: z.string().nullable(),
})