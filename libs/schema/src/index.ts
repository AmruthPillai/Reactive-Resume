import { z } from "zod";

import { basicsSchema, defaultBasics } from "./basics";
import { defaultMetadata, metadataSchema } from "./metadata";
import { defaultSections, sectionsSchema } from "./sections";

// Schema
export const resumeDataSchema = z.object({
  basics: basicsSchema,
  sections: sectionsSchema,
  metadata: metadataSchema,
});

export const portfolioTemplatesList = [
  {
    id: "minimal",
    name: "Minimal",
    description: "A clean and minimal portfolio template",
    thumbnail: "minimal.jpg",
  },
  {
    id: "modern",
    name: "Modern",
    description: "A modern and professional portfolio template",
    thumbnail: "modern.jpg",
  },
  {
    id: "creative",
    name: "Creative",
    description: "A creative and unique portfolio template",
    thumbnail: "creative.jpg",
  },
  // Add more templates here
] as const;

export type PortfolioTemplate = typeof portfolioTemplatesList[number]["id"];
// Type
export type ResumeData = z.infer<typeof resumeDataSchema>;

// Defaults
export const defaultResumeData: ResumeData = {
  basics: defaultBasics,
  sections: defaultSections,
  metadata: defaultMetadata,
};

export * from "./basics";
export * from "./metadata";
export * from "./portfolio";
export * from "./sample";
export * from "./sections";
export * from "./shared";
