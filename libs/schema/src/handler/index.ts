import { createId } from "@paralleldrive/cuid2";

import { defaultBasics, defaultMetadata, defaultWorkStatus } from "..";
import {
  defaultAward,
  defaultCertification,
  defaultCustomSection,
  defaultEducation,
  defaultExperience,
  defaultInterest,
  defaultLanguage,
  defaultProfile,
  defaultProject,
  defaultPublication,
  defaultReference,
  defaultSection,
  defaultSkill,
  defaultVolunteer,
} from "../sections";

const defaultValue = {
  ...defaultSection,
  name: "",
  items: defaultCustomSection,
};

export const customDefault = new Proxy(
  {},
  {
    get: function (target, prop) {
      if (typeof defaultValue === "object") {
        return {
          ...defaultValue,
          id: prop,
        };
      }
      return defaultValue;
    },
  },
);

export const defaultSectionsHandler = {
  summary: { ...defaultSection, id: "summary", name: "Summary", content: "" },
  awards: {
    ...defaultSection,
    id: "awards",
    name: "Awards",
    items: [],
    itemsDefault: { ...defaultAward, id: createId() },
  },
  certifications: {
    ...defaultSection,
    id: "certifications",
    name: "Certifications",
    items: [],
    itemsDefault: { ...defaultCertification, id: createId() },
  },
  education: {
    ...defaultSection,
    id: "education",
    name: "Education",
    items: [],
    itemsDefault: { ...defaultEducation, id: createId() },
  },
  experience: {
    ...defaultSection,
    id: "experience",
    name: "Experience",
    items: [],
    itemsDefault: defaultExperience,
  },
  volunteer: {
    ...defaultSection,
    id: "volunteer",
    name: "Volunteering",
    items: [],
    itemsDefault: defaultVolunteer,
  },
  interests: {
    ...defaultSection,
    id: "interests",
    name: "Interests",
    items: [],
    itemsDefault: defaultInterest,
  },
  languages: {
    ...defaultSection,
    id: "languages",
    name: "Languages",
    items: [],
    itemsDefault: defaultLanguage,
  },
  profiles: {
    ...defaultSection,
    id: "profiles",
    name: "Profiles",
    items: [],
    itemsDefault: defaultProfile,
  },
  projects: {
    ...defaultSection,
    id: "projects",
    name: "Projects",
    items: [],
    itemsDefault: defaultProject,
  },
  publications: {
    ...defaultSection,
    id: "publications",
    name: "Publications",
    items: [],
    itemsDefault: defaultPublication,
  },
  references: {
    ...defaultSection,
    id: "references",
    name: "References",
    items: [],
    itemsDefault: defaultReference,
  },
  skills: {
    ...defaultSection,
    id: "skills",
    name: "Skills",
    items: [],
    itemsDefault: defaultSkill,
  },
  custom: customDefault,
};

export const defaultBasicsHandler = {
  ...defaultBasics,
  customFields: {
    id: createId(),
    icon: "",
    name: "",
    value: "",
  },
};

export const defaultResumeHandler = {
  basics: defaultBasicsHandler,
  sections: defaultSectionsHandler,
  metadata: defaultMetadata,
  workStatus: defaultWorkStatus,
};
