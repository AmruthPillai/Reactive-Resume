import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

export const contributorSchema = z.object({
  id: z.number(),
  name: z.string(),
  url: z.string(),
  avatar: z.string(),
});

export class ContributorDto extends createZodDto(contributorSchema) {}
