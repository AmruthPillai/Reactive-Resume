import { idSchema } from "@reactive-resume/schema";
import { dateSchema } from "@reactive-resume/utils";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

import { userSchema } from "../user";

const sectionFormatEnum = z.enum([
  "Basics",
  "Profiles",
  "Experience",
  "Education",
  "Skills",
  "Languages",
  "Awards",
  "Certifications",
  "Interests",
  "Projects",
  "Publications",
  "Volunteering",
  "References",
  "Custom",
]);

export const sectionSchema = z.object({
  id: idSchema,
  format: sectionFormatEnum,
  userId: idSchema,
  user: userSchema.optional(),
  data: z.unknown().default({}),
  updatedAt: dateSchema,
});

export class SectionDto extends createZodDto(sectionSchema) {}
