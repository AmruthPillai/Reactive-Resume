import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

export const jobTitleCategorySchema = z.object({
  // category Id
  id: z.string(),
  // category Title
  title: z.string(),
});

export class JobTitleCategoryDto extends createZodDto(jobTitleCategorySchema) {}
