import { z } from "zod";

import { createSectionDefaults, createSectionSchema } from "./factory";

// Schema
export const awardSchema = createSectionSchema(
  {
    title: z.string(),
    awarder: z.string(),
  },
  "title", // Make title required
);

// Type
export type Award = z.infer<typeof awardSchema>;

// Defaults
export const defaultAward: Award = createSectionDefaults({
  title: "",
  awarder: "",
});
