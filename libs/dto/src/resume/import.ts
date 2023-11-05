import { resumeDataSchema } from "@reactive-resume/schema";
import { kebabCase } from "@reactive-resume/utils";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

export const importResumeSchema = z.object({
  title: z.string().optional(),
  slug: z.string().min(1).transform(kebabCase).optional(),
  visibility: z.enum(["public", "private"]).default("private").optional(),
  data: resumeDataSchema,
});

export class ImportResumeDto extends createZodDto(importResumeSchema) {}
