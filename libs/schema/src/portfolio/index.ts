// @reactive-resume/schema/src/portfolio/index.ts
import { z } from "zod";

import { defaultPortfolioMetadata, portfolioMetadataSchema } from "../metadata";
import { defaultPortfolioBasics, portfolioBasicsSchema } from "./basics";
import { defaultPortfolioSections, portfolioSectionsSchema } from "./sections";

export const portfolioDataSchema = z.object({
  basics: portfolioBasicsSchema,
  sections: portfolioSectionsSchema,
  metadata: portfolioMetadataSchema,
});

export type PortfolioData = z.infer<typeof portfolioDataSchema>;

export const defaultPortfolioData: PortfolioData = {
  basics: defaultPortfolioBasics,
  sections: defaultPortfolioSections,
  metadata: defaultPortfolioMetadata,
};

export * from "./basics";
export * from "./sections";
