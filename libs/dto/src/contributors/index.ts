import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

export const contributorSchema = z.object({
  id: z.number(),
  name: z.string(),
  url: z.string(),
  avatar: z.string(),
});

export class ContributorDto extends createZodDto(contributorSchema) {}

export const languageSchema = z.object({
  id: z.string(),
  name: z.string(),
  locale: z.string(),
  editorCode: z.string(),
  progress: z.number(),
});

export class LanguageDto extends createZodDto(languageSchema) {}
