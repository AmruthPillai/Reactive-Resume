import { z } from "zod";

import { defaultItem, itemSchema } from "../shared";

// Schema
export const languageSchema = itemSchema.extend({
  name: z.string().min(1),
  description: z.string(),
  level: z.number().min(0).max(5).default(1),
});

// Type
export type Language = z.infer<typeof languageSchema>;

// Defaults
export const defaultLanguage: Language = {
  ...defaultItem,
  name: "",
  description: "",
  level: 1,
};
