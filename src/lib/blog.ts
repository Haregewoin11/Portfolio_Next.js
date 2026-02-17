import { z } from 'zod'

// Define the "System Requirements" for a blog post
export const PostSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  category: z.string(),
  readTime: z.string(),
  published: z.boolean().default(true),
})

export type Post = z.infer<typeof PostSchema>