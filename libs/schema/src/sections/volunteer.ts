import { z } from "zod";

import { defaultItem, defaultUrl, itemSchema, urlSchema } from "../shared";

// Schema
export const volunteerSchema = itemSchema.extend({
  organization: z.string().min(1),
  position: z.string(),
  location: z.string(),
  date: z.string(),
  summary: z.string(),
  url: urlSchema,
});

// Type
export type Volunteer = z.infer<typeof volunteerSchema>;

// Defaults
export const defaultVolunteer: Volunteer = {
  ...defaultItem,
  organization: "",
  position: "",
  location: "",
  date: "",
  summary: "",
  url: defaultUrl,
};
