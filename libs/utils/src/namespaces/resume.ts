// Resume Sections
export enum ResumeSections {
  BASICS = "basics",
  SUMMARY = "summary",
  PROFILES = "profiles",
  EXPERIENCE = "experience",
  EDUCATION = "education",
  LANGUAGES = "languages",
  AWARDS = "awards",
  CERTIFICATIONS = "certifications",
  INTERESTS = "interests",
  PROJECTS = "projects",
  PUBLICATIONS = "publications",
  VOLUNTEER = "volunteer",
  SKILLS = "skills",
  REFERENCES = "references",
  CUSTOM = "custom",
}

// Resume Options for Export/Format
export enum ResumeOptions {
  TEMPLATE = "template",
  LAYOUT = "layout",
  TYPOGRAPHY = "typography",
  THEME = "theme",
  PAGE = "page",
  SHARING = "sharing",
  STATISTICS = "statistics",
  NOTES = "notes",
  EXPORT = "export",
  INFORMATION = "information",
  COPYRIGHT = "copyright",
}

export const isValidResumeSection = (section?: string): section is ResumeSections => {
  return Object.values<string>(ResumeSections).includes(section || "");
};

export const isValidResumeOption = (section?: string): section is ResumeOptions => {
  return Object.values<string>(ResumeOptions).includes(section || "");
};

export const getValidSectionValue = (section?: string) =>
  isValidResumeSection(section) ? (section as ResumeSections) : null;

export const getValidOptionValue = (option?: string) =>
  isValidResumeOption(option) ? (option as ResumeOptions) : null;
