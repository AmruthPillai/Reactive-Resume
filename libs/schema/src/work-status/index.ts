import { z } from "zod";

export enum JobType {
  "REMOTE" = "REMOTE",
  "ONSITE" = "ONSITE",
  "HYBRID" = "HYBRID",
}

// Schema
export const workStatusSchema = z.object({
  openToWork: z.boolean().default(false),
  pricing: z.number().optional(),
  jobType: z.nativeEnum(JobType).default(JobType.REMOTE),
  jobLocation: z.string().default(""),
});

// Type
export type WorkStatus = z.infer<typeof workStatusSchema>;

// Defaults
export const defaultWorkStatus: WorkStatus = {
  openToWork: false,
  pricing: undefined,
  jobType: JobType.REMOTE,
  jobLocation: "",
};
