import { idSchema } from "@reactive-resume/schema";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

export const deleteSectionSchema = z.object({
  id: idSchema,
});

export class DeleteSectionDto extends createZodDto(deleteSectionSchema) {}
