import { idSchema } from "@reactive-resume/schema";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

export const onboardingLinkedinSchema = z.object({
  id: idSchema.optional(),
  linkedinUrl: z.string().url(),
  jobDescription: z.string(),
});

export class OnboardingLinkedinDto extends createZodDto(onboardingLinkedinSchema) {}
