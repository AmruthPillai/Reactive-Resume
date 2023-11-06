import { createZodDto } from "nestjs-zod/dto";

import { resumeSchema } from "./resume";

export const updateResumeSchema = resumeSchema.partial();

export class UpdateResumeDto extends createZodDto(updateResumeSchema) {}
