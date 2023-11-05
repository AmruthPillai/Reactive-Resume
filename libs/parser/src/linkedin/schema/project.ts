import { z } from "zod";

export const projectSchema = z.object({
  Title: z.string(),
  Description: z.string(),
  Url: z.string().url(),
  "Started On": z.string(),
  "Finished On": z.string().optional(),
});
