import { z, ZodSchema } from "zod";

import { ResumeSchema } from './resume';

export const UserSchema: ZodSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  password: z.string().optional(),
  provider: z.enum(['email', 'google']),
  resetToken: z.string().optional(),
  resumes: z.array(ResumeSchema),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type User = z.infer<typeof UserSchema>;
