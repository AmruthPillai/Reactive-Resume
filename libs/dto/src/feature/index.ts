import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

export const featureSchema = z.object({
  isSignupsDisabled: z.boolean().default(false),
  isEmailAuthDisabled: z.boolean().default(false),
});

export class FeatureDto extends createZodDto(featureSchema) {}
