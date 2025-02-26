export enum SectionNames {
  interests = "Interest",
  education = "Education",
  experience = "Experience",
  skills = "Skill",
  projects = "Project",
  profiles = "Profile",
  publications = "Publication",
  certifications = "Certification",
  languages = "Language",
  references = "Reference",
  volunteer = "Volunteering",
  summary = "Summary",
  awards = "Award",
  custom = "Custom",
}

export function getSectionNameFromId(id: string) {
  return Object.keys(SectionNames).includes(id as SectionNames)
    ? SectionNames[id as keyof typeof SectionNames]
    : SectionNames.custom;
}
