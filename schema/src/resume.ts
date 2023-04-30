import { z } from "zod";

import { BasicsSchema } from './basics';
import { MetadataSchema } from './metadata';
import { SectionSchema } from './section';
import { UserSchema } from './user';

export const ResumeSchema = z.object({
  id: z.number(),
  shortId: z.string(),
  name: z.string(),
  slug: z.string(),
  image: z.string(),
  user: UserSchema,
  basics: BasicsSchema,
  sections: z.record(z.string(), SectionSchema),
  metadata: MetadataSchema,
  public: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Resume = z.infer<typeof ResumeSchema>;

export const reactiveResumeV2JsonImportedSchema = ResumeSchema.pick({
  basics: true,
  sections: true,
  metadata: true,
  public: true
});
