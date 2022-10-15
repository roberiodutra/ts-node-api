import { z } from 'zod';

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
  firstName: z.string().min(3, {
    message: 'FirstName must be at least 3 characters long',
  }),
  lastName: z.string().min(3, {
    message: 'LastName must be at least 3 characters long',
  }),
  role: z.string(),
});

export type IUser = z.infer<typeof UserSchema>;
