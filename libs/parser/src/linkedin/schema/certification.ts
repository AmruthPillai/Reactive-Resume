import { z } from "zod";

export const certificationSchema = z.object({
  Name: z.string(),
  Url: z.string().url(),
  Authority: z.string(),
  "Started On": z.string(),
  "Finished On": z.string().optional(),
  "License Number": z.string(),
});
