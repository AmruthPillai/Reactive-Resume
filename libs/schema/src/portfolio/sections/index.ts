// import { timelineSchema } from "./timeline";
// import { testimonialSchema } from "./testimonial";
// import { contactSchema } from "./contact";
// import { showcaseSchema } from "./showcase";
// import { skillsetSchema } from "./skillset";
import { createId } from "@paralleldrive/cuid2";
import { FilterKeys } from "@reactive-resume/utils";
import { z } from "zod";

import {
  awardSchema,
  certificationSchema,
  educationSchema,
  experienceSchema,
  interestSchema,
  languageSchema,
  profileSchema,
  projectSchema,
  publicationSchema,
  referenceSchema,
  skillSchema,
  volunteerSchema,
} from "../../sections";
import { idSchema } from "../../shared";


// Base section schema
export const portfolioSectionSchema = z.object({
  id: idSchema,
  name: z.string(),
  columns: z.number().min(1).max(4).default(1),
  separateLinks: z.boolean().default(true),
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
  summary: portfolioSectionWithItemsSchema.extend({
    id: z.literal("summary"),
    content: z.string().default(""),
  }),

  awards: portfolioSectionWithItemsSchema.extend({
    id: z.literal("awards"),
    items: z.array(awardSchema),
  }),
  certifications: portfolioSectionWithItemsSchema.extend({
    id: z.literal("certifications"),
    items: z.array(certificationSchema),
  }),
  education: portfolioSectionWithItemsSchema.extend({
    id: z.literal("education"),
    items: z.array(educationSchema),
  }),
  experience: portfolioSectionWithItemsSchema.extend({
    id: z.literal("experience"),
    items: z.array(experienceSchema),
  }),
  volunteer: portfolioSectionWithItemsSchema.extend({
    id: z.literal("volunteer"),
    items: z.array(volunteerSchema),
  }),
  interests: portfolioSectionWithItemsSchema.extend({
    id: z.literal("interests"),
    items: z.array(interestSchema),
  }),
  languages: portfolioSectionWithItemsSchema.extend({
    id: z.literal("languages"),
    items: z.array(languageSchema),
  }),
  profiles: portfolioSectionWithItemsSchema.extend({
    id: z.literal("profiles"),
    items: z.array(profileSchema),
  }),
  projects: portfolioSectionWithItemsSchema.extend({
    id: z.literal("projects"),
    items: z.array(projectSchema),
  }),
  publications: portfolioSectionWithItemsSchema.extend({
    id: z.literal("publications"),
    items: z.array(publicationSchema),
  }),
  references: portfolioSectionWithItemsSchema.extend({
    id: z.literal("references"),
    items: z.array(referenceSchema),
  }),
  skills: portfolioSectionWithItemsSchema.extend({
    id: z.literal("skills"),
    items: z.array(skillSchema),
  }),

  custom: z.record(z.string(), customPortfolioSchema),
});

export type PortfolioSection = z.infer<typeof portfolioSectionSchema>;
export type PortfolioSectionWithItems = z.infer<typeof portfolioSectionWithItemsSchema>;
export type PortfolioSections = z.infer<typeof portfolioSectionsSchema>;
export type PortfolioSectionKey = keyof PortfolioSections | `custom.${string}`;
export type PortfolioSectionWithItem<T = unknown> = PortfolioSections[FilterKeys<
  PortfolioSections,
  { items: T[] }
>];
export type PortfolioCustomSectionGroup = z.infer<typeof customPortfolioSchema>;

export const defaultPortfolioSection: PortfolioSection = {
  id: createId(),
  name: "",
  columns: 1,
  separateLinks: true,
  visible: true,
  fullWidth: false,
};

export const defaultPortfolioSections: PortfolioSections = {
  about: { ...defaultPortfolioSection, id: "about", name: "About", content: "" },
  showcase: { ...defaultPortfolioSection, id: "showcase", name: "Showcase", items: [] },
  summary: {
    ...defaultPortfolioSection,
    id: "summary",
    name: "Summary",
    content: "",
    items: [],
  },
  awards: { ...defaultPortfolioSection, id: "awards", name: "Awards", items: [] },
  certifications: {
    ...defaultPortfolioSection,
    id: "certifications",
    name: "Certifications",
    items: [],
  },
  education: { ...defaultPortfolioSection, id: "education", name: "Education", items: [] },
  experience: { ...defaultPortfolioSection, id: "experience", name: "Experience", items: [] },
  volunteer: { ...defaultPortfolioSection, id: "volunteer", name: "Volunteer", items: [] },
  interests: { ...defaultPortfolioSection, id: "interests", name: "Interests", items: [] },
  languages: { ...defaultPortfolioSection, id: "languages", name: "Languages", items: [] },
  profiles: { ...defaultPortfolioSection, id: "profiles", name: "Profiles", items: [] },
  projects: { ...defaultPortfolioSection, id: "projects", name: "Projects", items: [] },
  publications: { ...defaultPortfolioSection, id: "publications", name: "Publications", items: [] },
  references: { ...defaultPortfolioSection, id: "references", name: "References", items: [] },
  skills: { ...defaultPortfolioSection, id: "skills", name: "Skills", items: [] },

  //   timeline: { ...defaultPortfolioSection, id: "timeline", name: "Timeline", items: [] },
  //   testimonials: { ...defaultPortfolioSection, id: "testimonials", name: "Testimonials", items: [] },
  //   contact: { ...defaultPortfolioSection, id: "contact", name: "Contact", items: [] },
  custom: {},
};
