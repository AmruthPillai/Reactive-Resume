import { z } from "zod";
import { defaultUrl, urlSchema } from "../shared";
import { customFieldSchema } from "../basics/custom";

export const portfolioBasicsSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  email: z.literal("").or(z.string().email()),
  phone: z.string(),
  location: z.string(),
  url: urlSchema,
  about: z.string(),
  customFields: z.array(customFieldSchema),
  picture: z.object({
    url: z.string(),
    size: z.number().default(128),
    aspectRatio: z.number().default(1),
    borderRadius: z.number().default(0),
    effects: z.object({
      hidden: z.boolean().default(false),
      border: z.boolean().default(false),
      grayscale: z.boolean().default(false),
    }),
  }),
  banner: z.object({
    url: z.string(),
    effects: z.object({
      hidden: z.boolean().default(false),
      grayscale: z.boolean().default(false),
      parallax: z.boolean().default(true),
    }),
  }),
});

export type PortfolioBasics = z.infer<typeof portfolioBasicsSchema>;

export const defaultPortfolioBasics: PortfolioBasics = {
  name: "",
  tagline: "",
  email: "",
  phone: "",
  location: "",
  url: defaultUrl,
  about: "",
  customFields: [],
  picture: {
    url: "",
    size: 128,
    aspectRatio: 1,
    borderRadius: 0,
    effects: {
      hidden: false,
      border: false,
      grayscale: false,
    },
  },
  banner: {
    url: "",
    effects: {
      hidden: false,
      grayscale: false,
      parallax: true,
    },
  },
};
