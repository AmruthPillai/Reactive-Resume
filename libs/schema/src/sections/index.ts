import { FilterKeys } from "@reactive-resume/utils";
import { z } from "zod";

import { idSchema } from "../shared";
import { awardSchema, defaultAward, defaultAwardMapping } from "./award";
import { certificationSchema, defaultCertification, defaultCertificationMapping } from "./certification";
import { customSectionSchema, defaultCustomMapping } from "./custom-section";
import { defaultEducation, defaultEducationMapping, educationSchema } from "./education";
import { defaultExperience, defaultExperienceMapping, experienceSchema } from "./experience";
import { defaultInterest, defaultInterestMapping, interestSchema } from "./interest";
import { defaultLanguage, defaultLanguageMapping, languageSchema } from "./language";
import { defaultProfile, defaultProfileMapping, profileSchema } from "./profile";
import { defaultProject, defaultProjectMapping, projectSchema } from "./project";
import { defaultPublication, defaultPublicationMapping, publicationSchema } from "./publication";
import { defaultReference, defaultReferenceMapping, referenceSchema } from "./reference";
import { defaultSkill, defaultSkillMapping, skillSchema } from "./skill";
import { defaultVolunteer, defaultVolunteerMapping, volunteerSchema } from "./volunteer";

// Schema
export const sectionSchema = z.object({
  name: z.string(),
  columns: z.number().min(1).max(5).default(1),
  separateLinks: z.boolean().default(true),
  visible: z.boolean().default(true),
});

// Schema
export const customSchema = sectionSchema.extend({
  id: idSchema,
  items: z.array(customSectionSchema),
});

export const sectionsSchema = z.object({
  summary: sectionSchema.extend({
    id: z.literal("summary"),
    content: z.string().default(""),
  }),
  awards: sectionSchema.extend({
    id: z.literal("awards"),
    items: z.array(awardSchema),
  }),
  certifications: sectionSchema.extend({
    id: z.literal("certifications"),
    items: z.array(certificationSchema),
  }),
  education: sectionSchema.extend({
    id: z.literal("education"),
    items: z.array(educationSchema),
  }),
  experience: sectionSchema.extend({
    id: z.literal("experience"),
    items: z.array(experienceSchema),
  }),
  volunteer: sectionSchema.extend({
    id: z.literal("volunteer"),
    items: z.array(volunteerSchema),
  }),
  interests: sectionSchema.extend({
    id: z.literal("interests"),
    items: z.array(interestSchema),
  }),
  languages: sectionSchema.extend({
    id: z.literal("languages"),
    items: z.array(languageSchema),
  }),
  profiles: sectionSchema.extend({
    id: z.literal("profiles"),
    items: z.array(profileSchema),
  }),
  projects: sectionSchema.extend({
    id: z.literal("projects"),
    items: z.array(projectSchema),
  }),
  publications: sectionSchema.extend({
    id: z.literal("publications"),
    items: z.array(publicationSchema),
  }),
  references: sectionSchema.extend({
    id: z.literal("references"),
    items: z.array(referenceSchema),
  }),
  skills: sectionSchema.extend({
    id: z.literal("skills"),
    items: z.array(skillSchema),
  }),
  custom: z.record(z.string(), customSchema),
});

// Detailed Types
export type Section = z.infer<typeof sectionSchema>;
export type Sections = z.infer<typeof sectionsSchema>;

export type SectionKey = "basics" | keyof Sections | `custom.${string}` | "workStatus";
export type SectionWithItem<T = unknown> = Sections[FilterKeys<Sections, { items: T[] }>];
export type SectionItem = SectionWithItem["items"][number];
export type CustomSectionGroup = z.infer<typeof customSchema>;

// Defaults
export const defaultSection: Section = {
  name: "",
  columns: 1,
  separateLinks: true,
  visible: true,
};

export const defaultSections: Sections = {
  summary: { ...defaultSection, id: "summary", name: "Summary", content: "" },
  awards: { ...defaultSection, id: "awards", name: "Awards", items: [] },
  certifications: { ...defaultSection, id: "certifications", name: "Certifications", items: [] },
  education: { ...defaultSection, id: "education", name: "Education", items: [] },
  experience: { ...defaultSection, id: "experience", name: "Experience", items: [] },
  volunteer: { ...defaultSection, id: "volunteer", name: "Volunteering", items: [] },
  interests: { ...defaultSection, id: "interests", name: "Interests", items: [] },
  languages: { ...defaultSection, id: "languages", name: "Languages", items: [] },
  profiles: { ...defaultSection, id: "profiles", name: "Profiles", items: [] },
  projects: { ...defaultSection, id: "projects", name: "Projects", items: [] },
  publications: { ...defaultSection, id: "publications", name: "Publications", items: [] },
  references: { ...defaultSection, id: "references", name: "References", items: [] },
  skills: { ...defaultSection, id: "skills", name: "Skills", items: [] },
  custom: {},
};

export const defaultSectionsMapping = {
  summary: { name: "Summary", content: "" },
  awards: { name: "Awards", items: defaultAward },
  certifications: { name: "Certifications", items: defaultCertification },
  education: { name: "Education", items: defaultEducation },
  experience: { name: "Experience", items: defaultExperience },
  volunteer: { name: "Volunteering", items: defaultVolunteer },
  interests: { name: "Interests", items: defaultInterest },
  languages: { name: "Languages", items: defaultLanguage },
  profiles: { name: "Profiles", items: defaultProfile },
  projects: { name: "Projects", items: defaultProject },
  publications: { name: "Publications", items: defaultPublication },
  references: { name: "References", items: defaultReference },
  skills: { name: "Skills", items: defaultSkill },
  custom: defaultCustomMapping,
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
