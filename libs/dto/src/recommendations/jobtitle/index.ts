import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

import { jobTitleCategorySchema } from "./../category";
import { recommendationSnippetSchema } from "./../snippet";

export const jobTitleSchema = z.object({
  // Job ID
  id: z.string(),
  // Job Title
  title: z.string(),

  // Related Job Titles
  relatedJobTitles: z.json().optional(),
  // Category Id
  categoryId: jobTitleCategorySchema,

  // Recommendations List for Job Title
  recommendations: z.array(recommendationSnippetSchema).optional(),
});

export class JobTitleDto extends createZodDto(jobTitleSchema) {}

export * from "./recommendations";
export * from "./search";
