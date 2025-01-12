import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

export const statisticsSchema = z.object({
  views: z.number().int().default(0),
  downloads: z.number().int().default(0),
});

export class StatisticsDto extends createZodDto(statisticsSchema) {}
