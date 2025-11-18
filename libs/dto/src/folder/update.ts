import { createZodDto } from "nestjs-zod/dto";

import { resumeSchema } from "../resume";
import { folderSchema } from "./folder";

const updateFolderSchema = folderSchema
  .partial()
  .extend({ resumes: resumeSchema.partial().array().optional() });

export class UpdateFolderDto extends createZodDto(updateFolderSchema) {}
