import { z } from 'zod';

export const QuestionSchema = z.object({
  userId: z.string(),
  question: z.string(),
  answer: z.string().url(),
}).strict();

export type IQuestion = z.infer<typeof QuestionSchema>;
