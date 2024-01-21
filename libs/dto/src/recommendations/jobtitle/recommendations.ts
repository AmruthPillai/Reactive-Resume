import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

export const jobTitleRecommendationsSchema = z.object({
  // Job ID
  id: z.string(),
  // Job Title
  title: z.string(),

  // Related Job Titles
  relatedJobTitles: z.array(z.string()).optional(),
  // Recommendations List for Job Title
  recommendations: z
    .array(
      z.object({
        id: z.string(),
        // Snippet text
        phrase: z.string(),
      }),
    )
    .optional(),
});

export class JobTitleRecommendationsDto extends createZodDto(jobTitleRecommendationsSchema) {}
