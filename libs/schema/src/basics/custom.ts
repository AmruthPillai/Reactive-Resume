import { z } from "zod";

export const customFieldSchema = z.object({
  id: z.string().cuid2(),
  icon: z.string(),
  name: z.string(),
  value: z.string(),
});

export type CustomField = z.infer<typeof customFieldSchema>;
