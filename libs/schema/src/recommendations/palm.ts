import { protos } from "@google-ai/generativelanguage";
import { z } from "zod";

export const palmSummaryRequest = z.object({
  prompt: z.string(),
});

export const palmSummaryResponse = z.object({
  summary: z.string(),
});

export const palmSummaryRequestDefault = { summary: "" };

export type PalmSummaryRequest = z.infer<typeof palmSummaryRequest>;
export type PalmSummaryResponse = z.infer<typeof palmSummaryResponse>;

export type PalmGenerateTextRequest =
  protos.google.ai.generativelanguage.v1beta2.GenerateTextRequest;

export type PalmGenerateTextResponse = [
  protos.google.ai.generativelanguage.v1beta2.IGenerateTextResponse,
  protos.google.ai.generativelanguage.v1beta2.IGenerateTextRequest | undefined,
  undefined,
];
