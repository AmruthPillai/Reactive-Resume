import { kebabCase } from "@reactive-resume/utils";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

export const createResumeSchema = z.object({
  title: z.string().min(1).max(30),
  slug: z.string().min(1).max(30).transform(kebabCase),
  visibility: z.enum(["public", "private"]).default("private"),
});

export class CreateResumeDto extends createZodDto(createResumeSchema) {}
