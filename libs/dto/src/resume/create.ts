import slugify from "@sindresorhus/slugify";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

export const createResumeSchema = z.object({
  title: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .transform((value) => slugify(value))
    .optional(),
  visibility: z.enum(["public", "private"]).default("private"),
});

export class CreateResumeDto extends createZodDto(createResumeSchema) {}
