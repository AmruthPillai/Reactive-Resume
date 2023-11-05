import { z } from "zod";

import { defaultItem, itemSchema } from "../shared";

// Schema
export const languageSchema = itemSchema.extend({
  name: z.string().min(1),
  fluency: z.string(),
  fluencyLevel: z.number().min(1).max(6),
});

// Type
export type Language = z.infer<typeof languageSchema>;

// Defaults
export const defaultLanguage: Language = {
  ...defaultItem,
  name: "",
  fluency: "",
  fluencyLevel: 1,
};
