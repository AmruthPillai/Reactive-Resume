import { idSchema } from "@reactive-resume/schema";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

const deleteFolderSchema = z.object({
  id: idSchema,
  isDeleteResumes: z.boolean().optional(),
});

export class DeleteFolderDto extends createZodDto(deleteFolderSchema) {}
