import { z } from "zod";

import { createSectionDefaults, createSectionSchema } from "./factory";

// Schema
export const projectSchema = createSectionSchema(
  {
    name: z.string(),
    description: z.string(),
    keywords: z.array(z.string()).default([]),
  },
  "name", // Make name required
);

// Type
export type Project = z.infer<typeof projectSchema>;

// Defaults
export const defaultProject: Project = createSectionDefaults({
  name: "",
  description: "",
  keywords: [],
});
