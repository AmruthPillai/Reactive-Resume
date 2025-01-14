/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createId } from "@paralleldrive/cuid2";
import {
  defaultAward,
  defaultCertification,
  defaultEducation,
  defaultExperience,
  defaultInterest,
  defaultLanguage,
  defaultProfile,
  defaultProject,
  defaultPublication,
  defaultReference,
  defaultResumeData,
  defaultSkill,
  defaultVolunteer,
} from "@reactive-resume/schema";
import type { Json } from "@reactive-resume/utils";
import { isUrl } from "@reactive-resume/utils";
import type { Schema } from "zod";

import type { Parser } from "../interfaces/parser";
import type { ReactiveResumeV3 } from "./schema";
import { reactiveResumeV3Schema } from "./schema";

export * from "./schema";

export class ReactiveResumeV3Parser implements Parser<Json, ReactiveResumeV3> {
  schema: Schema;

  constructor() {
    this.schema = reactiveResumeV3Schema;
  }

  readFile(file: File): Promise<Json> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // eslint-disable-next-line unicorn/prefer-add-event-listener
      reader.onload = () => {
        try {
          const result = JSON.parse(reader.result as string) as Json;
          resolve(result);
        } catch {
          reject(new Error("Failed to parse JSON"));
        }
      };

      // eslint-disable-next-line unicorn/prefer-add-event-listener
      reader.onerror = () => {
        reject(new Error("Failed to read the file"));
      };

      // eslint-disable-next-line unicorn/prefer-blob-reading-methods
      reader.readAsText(file);
    });
  }

  validate(data: Json) {
    return this.schema.parse(data) as ReactiveResumeV3;
  }

  convert(data: ReactiveResumeV3) {
    const result = JSON.parse(JSON.stringify(defaultResumeData));

    // Basics
    result.basics.name = data.basics.name ?? "";
    result.basics.email = data.basics.email;
    result.basics.phone = data.basics.phone ?? "";
    result.basics.headline = data.basics.headline ?? "";
    result.basics.location = data.basics.location.address ?? "";
    result.sections.summary.content =
      (typeof data.basics.summary === "string" ? data.basics.summary : data.basics.summary?.body) ??
      "";
    result.basics.picture.url = isUrl(data.basics.photo.url) ? data.basics.photo.url! : "";

    // Profiles
    if (data.basics.profiles && data.basics.profiles.length > 0) {
      for (const profile of data.basics.profiles) {
        result.sections.profiles.items.push({
          ...defaultProfile,
          id: createId(),
          network: profile.network ?? "",
          username: profile.username ?? "",
          icon: (profile.network ?? "").toLocaleLowerCase(),
          url: { ...defaultProfile.url, href: isUrl(profile.url) ? profile.url! : "" },
        });
      }
    }

    // Work
    if (data.sections.work?.items && data.sections.work.items.length > 0) {
      for (const work of data.sections.work.items) {
        if (!work) continue;

        result.sections.experience.items.push({
          ...defaultExperience,
          id: createId(),
          company: work.name ?? "",
          position: work.position ?? "",
          summary: work.summary ?? "",
          date: `${work.date?.start} - ${work.date?.end}`,
          url: { ...defaultExperience.url, href: isUrl(work.url) ? work.url! : "" },
        });
      }
    }

    // Awards
    if (data.sections.awards?.items && data.sections.awards.items.length > 0) {
      for (const award of data.sections.awards.items) {
        if (!award) continue;

        result.sections.awards.items.push({
          ...defaultAward,
          id: createId(),
          title: award.title ?? "",
          awarder: award.awarder ?? "",
          date: award.date ?? "",
          summary: award.summary ?? "",
          url: { ...defaultAward.url, href: isUrl(award.url) ? award.url! : "" },
        });
      }
    }

    // Skills
    if (data.sections.skills?.items && data.sections.skills.items.length > 0) {
      for (const skill of data.sections.skills.items) {
        if (!skill) continue;

        result.sections.skills.items.push({
          ...defaultSkill,
          id: createId(),
          name: skill.name ?? "",
          level: Math.floor(skill.levelNum / 2),
          description: skill.level ?? "",
          keywords: Array.isArray(skill.keywords)
            ? (skill.keywords.filter(Boolean) as string[])
            : [],
        });
      }
    }

    // Projects
    if (data.sections.projects?.items && data.sections.projects.items.length > 0) {
      for (const project of data.sections.projects.items) {
        if (!project) continue;

        result.sections.projects.items.push({
          ...defaultProject,
          id: createId(),
          name: project.name ?? "",
          summary: project.summary ?? "",
          description: project.description ?? "",
          date: `${project.date?.start} - ${project.date?.end}`,
          keywords: Array.isArray(project.keywords)
            ? (project.keywords.filter(Boolean) as string[])
            : [],
          url: { ...defaultProject.url, href: isUrl(project.url) ? project.url! : "" },
        });
      }
    }

    // Education
    if (data.sections.education?.items && data.sections.education.items.length > 0) {
      for (const education of data.sections.education.items) {
        if (!education) continue;

        result.sections.education.items.push({
          ...defaultEducation,
          id: createId(),
          institution: education.institution ?? "",
          studyType: education.degree ?? "",
          area: education.area ?? "",
          score: education.score ?? "",
          summary: education.summary ?? "",
          date: `${education.date?.start} - ${education.date?.end}`,
          url: { ...defaultEducation.url, href: isUrl(education.url) ? education.url! : "" },
        });
      }
    }

    // Interests
    if (data.sections.interests?.items && data.sections.interests.items.length > 0) {
      for (const interest of data.sections.interests.items) {
        if (!interest) continue;

        result.sections.interests.items.push({
          ...defaultInterest,
          id: createId(),
          name: interest.name ?? "",
          keywords: Array.isArray(interest.keywords)
            ? (interest.keywords.filter(Boolean) as string[])
            : [],
        });
      }
    }

    // Languages
    if (data.sections.languages?.items && data.sections.languages.items.length > 0) {
      for (const language of data.sections.languages.items) {
        if (!language) continue;

        result.sections.languages.items.push({
          ...defaultLanguage,
          id: createId(),
          name: language.name ?? "",
          description: language.level ?? "",
          level: Math.floor(language.levelNum / 2),
        });
      }
    }

    // Volunteer
    if (data.sections.volunteer?.items && data.sections.volunteer.items.length > 0) {
      for (const volunteer of data.sections.volunteer.items) {
        if (!volunteer) continue;

        result.sections.volunteer.items.push({
          ...defaultVolunteer,
          id: createId(),
          organization: volunteer.organization ?? "",
          position: volunteer.position ?? "",
          summary: volunteer.summary ?? "",
          date: `${volunteer.date?.start} - ${volunteer.date?.end}`,
          url: { ...defaultVolunteer.url, href: isUrl(volunteer.url) ? volunteer.url! : "" },
        });
      }
    }

    // References
    if (data.sections.references?.items && data.sections.references.items.length > 0) {
      for (const reference of data.sections.references.items) {
        if (!reference) continue;

        result.sections.references.items.push({
          ...defaultReference,
          id: createId(),
          name: reference.name ?? "",
          summary: reference.summary ?? "",
          description: reference.relationship ?? "",
        });
      }
    }

    // Publications
    if (data.sections.publications?.items && data.sections.publications.items.length > 0) {
      for (const publication of data.sections.publications.items) {
        if (!publication) continue;

        result.sections.publications.items.push({
          ...defaultPublication,
          id: createId(),
          name: publication.name ?? "",
          summary: publication.summary ?? "",
          date: publication.date ?? "",
          url: { ...defaultPublication.url, href: isUrl(publication.url) ? publication.url! : "" },
        });
      }
    }

    // Certifications
    if (data.sections.certifications?.items && data.sections.certifications.items.length > 0) {
      for (const certification of data.sections.certifications.items) {
        if (!certification) continue;

        result.sections.certifications.items.push({
          ...defaultCertification,
          id: createId(),
          name: certification.name ?? "",
          issuer: certification.issuer ?? "",
          summary: certification.summary ?? "",
          date: certification.date ?? "",
          url: {
            ...defaultCertification.url,
            href: isUrl(certification.url) ? certification.url! : "",
          },
        });
      }
    }

    return result;
  }
}
