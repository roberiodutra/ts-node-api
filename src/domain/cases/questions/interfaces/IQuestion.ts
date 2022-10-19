import { z } from 'zod';

export const QuestionSchema = z.object({
  userId: z.string(),
  author: z.string(),
  question: z.string(),
  answer: z.string().url(),
  status: z.string(),
}).strict();

export type IQuestion = z.infer<typeof QuestionSchema>;
