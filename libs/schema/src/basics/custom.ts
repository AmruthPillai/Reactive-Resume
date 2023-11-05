import { z } from "zod";

export const customFieldSchema = z.object({
  id: z.string().cuid2(),
  name: z.string(),
  value: z.string(),
});

export const customFieldsDefault = [];

export type CustomField = z.infer<typeof customFieldSchema>;
