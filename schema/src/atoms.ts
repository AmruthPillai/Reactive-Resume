import { z } from "zod";

export const DateRangeSchema = z.object({
  start: z.string().optional(),
  end: z.string().optional()
});
export type DateRange = z.infer<typeof DateRangeSchema>;
