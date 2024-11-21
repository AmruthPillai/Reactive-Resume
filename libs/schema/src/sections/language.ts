import { z } from "zod";

import { defaultItem, itemSchema } from "../shared";

// Schema
export const languageSchema = itemSchema.extend({
  name: z.string().min(1),
  description: z.string(),
  level: z
    .union([z.number(), z.string()])
    .transform((val) => (typeof val === "string" ? Number.parseInt(val) : val))
    .refine((val) => typeof val === "number" && val >= 0 && val <= 5, {
      message: "Level must be a number between 0 and 5",
    })
    .default(1),
});

// Type
export type Language = z.infer<typeof languageSchema>;

// Defaults
export const defaultLanguage: Language = {
  ...defaultItem,
  name: "?",
  description: "",
  level: 1,
};

export const defaultLanguageMapping: Omit<Language, "visible" | "id"> = {
  name: "?",
  description: "",
  level: 1,
};
