import { idSchema } from "@reactive-resume/schema";
import { dateSchema } from "@reactive-resume/utils";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

import { resumeSchema } from "../resume";
import { userSchema } from "../user";

export const folderSchema = z.object({
  id: idSchema,
  name: z.string(),
  userId: idSchema,
  user: userSchema.optional(),
  resumes: resumeSchema.array().optional(),
  resumesCount: z.number().optional(),
  createdAt: dateSchema.optional(),
  updatedAt: dateSchema.optional(),
});

export class FolderDto extends createZodDto(folderSchema) {}
