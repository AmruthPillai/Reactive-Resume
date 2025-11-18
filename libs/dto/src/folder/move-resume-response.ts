import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

import { resumeSchema } from "../resume";
import { folderSchema } from "./folder";

export const moveResumeResponseSchema = z.object({
  sourceFolder: folderSchema.optional(),
  targetFolder: folderSchema,
  resume: resumeSchema.optional(),
});

export class MoveResumeResponseDto extends createZodDto(moveResumeResponseSchema) {}
