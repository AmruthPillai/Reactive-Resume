import { z } from "zod";

import { defaultItem, defaultUrl, itemSchema, urlSchema } from "../shared";

// Schema
export const awardSchema = itemSchema.extend({
  title: z.string().min(1),
  awarder: z.string(),
  date: z.string(),
  summary: z.string(),
  url: urlSchema,
});

// Type
export type Award = z.infer<typeof awardSchema>;

// Defaults
export const defaultAward: Award = {
  ...defaultItem,
  title: "",
  awarder: "",
  date: "",
  summary: "",
  url: defaultUrl,
};
