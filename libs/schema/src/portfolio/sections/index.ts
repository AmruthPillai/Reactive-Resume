import { FilterKeys } from "@reactive-resume/utils";
import { z } from "zod";
import { idSchema } from "../../shared";
import { showcaseSchema } from "./showcase";
import { skillsetSchema } from "./skillset";
// import { timelineSchema } from "./timeline";
// import { testimonialSchema } from "./testimonial";
// import { contactSchema } from "./contact";
import { createId } from "@paralleldrive/cuid2";


// Base section schema
export const portfolioSectionSchema = z.object({
  id: idSchema,
  name: z.string(),
  columns: z.number().min(1).max(4).default(1),
  visible: z.boolean().default(true),
  fullWidth: z.boolean().default(false),
});
// Section with items schema
export const portfolioSectionWithItemsSchema = portfolioSectionSchema.extend({
  items: z.array(z.any()),
});

export const customPortfolioSchema = portfolioSectionSchema.extend({
  id: idSchema,
  items: z.array(z.any()),
});

export const portfolioSectionsSchema = z.object({
  about: portfolioSectionSchema.extend({
    id: z.literal("about"),
    content: z.string().default(""),
  }),
  showcase: portfolioSectionWithItemsSchema.extend({
    id: z.literal("showcase"),
  }),
  skillset: portfolioSectionWithItemsSchema.extend({
    id: z.literal("skillset"),
  }),
//   timeline: portfolioSectionSchema.extend({
//     id: z.literal("timeline"),
//     items: z.array(timelineSchema),
//   }),
//   testimonials: portfolioSectionSchema.extend({
//     id: z.literal("testimonials"),
//     items: z.array(testimonialSchema),
//   }),
//   contact: portfolioSectionSchema.extend({
//     id: z.literal("contact"),
//     items: z.array(contactSchema),
//   }),
  custom: z.record(z.string(), customPortfolioSchema),
});

export type PortfolioSection = z.infer<typeof portfolioSectionSchema>;
export type PortfolioSectionWithItems = z.infer<typeof portfolioSectionWithItemsSchema>;
export type PortfolioSections = z.infer<typeof portfolioSectionsSchema>;
export type PortfolioSectionKey = keyof PortfolioSections | `custom.${string}`;
export type PortfolioSectionWithItem<T = unknown> = PortfolioSections[FilterKeys<PortfolioSections, { items: T[] }>];
export type PortfolioCustomSectionGroup = z.infer<typeof customPortfolioSchema>;

export const defaultPortfolioSection: PortfolioSection = {
  id:createId(),
  name: "",
  columns: 1,
  visible: true,
  fullWidth: false,
};

export const defaultPortfolioSections: PortfolioSections = {
  about: { ...defaultPortfolioSection, id: "about", name: "About", content: "" },
  showcase: { ...defaultPortfolioSection, id: "showcase", name: "Showcase", items: [] },
  skillset: { ...defaultPortfolioSection, id: "skillset", name: "Skills", items: [] },
//   timeline: { ...defaultPortfolioSection, id: "timeline", name: "Timeline", items: [] },
//   testimonials: { ...defaultPortfolioSection, id: "testimonials", name: "Testimonials", items: [] },
//   contact: { ...defaultPortfolioSection, id: "contact", name: "Contact", items: [] },
  custom: {},
};
