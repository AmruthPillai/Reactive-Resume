import { z } from "zod";

import { defaultItem, defaultUrl, itemSchema, urlSchema } from "../shared";

// Schema
export const publicationSchema = itemSchema.extend({
  name: z.string().min(1),
  publisher: z.string(),
  date: z.string(),
  summary: z.string(),
  url: urlSchema,
});

// Type
export type Publication = z.infer<typeof publicationSchema>;

// Defaults
export const defaultPublication: Publication = {
  ...defaultItem,
  name: "",
  publisher: "",
  date: "",
  summary: "",
  url: defaultUrl,
};
