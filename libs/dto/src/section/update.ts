import { createZodDto } from "nestjs-zod/dto";

import { sectionSchema } from "./section";

export const updateSectionSchema = sectionSchema.partial();

export class UpdateSectionItemDto extends createZodDto(updateSectionSchema) {}
