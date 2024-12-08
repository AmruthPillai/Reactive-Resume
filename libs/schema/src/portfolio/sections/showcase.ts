import { z } from "zod";
import { defaultItem, defaultUrl, itemSchema, urlSchema } from "../../shared";

export const showcaseSchema = itemSchema.extend({
  title: z.string().min(1),
  description: z.string(),
  type: z.enum(["website", "mobile-app", "desktop-app", "design", "other"]),
  thumbnail: z.string(),
  images: z.array(z.string()),
  technologies: z.array(z.string()),
  date: z.string(),
  url: urlSchema,
});

export type Showcase = z.infer<typeof showcaseSchema>;

export const defaultShowcase: Showcase = {
  ...defaultItem,
  title: "",
  description: "",
  type: "website",
  thumbnail: "",
  images: [],
  technologies: [],
  date: "",
  url: defaultUrl,
};
