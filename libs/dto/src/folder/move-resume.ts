import { idSchema } from "@reactive-resume/schema";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

export const moveResumeToFolderSchema = z.object({
  id: idSchema.optional(),
  resumeId: idSchema,
});

export class MoveResumeToFolderDto extends createZodDto(moveResumeToFolderSchema) {}
