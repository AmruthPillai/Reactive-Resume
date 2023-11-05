import { z } from "zod";

export const positionSchema = z.object({
  "Company Name": z.string(),
  Title: z.string(),
  Description: z.string().optional(),
  Location: z.string(),
  "Started On": z.string(),
  "Finished On": z.string().optional(),
});
