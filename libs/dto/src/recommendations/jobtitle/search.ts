import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

export const jobTitleSearchSchema = z.object({
  // Job ID
  id: z.string(),
  // Job Title
  title: z.string(),
});

export class JobTitleSearchDto extends createZodDto(jobTitleSearchSchema) {}
