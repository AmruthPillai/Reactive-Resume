import { createZodDto } from "nestjs-zod/dto";

import { resumeSchema } from "../resume";
import { folderSchema } from "./folder";

const updateFolderSchema = z.object({
  name: z.string().min(1).optional(),
});

export class UpdateFolderDto extends createZodDto(updateFolderSchema) {}
