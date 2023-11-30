import { z } from "zod";

export const palmSummaryRequest = z.object({
  summary: z.string(),
});

export const palmSummaryResponse = z.object({
  summary: z.string(),
});

export const palmSummaryRequestDefault = { summary: "" };

export type PalmSummaryRequest = z.infer<typeof palmSummaryRequest>;
export type PalmSummaryResponse = z.infer<typeof palmSummaryResponse>;
