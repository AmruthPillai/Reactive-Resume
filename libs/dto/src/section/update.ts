import { createZodDto } from "nestjs-zod/dto";

import { sectionSchema } from "./section";

export const updateSectionItemSchema = sectionSchema.partial();

export class UpdateSectionItemDto extends createZodDto(updateSectionItemSchema) {}
