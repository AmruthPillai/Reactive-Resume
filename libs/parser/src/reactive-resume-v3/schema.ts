import { z } from "zod";

const dateSchema = z.object({ start: z.string(), end: z.string() });

const profileSchema = z.object({
  id: z.string(),
  url: z.string(),
  network: z.string(),
  username: z.string(),
});

const basicsSchema = z.object({
  name: z.string(),
  email: z.literal("").or(z.string().email()),
  phone: z.string(),
  headline: z.string(),
  summary: z.string(),
  birthdate: z.string(),
  website: z.string(),
  profiles: z.array(profileSchema),
  location: z.object({
    address: z.string(),
    postalCode: z.string(),
    city: z.string(),
    country: z.string(),
    region: z.string(),
  }),
  photo: z.object({
    visible: z.boolean(),
    url: z.string(),
    filters: z.object({
      shape: z.string(),
      size: z.number(),
      border: z.boolean(),
      grayscale: z.boolean(),
    }),
  }),
});

const sectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(["basic", "custom"]),
  columns: z.number(),
  visible: z.boolean(),
});

const workSchema = z.object({
  id: z.string(),
  url: z.string(),
  date: dateSchema,
  name: z.string(),
  position: z.string(),
  summary: z.string(),
});

const awardSchema = z.object({
  id: z.string(),
  url: z.string(),
  date: z.string(),
  title: z.string(),
  awarder: z.string(),
  summary: z.string(),
});

const skillSchema = z.object({
  id: z.string(),
  name: z.string(),
  level: z.string(),
  keywords: z.array(z.string()),
  levelNum: z.number(),
});

const projectSchema = z.object({
  id: z.string(),
  url: z.string(),
  date: dateSchema,
  name: z.string(),
  summary: z.string(),
  keywords: z.array(z.string()),
  description: z.string(),
});

const educationSchema = z.object({
  id: z.string(),
  url: z.string(),
  area: z.string(),
  date: dateSchema,
  score: z.string(),
  degree: z.string(),
  courses: z.array(z.string()),
  summary: z.string(),
  institution: z.string(),
});

const interestSchema = z.object({
  id: z.string(),
  name: z.string(),
  keywords: z.array(z.string()),
});

const languageSchema = z.object({
  id: z.string(),
  name: z.string(),
  level: z.string(),
  levelNum: z.number(),
});

const volunteerSchema = z.object({
  id: z.string(),
  organization: z.string(),
  position: z.string(),
  date: dateSchema,
  url: z.string(),
  summary: z.string(),
});

const referenceSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  summary: z.string(),
  relationship: z.string(),
});

const publicationSchema = z.object({
  id: z.string(),
  url: z.string(),
  date: z.string(),
  name: z.string(),
  publisher: z.string(),
  summary: z.string(),
});

const certificationSchema = z.object({
  id: z.string(),
  url: z.string(),
  date: z.string(),
  name: z.string(),
  issuer: z.string(),
  summary: z.string(),
});

const metadataSchema = z.object({
  css: z.object({ value: z.string(), visible: z.boolean() }),
  date: z.object({ format: z.string() }),
  theme: z.object({ text: z.string(), primary: z.string(), background: z.string() }),
  layout: z.array(z.array(z.array(z.string()))),
  locale: z.string(),
  template: z.string(),
  typography: z.object({
    size: z.object({ body: z.number(), heading: z.number() }),
    family: z.object({ body: z.string(), heading: z.string() }),
  }),
});

export const reactiveResumeV3Schema = z.object({
  public: z.boolean(),
  basics: basicsSchema,
  sections: z.object({
    work: sectionSchema.extend({ items: z.array(workSchema) }),
    awards: sectionSchema.extend({ items: z.array(awardSchema) }),
    skills: sectionSchema.extend({ items: z.array(skillSchema) }),
    projects: sectionSchema.extend({ items: z.array(projectSchema) }),
    education: sectionSchema.extend({ items: z.array(educationSchema) }),
    interests: sectionSchema.extend({ items: z.array(interestSchema) }),
    languages: sectionSchema.extend({ items: z.array(languageSchema) }),
    volunteer: sectionSchema.extend({ items: z.array(volunteerSchema) }),
    references: sectionSchema.extend({ items: z.array(referenceSchema) }),
    publications: sectionSchema.extend({ items: z.array(publicationSchema) }),
    certifications: sectionSchema.extend({
      items: z.array(certificationSchema),
    }),
  }),
  metadata: metadataSchema,
});

export type ReactiveResumeV3 = z.infer<typeof reactiveResumeV3Schema>;
