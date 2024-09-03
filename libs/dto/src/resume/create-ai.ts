import { kebabCase } from "@reactive-resume/utils";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

export const createAiResumeSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).transform(kebabCase).optional(),
  visibility: z.enum(["public", "private"]).default("private"),
  existingResumeId: z.string().min(1).optional(),
  linkedinProfileUrl: z.string().min(1).optional(),
  jobDescription: z.string().min(1).optional(),
  linkedinJobDescriptionUrl: z.string().min(1).optional(),
});

export class CreateAiResumeDto extends createZodDto(createAiResumeSchema) {}
