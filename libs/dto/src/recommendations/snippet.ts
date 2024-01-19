import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

export const recommendationSnippetSchema = z.object({
  // Snippet Id
  id: z.string(),
  // Snippet text
  phrase: z.string(),
  // Recommendation Type
  type: z.enum(["summary", "education", "experience"]).default("summary"),
  // Snippet Html Text If any
  highlight: z.string().optional(),
  // Locale of Text
  locale: z.string().default("en-US"),
  // Usage Count of this script
  usageCount: z.number(),
  // Job Title Id
  jobTitleId: z.string(),
});

export class RecommendationSnippetDto extends createZodDto(recommendationSnippetSchema) {}
