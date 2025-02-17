import { defaultResumeData, idSchema, resumeDataSchema } from "@reactive-resume/schema";
import { dateSchema } from "@reactive-resume/utils";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";
import { userSchema } from "../user";

export enum SectionFormat {
  Basics= "basics",
  Profiles= "profiles",
  Experience= "experience",
  Education= "education",
  Skills= "skills",
  Languages= "languages",
  Awards= "awards",
  Certifications= "certifications",
  Interests= "interests",
  Projects= "projects",
  Publications= "publications",
  Volunteering= "volunteering",
  References= "references",
  Custom= "custom",
}

export const sectionSchema = z.object({
  id: idSchema,
  format: z.nativeEnum(SectionFormat),
  userId: idSchema,
  user: userSchema.optional(),
  data: z.string(),
  updatedAt: dateSchema,
});

export class SectionDto extends createZodDto(sectionSchema) {}
