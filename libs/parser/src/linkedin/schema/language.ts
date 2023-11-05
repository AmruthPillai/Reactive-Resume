import { z } from "zod";

export const languageSchema = z.object({
  Name: z.string(),
  Proficiency: z.string().optional(),
});
