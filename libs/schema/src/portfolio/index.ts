import { z } from "zod";

import { defaultMetadata, metadataSchema } from "../metadata";
import { defaultPortfolioBasics,portfolioBasicsSchema } from "./basics";
import { defaultPortfolioSections,portfolioSectionsSchema } from "./sections";

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
