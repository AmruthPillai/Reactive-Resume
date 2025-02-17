import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

export const createSectionSchema = z.object({
  format: z.enum([
    "basics",
    "profiles",
    "experience",
    "education",
    "skills",
    "languages",
    "awards",
    "certifications",
    "interests",
    "projects",
    "publications",
    "volunteering",
    "references",
    "custom",
  ]),
  data: z.string(),
});

export class CreateSectionDto extends createZodDto(createSectionSchema) {}
