import type {
  awardSchema,
  basicsSchema,
  certificationSchema,
  customSectionSchema,
  educationSchema,
  experienceSchema,
  interestSchema,
  languageSchema,
  profileSchema,
  projectSchema,
  publicationSchema,
  referenceSchema,
  skillSchema,
  volunteerSchema,
} from "@reactive-resume/schema";
import type { z } from "zod";

type BasicsItem = z.infer<typeof basicsSchema>;
type ProfileItem = z.infer<typeof profileSchema>;
type ExperienceItem = z.infer<typeof experienceSchema>;
type EducationItem = z.infer<typeof educationSchema>;
type SkillItem = z.infer<typeof skillSchema>;
type LanguageItem = z.infer<typeof languageSchema>;
type AwardItem = z.infer<typeof awardSchema>;
type CertificationItem = z.infer<typeof certificationSchema>;
type InterestItem = z.infer<typeof interestSchema>;
type ProjectItem = z.infer<typeof projectSchema>;
type PublicationItem = z.infer<typeof publicationSchema>;
type VolunteerItem = z.infer<typeof volunteerSchema>;
type ReferenceItem = z.infer<typeof referenceSchema>;
type CustomSectionItem = z.infer<typeof customSectionSchema>;

export type SectionTypes =
  | BasicsItem
  | ProfileItem
  | ExperienceItem
  | EducationItem
  | SkillItem
  | LanguageItem
  | AwardItem
  | CertificationItem
  | InterestItem
  | ProjectItem
  | PublicationItem
  | VolunteerItem
  | ReferenceItem
  | CustomSectionItem;
