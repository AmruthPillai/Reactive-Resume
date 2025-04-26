import { z } from "zod";

// Schema
export const urlSchema = z.object({
  label: z.string(),
  href: z.literal("").or(z.string().url()),
});

export const  urlWithBindSchema = urlSchema.extend({
  bind: z.boolean().optional().default(false),
});

// Type
export type URL = z.infer<typeof urlSchema>;
export type URLWithBind = z.infer<typeof urlWithBindSchema>;

// Defaults
export const defaultUrl: URL = {
  label: "",
  href: "",
};

export const defaultUrlWithBind: URLWithBind = {
  label: "",
  href: "",
  bind: false,
};
