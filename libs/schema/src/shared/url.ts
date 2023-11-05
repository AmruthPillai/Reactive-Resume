import { z } from "zod";

// Schema
export const urlSchema = z.object({
  label: z.string(),
  href: z.literal("").or(z.string().url()),
});

// Type
export type URL = z.infer<typeof urlSchema>;

// Defaults
export const defaultUrl: URL = {
  label: "",
  href: "",
};
