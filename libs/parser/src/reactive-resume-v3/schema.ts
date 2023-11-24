import { z } from "zod";

const dateSchema = z
  .object({ start: z.string().optional(), end: z.string().optional() })
  .optional();

const profileSchema = z.object({
  id: z.string().optional(),
  url: z.string().optional(),
  network: z.string().optional(),
  username: z.string().optional(),
});

const basicsSchema = z.object({
  name: z.string().optional(),
  email: z.literal("").or(z.string().email()),
  phone: z.string().optional(),
  headline: z.string().optional(),
  summary: z
    .string()
    .or(
      z.object({
        body: z.string().optional(),
        visible: z.boolean().default(true),
        heading: z.string().optional(),
      }),
    )
    .optional(),
  birthdate: z.string().optional(),
  website: z.string().optional(),
  profiles: z.array(profileSchema),
  location: z.object({
    address: z.string().optional(),
    postalCode: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    region: z.string().optional(),
  }),
  photo: z.object({
    visible: z.boolean(),
    url: z.string().optional(),
    filters: z.object({
      shape: z.string().nullable().optional(),
      size: z.coerce.number(),
      border: z.boolean(),
      grayscale: z.boolean(),
    }),
  }),
});

const sectionSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  type: z.enum(["basic", "work", "custom"]),
  columns: z.coerce.number().or(z.null()).default(1),
  visible: z.boolean(),
});

const workSchema = z
  .object({
    id: z.string().optional(),
    url: z.string().optional(),
    date: dateSchema,
    name: z.string().optional(),
    position: z.string().optional(),
    summary: z.string().nullable().optional(),
  })
  .nullable();

const awardSchema = z
  .object({
    id: z.string().optional(),
    url: z.string().optional(),
    date: z.string().optional(),
    title: z.string().optional(),
    awarder: z.string().optional(),
    summary: z.string().nullable().optional(),
  })
  .nullable();

const skillSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().optional(),
    level: z.coerce.string().optional(),
    keywords: z.array(z.string().nullable()).optional(),
    levelNum: z.coerce.number(),
  })
  .nullable();

const projectSchema = z
  .object({
    id: z.string().optional(),
    url: z.string().optional(),
    date: dateSchema,
    name: z.string().optional(),
    summary: z.string().nullable().optional(),
    keywords: z.array(z.string().nullable()).optional(),
    description: z.string().optional(),
  })
  .nullable();

const educationSchema = z
  .object({
    id: z.string().optional(),
    url: z.string().optional(),
    area: z.string().optional(),
    date: dateSchema,
    score: z.string().optional(),
    degree: z.string().optional(),
    courses: z.array(z.string().nullable()).optional(),
    summary: z.string().nullable().optional(),
    institution: z.string().optional(),
  })
  .nullable();

const interestSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().optional(),
    keywords: z.array(z.string().nullable()).optional(),
  })
  .nullable();

const languageSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().optional(),
    level: z.string().optional(),
    levelNum: z.coerce.number(),
  })
  .nullable();

const volunteerSchema = z
  .object({
    id: z.string().optional(),
    organization: z.string().optional(),
    position: z.string().optional(),
    date: dateSchema,
    url: z.string().optional(),
    summary: z.string().nullable().optional(),
  })
  .nullable();

const referenceSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    summary: z.string().nullable().optional(),
    relationship: z.string().optional(),
  })
  .nullable();

const publicationSchema = z
  .object({
    id: z.string().optional(),
    url: z.string().optional(),
    date: z.string().optional(),
    name: z.string().optional(),
    publisher: z.string().optional(),
    summary: z.string().nullable().optional(),
  })
  .nullable();

const certificationSchema = z
  .object({
    id: z.string().optional(),
    url: z.string().optional(),
    date: z.string().optional(),
    name: z.string().optional(),
    issuer: z.string().optional(),
    summary: z.string().nullable().optional(),
  })
  .nullable();

const metadataSchema = z
  .object({
    css: z.object({ value: z.string().optional(), visible: z.boolean() }).optional(),
    date: z.object({ format: z.string().optional() }).optional(),
    theme: z
      .object({
        text: z.string().optional(),
        primary: z.string().optional(),
        background: z.string().optional(),
      })
      .optional(),
    layout: z.array(z.array(z.array(z.string().nullable()))).optional(),
    locale: z.string().optional(),
    template: z.string().optional(),
    typography: z
      .object({
        size: z
          .object({ body: z.coerce.number().optional(), heading: z.coerce.number().optional() })
          .optional(),
        family: z
          .object({ body: z.string().optional(), heading: z.string().optional() })
          .optional(),
      })
      .optional(),
  })
  .optional();

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
