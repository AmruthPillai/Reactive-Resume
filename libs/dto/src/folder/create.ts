import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

import { resumeSchema } from "../resume";

export const createFolderSchema = z.object({
  name: z.string().min(1),
  resumes: resumeSchema.partial().array().optional(),
});

export class CreateFolderDto extends createZodDto(createFolderSchema) {}
