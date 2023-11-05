import { z } from "zod";

import { defaultItem, defaultUrl, itemSchema, urlSchema } from "../shared";

// Schema
export const certificationSchema = itemSchema.extend({
  name: z.string().min(1),
  issuer: z.string(),
  date: z.string(),
  summary: z.string(),
  url: urlSchema,
});

// Type
export type Certification = z.infer<typeof certificationSchema>;

// Defaults
export const defaultCertification: Certification = {
  ...defaultItem,
  name: "",
  issuer: "",
  date: "",
  summary: "",
  url: defaultUrl,
};
