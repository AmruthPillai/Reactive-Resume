import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

export const statisticsSchema = z.object({
  views: z.number().int().default(0),
  downloads: z.number().int().default(0),
});

export class StatisticsDto extends createZodDto(statisticsSchema) {}
