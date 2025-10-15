import { z } from "zod";

import { defaultItem, defaultUrl, itemSchema, urlSchema } from "../shared";

export const workTypeEnum = z.enum(["On-Site", "Remote", "Hybrid", "none"]);
export const employmentTypeEnum = z.enum([
  "Full-Time",
  "Part-Time",
  "Internship",
  "Contract",
  "Freelance",
  "Temporary",
  "Volunteer",
  "none",
]);

// Schema
export const experienceSchema = itemSchema.extend({
  company: z.string().min(1),
  position: z.string(),
  location: z.string(),
  date: z.string(),
  summary: z.string(),
  url: urlSchema,
  workType: workTypeEnum.optional(),
  employmentType: employmentTypeEnum.optional(),
});

// Type
export type Experience = z.infer<typeof experienceSchema>;

// Defaults
export const defaultExperience: Experience = {
  ...defaultItem,
  company: "",
  position: "",
  location: "",
  date: "",
  summary: "",
  url: defaultUrl,
  workType: "none",
  employmentType: "none",
};
