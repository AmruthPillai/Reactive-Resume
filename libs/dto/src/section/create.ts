import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";
import { idSchema } from "@reactive-resume/schema";
import { SectionFormat } from "./section";

export const createSectionSchema = z.object({
  id: idSchema,
  format: z.nativeEnum(SectionFormat),
  userId: idSchema,
  data: z.string(),
});

export class CreateSectionDto extends createZodDto(createSectionSchema) {}
