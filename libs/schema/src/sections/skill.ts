import { z } from "zod";

import { defaultItem, itemSchema } from "../shared";

// Schema
export const skillSchema = itemSchema.extend({
  name: z.string(),
  description: z.string(),
  level: z.number().min(0).max(5).default(1),
  keywords: z.array(z.string()).default([]),
});

// Type
export type Skill = z.infer<typeof skillSchema>;

// Defaults
export const defaultSkill: Skill = {
  ...defaultItem,
  name: "",
  description: "",
  level: 1,
  keywords: [],
};
