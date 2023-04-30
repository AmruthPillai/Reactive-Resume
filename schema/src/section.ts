import { z } from "zod";

import { DateRangeSchema } from './atoms';
import { ProfileSchema } from './basics';

export const WorkExperienceSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  position: z.string(),
  date: DateRangeSchema.optional(),
  url: z.string().optional(),
  summary: z.string().optional()
});
export type WorkExperience = z.infer<typeof WorkExperienceSchema>;

export const EducationSchema = z.object({
  id: z.string().optional(),
  institution: z.string(),
  degree: z.string(),
  area: z.string().optional(),
  score: z.string().optional(),
  date: DateRangeSchema.optional(),
  url: z.string().optional(),
  summary: z.string().optional(),
  courses: z.array(z.string()).optional()
});
export type Education = z.infer<typeof EducationSchema>;

export const AwardSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  awarder: z.string(),
  date: z.string().optional(),
  url: z.string().optional(),
  summary: z.string().optional()
});
export type Award = z.infer<typeof AwardSchema>;

export const CertificateSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  issuer: z.string(),
  date: z.string().optional(),
  url: z.string().optional(),
  summary: z.string().optional()
});
export type Certificate = z.infer<typeof CertificateSchema>;

export const VolunteerSchema = z.object({
  id: z.string().optional(),
  organization: z.string(),
  position: z.string(),
  date: DateRangeSchema.optional(),
  url: z.string().optional(),
  summary: z.string().optional()
});
export type Volunteer = z.infer<typeof VolunteerSchema>;

export const PublicationSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  publisher: z.string(),
  date: z.string().optional(),
  url: z.string().optional(),
  summary: z.string().optional()
});
export type Publication = z.infer<typeof PublicationSchema>;

export const SkillSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  level: z.string().optional(),
  levelNum: z.number(),
  keywords: z.array(z.string()).optional()
});
export type Skill = z.infer<typeof SkillSchema>;

export const LanguageSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  level: z.string(),
  levelNum: z.number()
});
export type Language = z.infer<typeof LanguageSchema>;

export const InterestSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  keywords: z.array(z.string()).optional()
});
export type Interest = z.infer<typeof InterestSchema>;

export const ProjectSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  date: DateRangeSchema.optional(),
  url: z.string().optional(),
  summary: z.string().optional(),
  keywords: z.array(z.string()).optional()
});
export type Project = z.infer<typeof ProjectSchema>;

export const ReferenceSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  relationship: z.string(),
  phone: z.string().optional(),
  email: z.string().optional(),
  summary: z.string().optional()
});
export type Reference = z.infer<typeof ReferenceSchema>;

export const CustomSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  date: DateRangeSchema.optional(),
  url: z.string().optional(),
  level: z.string().optional(),
  levelNum: z.number().optional(),
  summary: z.string().optional(),
  keywords: z.array(z.string()).optional()
});
export type Custom = z.infer<typeof CustomSchema>;

export const ListItemSchema = z.union([
  AwardSchema,
  CertificateSchema,
  EducationSchema,
  InterestSchema,
  LanguageSchema,
  ProfileSchema,
  ProjectSchema,
  PublicationSchema,
  ReferenceSchema,
  SkillSchema,
  VolunteerSchema,
  WorkExperienceSchema,
  CustomSchema
]);
export type ListItem = z.infer<typeof ListItemSchema>;

export const SectionTypeSchema = z.enum([
  'basic',
  'location',
  'profiles',
  'education',
  'awards',
  'certifications',
  'publications',
  'skills',
  'languages',
  'interests',
  'volunteer',
  'projects',
  'references',
  'custom',
  'work'
]);

export type SectionType = z.infer<typeof SectionTypeSchema>;

export const SectionPathSchema = z.string().regex(/^sections\..*$/);
export type SectionPath = z.infer<typeof SectionPathSchema>;

export const SectionSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  type: SectionTypeSchema,
  columns: z.number(),
  visible: z.boolean(),
  items: z.array(ListItemSchema),
  isDuplicated: z.boolean().optional()
});
export type Section = z.infer<typeof SectionSchema>;
