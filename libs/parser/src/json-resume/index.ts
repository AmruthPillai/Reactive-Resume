import { createId } from "@paralleldrive/cuid2";
import {
  defaultAward,
  defaultCertification,
  defaultEducation,
  defaultExperience,
  defaultInterest,
  defaultLanguage,
  defaultProfile,
  defaultPublication,
  defaultReference,
  defaultResumeData,
  defaultSkill,
  defaultVolunteer,
  ResumeData,
} from "@reactive-resume/schema";
import { Json } from "@reactive-resume/utils";
import { Schema } from "zod";

import { Parser } from "../interfaces/parser";
import { JsonResume, jsonResumeSchema } from "./schema";

export * from "./schema";

export class JsonResumeParser implements Parser<Json, JsonResume> {
  schema: Schema;

  constructor() {
    this.schema = jsonResumeSchema;
  }

  readFile(file: File): Promise<Json> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        try {
          const result = JSON.parse(reader.result as string) as Json;
          resolve(result);
        } catch (error) {
          reject(new Error("Failed to parse JSON"));
        }
      };

      reader.onerror = () => {
        reject(new Error("Failed to read the file"));
      };

      reader.readAsText(file);
    });
  }

  validate(data: Json) {
    return this.schema.parse(data) as JsonResume;
  }

  convert(data: JsonResume) {
    const result = JSON.parse(JSON.stringify(defaultResumeData)) as ResumeData;

    // Basics
    result.basics.name = data.basics?.name ?? "";
    result.basics.headline = data.basics?.label ?? "";
    result.basics.picture.url = data.basics?.image ?? "";
    result.basics.email = data.basics?.email ?? "";
    result.basics.phone = data.basics?.phone ?? "";
    result.basics.location = data.basics?.location?.address ?? "";
    result.basics.url.href = data.basics?.url ?? "";
    result.sections.summary.content = data.basics?.summary ?? "";

    // Profiles
    if (data.basics?.profiles) {
      for (const profile of data.basics.profiles) {
        result.sections.profiles.items.push({
          ...defaultProfile,
          id: createId(),
          icon: profile.network?.toLocaleLowerCase() ?? "",
          network: profile.network ?? "",
          username: profile.username ?? "",
          url: { ...defaultProfile.url, href: profile.url ?? "" },
        });
      }
    }

    // Work
    if (data.work) {
      for (const work of data.work) {
        result.sections.experience.items.push({
          ...defaultExperience,
          id: createId(),
          company: work.name ?? "",
          position: work.position ?? "",
          summary: work.summary ?? "",
          date: `${work.startDate} - ${work.endDate}`,
          url: { ...defaultExperience.url, href: work.url ?? "" },
        });
      }
    }

    // Volunteer
    if (data.volunteer) {
      for (const volunteer of data.volunteer) {
        result.sections.volunteer.items.push({
          ...defaultVolunteer,
          id: createId(),
          organization: volunteer.organization ?? "",
          date: `${volunteer.startDate} - ${volunteer.endDate}`,
          position: volunteer.position ?? "",
          summary: volunteer.summary ?? "",
          url: { ...defaultVolunteer.url, href: volunteer.url ?? "" },
        });
      }
    }

    // Education
    if (data.education) {
      for (const education of data.education) {
        result.sections.education.items.push({
          ...defaultEducation,
          id: createId(),
          institution: education.institution ?? "",
          studyType: education.studyType ?? "",
          area: education.area ?? "",
          score: education.score ?? "",
          date: `${education.startDate} - ${education.endDate}`,
          url: { ...defaultEducation.url, href: education.url ?? "" },
        });
      }
    }

    // Awards
    if (data.awards) {
      for (const award of data.awards) {
        result.sections.awards.items.push({
          ...defaultAward,
          id: createId(),
          title: award.title ?? "",
          date: award.date ?? "",
          awarder: award.awarder ?? "",
          summary: award.summary ?? "",
        });
      }
    }

    // Certificates
    if (data.certificates) {
      for (const certificate of data.certificates) {
        result.sections.certifications.items.push({
          ...defaultCertification,
          id: createId(),
          name: certificate.name ?? "",
          date: certificate.date ?? "",
          issuer: certificate.issuer ?? "",
          summary: certificate.summary ?? "",
        });
      }
    }

    // Publications
    if (data.publications) {
      for (const publication of data.publications) {
        result.sections.publications.items.push({
          ...defaultPublication,
          id: createId(),
          name: publication.name ?? "",
          publisher: publication.publisher ?? "",
          summary: publication.summary ?? "",
          date: publication.releaseDate ?? "",
          url: { ...defaultPublication.url, href: publication.url ?? "" },
        });
      }
    }

    // Skills
    if (data.skills) {
      for (const skill of data.skills) {
        result.sections.skills.items.push({
          ...defaultSkill,
          id: createId(),
          name: skill.name ?? "",
          description: skill.level ?? "",
          keywords: skill.keywords ?? [],
        });
      }
    }

    // Languages
    if (data.languages) {
      for (const language of data.languages) {
        result.sections.languages.items.push({
          ...defaultLanguage,
          id: createId(),
          name: language.language ?? "",
          description: language.fluency ?? "",
        });
      }
    }

    // Interests
    if (data.interests) {
      for (const interest of data.interests) {
        result.sections.interests.items.push({
          ...defaultInterest,
          id: createId(),
          name: interest.name ?? "",
          keywords: interest.keywords ?? [],
        });
      }
    }

    // References
    if (data.references) {
      for (const reference of data.references) {
        result.sections.references.items.push({
          ...defaultReference,
          id: createId(),
          name: reference.name ?? "",
          summary: reference.reference ?? "",
        });
      }
    }

    return result;
  }
}
