import { z } from "zod";

import { defaultUrl } from "../shared";
import { createSectionDefaults, createSectionSchema } from "./factory";

// Schema
export const experienceSchema = createSectionSchema(
  {
    company: z.string(),
    position: z.string(),
    location: z.string(),
  },
  "company", // Make company required
);

// Type
export type Experience = z.infer<typeof experienceSchema>;

// Defaults
export const defaultExperience: Experience = createSectionDefaults({
  company: "",
  position: "",
  location: "",
});
