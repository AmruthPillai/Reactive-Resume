import { z } from "zod";

export const educationSchema = z.object({
  "School Name": z.string(),
  "Start Date": z.string(),
  "End Date": z.string(),
  Notes: z.string().optional(),
  "Degree Name": z.string(),
  Activities: z.string(),
});
