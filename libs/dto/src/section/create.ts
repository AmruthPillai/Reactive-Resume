import {
  awardSchema,
  basicsSchema,
  certificationSchema,
  educationSchema,
  experienceSchema,
  interestSchema,
  languageSchema,
  profileSchema,
  publicationSchema,
  referenceSchema,
  skillSchema,
  volunteerSchema,
} from "@reactive-resume/schema";
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

  data: z.union([
    basicsSchema,
    profileSchema,
    experienceSchema,
    educationSchema,
    skillSchema,
    languageSchema,
    awardSchema,
    certificationSchema,
    interestSchema,
    profileSchema,
    publicationSchema,
    volunteerSchema,
    referenceSchema,
  ]),
});

export class CreateSectionItemDto extends createZodDto(createSectionSchema) {}
