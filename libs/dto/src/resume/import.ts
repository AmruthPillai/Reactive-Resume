import { createId } from "@paralleldrive/cuid2";
import { resumeDataSchema } from "@reactive-resume/schema";
import slugify from "@sindresorhus/slugify";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

export const importResumeSchema = z.object({
  title: z.string().optional(),
  slug: z
    .string()
    .min(1)
    .transform((value) => {
      const slug = slugify(value);
      if (slug === "") return createId();
      return slug;
    })
    .optional(),
  visibility: z.enum(["public", "private"]).default("private").optional(),
  data: resumeDataSchema,
});

export class ImportResumeDto extends createZodDto(importResumeSchema) {}
