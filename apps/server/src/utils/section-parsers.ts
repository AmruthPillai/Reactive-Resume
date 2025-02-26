import {
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

import type { SectionTypes } from "../types/section-items";

export function parseBasicData(data: SectionTypes) {
  return basicsSchema.parse(data);
}

export function parseProfileData(data: SectionTypes) {
  return profileSchema.parse(data);
}

export function parseExperienceData(data: SectionTypes) {
  return experienceSchema.parse(data);
}

export function parseEducationData(data: SectionTypes) {
  return educationSchema.parse(data);
}

export function parseSkillData(data: SectionTypes) {
  return skillSchema.parse(data);
}

export function parseLanguageData(data: SectionTypes) {
  return languageSchema.parse(data);
}

export function parseAwardData(data: SectionTypes) {
  return awardSchema.parse(data);
}

export function parseCertificationData(data: SectionTypes) {
  return certificationSchema.parse(data);
}

export function parseInterestData(data: SectionTypes) {
  return interestSchema.parse(data);
}

export function parseProjectData(data: SectionTypes) {
  return projectSchema.parse(data);
}

export function parsePublicationData(data: SectionTypes) {
  return publicationSchema.parse(data);
}

export function parseVolunteerData(data: SectionTypes) {
  return volunteerSchema.parse(data);
}

export function parseReferenceData(data: SectionTypes) {
  return referenceSchema.parse(data);
}

export function parseCustomData(data: SectionTypes) {
  return customSectionSchema.parse(data);
}
