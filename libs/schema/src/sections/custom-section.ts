import { z } from "zod";

import { defaultItem, defaultUrl, itemSchema, urlSchema } from "../shared";

// Schema
export const customSectionSchema = itemSchema.extend({
  name: z.string(),
  description: z.string(),
  date: z.string(),
  level: z.number().min(0).max(5).default(0),
  summary: z.string(),
  keywords: z.array(z.string()).default([]),
  url: urlSchema,
});

// Type
export type CustomSection = z.infer<typeof customSectionSchema>;

// Defaults
export const defaultCustomSection: CustomSection = {
  ...defaultItem,
  name: "",
  description: "",
  date: "",
  level: 0,
  summary: "",
  keywords: [],
  url: defaultUrl,
};
