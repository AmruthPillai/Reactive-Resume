import { z } from "zod";

const urlSchema = z.literal("").or(z.string().url()).optional();

const iso8601 = z
  .string()
  .regex(
    /^([1-2][0-9]{3}-[0-1][0-9]-[0-3][0-9]|[1-2][0-9]{3}-[0-1][0-9]|[1-2][0-9]{3})$/,
    "ISO8601 Date Format",
  );

const locationSchema = z.object({
  address: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
  countryCode: z.string().optional(),
  region: z.string().optional(),
});

const profileSchema = z.object({
  network: z.string().optional(),
  username: z.string().optional(),
  url: urlSchema,
});

const basicsSchema = z.object({
  name: z.string().optional(),
  label: z.string().optional(),
  image: z.literal("").or(z.string().url()).optional(),
  email: z.literal("").or(z.string().email()).optional(),
  phone: z.string().optional(),
  url: urlSchema,
  summary: z.string().optional(),
  location: locationSchema.optional(),
  profiles: z.array(profileSchema).optional(),
});

const workSchema = z.object({
  name: z.string().optional(),
  position: z.string().optional(),
  url: urlSchema,
  startDate: iso8601.optional(),
  endDate: iso8601.optional(),
  summary: z.string().optional(),
  highlights: z.array(z.string()).optional(),
});

const volunteerSchema = z.object({
  organization: z.string().optional(),
  position: z.string().optional(),
  url: urlSchema,
  startDate: iso8601.optional(),
  endDate: iso8601.optional(),
  summary: z.string().optional(),
  highlights: z.array(z.string()).optional(),
});

const awardsSchema = z.object({
  title: z.string().optional(),
  date: iso8601.optional(),
  awarder: z.string().optional(),
  summary: z.string().optional(),
});

const certificatesSchema = z.object({
  name: z.string().optional(),
  date: iso8601.optional(),
  issuer: z.string().optional(),
  summary: z.string().optional(),
});

const educationSchema = z.object({
  institution: z.string().optional(),
  url: urlSchema,
  area: z.string().optional(),
  studyType: z.string().optional(),
  startDate: iso8601.optional(),
  endDate: iso8601.optional(),
  score: z.string().optional(),
  courses: z.array(z.string()).optional(),
});

const publicationsSchema = z.object({
  name: z.string().optional(),
  publisher: z.string().optional(),
  releaseDate: iso8601.optional(),
  url: urlSchema,
  summary: z.string().optional(),
});

const skillsSchema = z.object({
  name: z.string().optional(),
  level: z.string().optional(),
  keywords: z.array(z.string()).optional(),
});

const languagesSchema = z.object({
  language: z.string().optional(),
  fluency: z.string().optional(),
});

const interestsSchema = z.object({
  name: z.string().optional(),
  keywords: z.array(z.string()).optional(),
});

const referencesSchema = z.object({
  name: z.string().optional(),
  reference: z.string().optional(),
});

export const jsonResumeSchema = z.object({
  basics: basicsSchema.optional(),
  work: z.array(workSchema).optional(),
  volunteer: z.array(volunteerSchema).optional(),
  education: z.array(educationSchema).optional(),
  awards: z.array(awardsSchema).optional(),
  certificates: z.array(certificatesSchema).optional(),
  publications: z.array(publicationsSchema).optional(),
  skills: z.array(skillsSchema).optional(),
  languages: z.array(languagesSchema).optional(),
  interests: z.array(interestsSchema).optional(),
  references: z.array(referencesSchema).optional(),
});

export type JsonResume = z.infer<typeof jsonResumeSchema>;
