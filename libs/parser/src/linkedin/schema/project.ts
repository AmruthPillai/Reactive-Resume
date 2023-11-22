import { z } from "zod";

export const projectSchema = z.object({
  Title: z.string(),
  Description: z.string(),
  Url: z.literal("").or(z.string().url()).optional(),
  "Started On": z.string(),
  "Finished On": z.string().optional(),
});
