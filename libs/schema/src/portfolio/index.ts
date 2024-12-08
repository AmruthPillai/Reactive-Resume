import { z } from "zod";
import { portfolioBasicsSchema, defaultPortfolioBasics } from "./basics";
import { portfolioSectionsSchema, defaultPortfolioSections } from "./sections";
import { defaultMetadata, metadataSchema } from "../metadata";

export const portfolioDataSchema = z.object({
  basics: portfolioBasicsSchema,
  sections: portfolioSectionsSchema,
  metadata: metadataSchema,
});

export type PortfolioData = z.infer<typeof portfolioDataSchema>;

export const defaultPortfolioData: PortfolioData = {
  basics: defaultPortfolioBasics,
  sections: defaultPortfolioSections,
  metadata: {
    ...defaultMetadata,
    template: "minimal", // Default portfolio template
  },
};

export * from "./basics";
export * from "./sections";
