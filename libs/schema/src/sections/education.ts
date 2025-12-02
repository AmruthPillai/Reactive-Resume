import { z } from "zod";

import { createSectionDefaults, createSectionSchema } from "./factory";

// Schema
export const educationSchema = createSectionSchema(
  {
    institution: z.string(),
    studyType: z.string(),
    area: z.string(),
    score: z.string(),
  },
  "institution", // Make institution required
);

// Type
export type Education = z.infer<typeof educationSchema>;

// Defaults
export const defaultEducation: Education = createSectionDefaults({
  institution: "",
  studyType: "",
  area: "",
  score: "",
});
