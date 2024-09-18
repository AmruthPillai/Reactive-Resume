import { z } from "zod";

export enum JobType {
  "remote" = "remote",
  "onsite" = "onsite",
  "hybrid" = "hybrid",
}

export enum JobLocation {
  "hanoi" = "hanoi",
  "danang" = "danang",
  "tpHCM" = "tpHCM",
}

// Schema
export const workStatusSchema = z.object({
  openToWork: z.boolean().default(false),
  pricing: z.number().optional(),
  jobType: z.nativeEnum(JobType).default(JobType.remote),
  jobLocation: z.nativeEnum(JobLocation).default(JobLocation.hanoi),
});

// Type
export type WorkStatus = z.infer<typeof workStatusSchema>;

// Defaults
export const defaultWorkStatus: WorkStatus = {
  openToWork: false,
  pricing: 0,
  jobType: JobType.onsite,
  jobLocation: JobLocation.hanoi,
};
