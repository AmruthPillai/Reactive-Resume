import { z } from "zod";

import { defaultItem, itemSchema } from "../shared";

// Schema
export const skillSchema = itemSchema.extend({
  name: z.string(),
  description: z.string(),
  level: z
    .union([z.number(), z.string()])
    .transform((val) => (typeof val === "string" ? Number.parseFloat(val) : val))
    .refine((val) => typeof val === "number" && val >= 0 && val <= 5, {
      message: "Level must be a number between 0 and 5",
    })
    .default(1),
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

export const defaultSkillMapping: Omit<Skill, "visible" | "id"> = {
  name: "",
  description: "",
  level: 1,
  keywords: [],
};
