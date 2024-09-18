import { idSchema } from "@reactive-resume/schema";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

export const locationSchema = z.object({
  id: idSchema,
  name: z.string(),
});

export class LocationDto extends createZodDto(locationSchema) {}
