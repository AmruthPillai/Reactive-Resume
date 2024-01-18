import { FilterKeys, ResumeSections } from "@reactive-resume/utils";
import { z } from "zod";

import { idSchema } from "../shared";
import { awardSchema } from "./award";
import { certificationSchema } from "./certification";
import { customSectionSchema } from "./custom-section";
import { educationSchema } from "./education";
import { experienceSchema } from "./experience";
import { interestSchema } from "./interest";
import { languageSchema } from "./language";
import { profileSchema } from "./profile";
import { projectSchema } from "./project";
import { publicationSchema } from "./publication";
import { referenceSchema } from "./reference";
import { skillSchema } from "./skill";
import { volunteerSchema } from "./volunteer";

// Schema
export const sectionSchema = z.object({
  name: z.string(),
  columns: z.number().min(1).max(5).default(1),
  visible: z.boolean().default(true),
});

// Schema
export const customSchema = sectionSchema.extend({
  id: idSchema,
  items: z.array(customSectionSchema),
});

export const sectionsSchema = z.object({
  summary: sectionSchema.extend({
    id: z.literal(ResumeSections.SUMMARY),
    content: z.string().default(""),
  }),
  awards: sectionSchema.extend({
    id: z.literal(ResumeSections.AWARDS),
    items: z.array(awardSchema),
  }),
  certifications: sectionSchema.extend({
    id: z.literal(ResumeSections.CERTIFICATIONS),
    items: z.array(certificationSchema),
  }),
  education: sectionSchema.extend({
    id: z.literal(ResumeSections.EDUCATION),
    items: z.array(educationSchema),
  }),
  experience: sectionSchema.extend({
    id: z.literal(ResumeSections.EXPERIENCE),
    items: z.array(experienceSchema),
  }),
  volunteer: sectionSchema.extend({
    id: z.literal(ResumeSections.VOLUNTEER),
    items: z.array(volunteerSchema),
  }),
  interests: sectionSchema.extend({
    id: z.literal(ResumeSections.INTERESTS),
    items: z.array(interestSchema),
  }),
  languages: sectionSchema.extend({
    id: z.literal(ResumeSections.LANGUAGES),
    items: z.array(languageSchema),
  }),
  profiles: sectionSchema.extend({
    id: z.literal(ResumeSections.PROFILES),
    items: z.array(profileSchema),
  }),
  projects: sectionSchema.extend({
    id: z.literal(ResumeSections.PROJECTS),
    items: z.array(projectSchema),
  }),
  publications: sectionSchema.extend({
    id: z.literal(ResumeSections.PUBLICATIONS),
    items: z.array(publicationSchema),
  }),
  references: sectionSchema.extend({
    id: z.literal(ResumeSections.REFERENCES),
    items: z.array(referenceSchema),
  }),
  skills: sectionSchema.extend({
    id: z.literal(ResumeSections.SKILLS),
    items: z.array(skillSchema),
  }),
  custom: z.record(z.string(), customSchema),
});

// Detailed Types
export type Section = z.infer<typeof sectionSchema>;
export type Sections = z.infer<typeof sectionsSchema>;

export type SectionKey = ResumeSections.BASICS | keyof Sections | `custom.${string}`;
export type SectionWithItem<T = unknown> = Sections[FilterKeys<Sections, { items: T[] }>];
export type SectionItem = SectionWithItem["items"][number];
export type CustomSectionGroup = z.infer<typeof customSchema>;

// Defaults
export const defaultSection: Section = {
  name: "",
  columns: 1,
  visible: true,
};

export const defaultSections: Sections = {
  summary: { ...defaultSection, id: ResumeSections.SUMMARY, name: "Summary", content: "" },
  awards: { ...defaultSection, id: ResumeSections.AWARDS, name: "Awards", items: [] },
  certifications: {
    ...defaultSection,
    id: ResumeSections.CERTIFICATIONS,
    name: "Certifications",
    items: [],
  },
  education: { ...defaultSection, id: ResumeSections.EDUCATION, name: "Education", items: [] },
  experience: { ...defaultSection, id: ResumeSections.EXPERIENCE, name: "Experience", items: [] },
  volunteer: { ...defaultSection, id: ResumeSections.VOLUNTEER, name: "Volunteering", items: [] },
  interests: { ...defaultSection, id: ResumeSections.INTERESTS, name: "Interests", items: [] },
  languages: { ...defaultSection, id: ResumeSections.LANGUAGES, name: "Languages", items: [] },
  profiles: { ...defaultSection, id: ResumeSections.PROFILES, name: "Profiles", items: [] },
  projects: { ...defaultSection, id: ResumeSections.PROJECTS, name: "Projects", items: [] },
  publications: {
    ...defaultSection,
    id: ResumeSections.PUBLICATIONS,
    name: "Publications",
    items: [],
  },
  references: { ...defaultSection, id: ResumeSections.REFERENCES, name: "References", items: [] },
  skills: { ...defaultSection, id: ResumeSections.SKILLS, name: "Skills", items: [] },
  custom: {},
};

export * from "./award";
export * from "./certification";
export * from "./custom-section";
export * from "./education";
export * from "./experience";
export * from "./interest";
export * from "./language";
export * from "./profile";
export * from "./project";
export * from "./publication";
export * from "./reference";
export * from "./skill";
export * from "./volunteer";
