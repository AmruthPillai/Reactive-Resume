import { z } from "zod";

import { defaultItem, defaultUrl, itemSchema, urlSchema } from "../shared";

// Schema
export const experienceSchema = itemSchema.extend({
  company: z.string().min(1),
  typeOfEmployment: z.enum(["full-time", "part-time", "contract", "internship"]),
  position: z.string(),
  location: z.string(),
  date: z.string(),
  summary: z.string(),
  url: urlSchema,
});

// Type
export type Experience = z.infer<typeof experienceSchema>;

// Defaults
export const defaultExperience: Experience = {
  ...defaultItem,
  company: "",
  typeOfEmployment: "full-time",
  position: "",
  location: "",
  date: "",
  summary: "",
  url: defaultUrl,
};
