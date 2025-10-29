import { z } from "zod";

import { defaultItem, defaultUrl, itemSchema, urlSchema } from "../shared";

export const workTypeEnum = z.enum(["On-Site", "Remote", "Hybrid", "none", "other"]);
export const employmentTypeEnum = z.enum([
  "Full-Time",
  "Part-Time",
  "Internship",
  "Contract",
  "Freelance",
  "Temporary",
  "Volunteer",
  "none",
  "other",
]);

export type WorkTypeEnum = z.infer<typeof workTypeEnum>;
export type EmploymentTypeEnum = z.infer<typeof employmentTypeEnum>;

// Schema
export const experienceSchema = itemSchema
  .extend({
    company: z.string().min(1),
    position: z.string(),
    location: z.string(),
    date: z.string(),
    summary: z.string(),
    url: urlSchema,
    workType: workTypeEnum.optional(),
    employmentType: employmentTypeEnum.optional(),
    customEmploymentType: z.string().optional(),
    customWorkType: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    if (val.employmentType === "other" && !val.customEmploymentType?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["customEmploymentType"],
        message: "Please specify employment type",
      });
    }
    if (val.workType === "other" && !val.customWorkType?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["customWorkType"],
        message: "Please specify work type",
      });
    }
  });

// Type
export type Experience = z.infer<typeof experienceSchema>;

// Defaults
export const defaultExperience: Experience = {
  ...defaultItem,
  company: "",
  position: "",
  location: "",
  date: "",
  summary: "",
  url: defaultUrl,
  workType: "none",
  employmentType: "none",
};
