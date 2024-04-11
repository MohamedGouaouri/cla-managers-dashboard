import {z} from 'zod'


// const testSchema = z.object({
//   weight: z.number(),
//   type: z.enum(['number', 'string']),
//   value: z.any(),
//   name: z.string().min(1),
//   output: z.any()
// })
export const CreateChallengeSchema = z.object({
  title: z.string().min(1),
  category: z.string().min(1),
  level: z.enum(['Easy', 'Moderate', 'Hard']),
  // tests: testSchema.nullable()
//   description: z.string().nullable(),
//   code: z.string().nullable(),
})