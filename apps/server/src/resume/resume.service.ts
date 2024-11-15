import { openai } from "@ai-sdk/openai";
import { HttpService } from "@nestjs/axios";
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createId } from "@paralleldrive/cuid2";
import { Prisma } from "@prisma/client";
import {
  CreateAiResumeDto,
  CreateResumeDto,
  ImportLinkedinDto,
  ImportResumeDto,
  ResumeDto,
  UpdateResumeDto,
} from "@reactive-resume/dto";
import {
  Basics,
  defaultResumeData,
  defaultSection,
  defaultUrl,
  experienceSchema,
  referenceSchema,
  ResumeData,
  Sections,
  skillSchema,
} from "@reactive-resume/schema";
import type { DeepPartial } from "@reactive-resume/utils";
import { ErrorMessage, generateRandomName, kebabCase } from "@reactive-resume/utils";
import { generateObject } from "ai";
import deepmerge from "deepmerge";
import { PrismaService } from "nestjs-prisma";
import { z } from "zod";

import { PrinterService } from "@/server/printer/printer.service";

import { Config } from "../config/schema";
import { StorageService } from "../storage/storage.service";

@Injectable()
export class ResumeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly printerService: PrinterService,
    private readonly storageService: StorageService,
    private readonly configService: ConfigService<Config>,
  ) {}

  async aiCreate(userId: string, createAiResumeDto: CreateAiResumeDto) {
    if (!createAiResumeDto.existingResumeId)
      throw new BadRequestException(ErrorMessage.ResumeNotFound);

    const { name, email, picture } = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { name: true, email: true, picture: true },
    });

    const existingResume = (await this.prisma.resume.findUniqueOrThrow({
      where: { userId_id: { userId, id: createAiResumeDto.existingResumeId } },
    })) as ResumeDto;

    const jobDescription = createAiResumeDto.jobDescription ?? "";

    console.log("AI Resume Creation:", {
      name,
      email,
      picture,
      existingResume,
      jobDescription,
    });

    const newResumeData = existingResume.data;
    const existingSkills = existingResume.data.sections.skills;
    const existingSummary = existingResume.data.sections.summary;
    const existingReferences = existingResume.data.sections.references;
    const existingExperiences = existingResume.data.sections.experience;
    const existingHeadline = existingResume.data.basics.headline;

    const relevantSkillsPromise = generateObject({
      model: openai("gpt-4o"),
      system:
        "You are a sophisticated AI that helps transform candidates resumes into the best version for the job",
      prompt: `Help me select the top 5 skills for this job application from my existing list of skills. for the skill level please put 4 or 5 but nothing less.
      here is my list of skills: ${JSON.stringify(existingSkills)},
      here is the job description: ${jobDescription}`,
      schema: z.object({ items: z.array(skillSchema) }),
    });

    const betterSummaryPromise = generateObject({
      model: openai("gpt-4o"),
      system:
        "You are a sophisticated AI that helps transform candidates resumes into the best version for the job",
      prompt: `Help me refine my summary for this job application. be very concise and show my best features as a person and make it as relevant as possible. don't lie.,
      here is my current summary: ${JSON.stringify(existingSummary)},
      here is the job description: ${jobDescription}`,
      schema: z.object({ result: z.string().default("") }),
    });

    const relevantReferencesPromise = generateObject({
      model: openai("gpt-4o"),
      system:
        "You are a sophisticated AI that helps transform candidates resumes into the best version for the job",
      prompt: `Help me select the top 3 references for this job application from my existing list of references. do not make up any new one if it doesn't exist. if empty, leave it empty.,
      here is my list of references: ${JSON.stringify(existingReferences)},
      here is the job description: ${jobDescription}`,
      schema: z.object({ items: z.array(referenceSchema) }),
    });

    const betterExperiencesPromise = generateObject({
      model: openai("gpt-4o"),
      system:
        "You are a sophisticated AI that helps transform candidates resumes into the best version for the job",
      prompt: `Help me refine my job experiences for this job application. if the experience is not fitted to the job, try and make the summary as fitted as possible but don't exaggerate. for the url, select a nice label for the link.,
      here is my current job experiences: ${JSON.stringify(existingExperiences)},
      here is the job description: ${jobDescription}`,
      schema: z.object({ items: z.array(experienceSchema) }),
    });

    const betterHeadlinePromise = generateObject({
      model: openai("gpt-4o"),
      system:
        "You are a sophisticated AI that helps transform candidates resumes into the best version for the job",
      prompt: `Create the perfect headline for this role. make it concise and relevant. no longer than 5 words.
      here is my current headline: ${existingHeadline},
      here is the job description: ${jobDescription}`,
      schema: z.object({ result: z.string().default("") }),
    });

    const [relevantSkills, betterSummary, relevantReferences, betterExperiences, betterHeadline] =
      await Promise.all([
        relevantSkillsPromise,
        betterSummaryPromise,
        relevantReferencesPromise,
        betterExperiencesPromise,
        betterHeadlinePromise,
      ]);

    const newSummary = { ...existingSummary, content: betterSummary.object.result };
    const newSkills = { ...existingSkills, items: relevantSkills.object.items };
    const newReferences = { ...existingReferences, items: relevantReferences.object.items };
    const newExperiences = { ...existingExperiences, items: betterExperiences.object.items };

    const data = deepmerge(
      newResumeData,
      {
        basics: { headline: betterHeadline.object.result },
        sections: {
          summary: newSummary,
          skills: newSkills,
          references: newReferences,
          experience: newExperiences,
        },
      } satisfies DeepPartial<ResumeData>,
      { arrayMerge: (destination, source) => source },
    );

    const resume = this.prisma.resume.create({
      data: {
        data: data,
        userId,
        lockedPremium: true,
        title: createAiResumeDto.title + " (AI)",
        visibility: createAiResumeDto.visibility,
        slug: createAiResumeDto.slug ?? kebabCase(createAiResumeDto.title),
      },
    });

    return resume;
  }

  async create(userId: string, createResumeDto: CreateResumeDto) {
    const { name, email, picture } = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { name: true, email: true, picture: true },
    });

    const data = deepmerge(defaultResumeData, {
      basics: { name, email, picture: { url: picture ?? "" } },
    } satisfies DeepPartial<ResumeData>);

    return this.prisma.resume.create({
      data: {
        data,
        userId,
        title: createResumeDto.title,
        visibility: createResumeDto.visibility,
        slug: createResumeDto.slug ?? kebabCase(createResumeDto.title),
      },
    });
  }

  import(userId: string, importResumeDto: ImportResumeDto) {
    const randomTitle = generateRandomName();

    return this.prisma.resume.create({
      data: {
        userId,
        visibility: "private",
        data: importResumeDto.data,
        lockedPremium: importResumeDto.lockedPremium,
        title: importResumeDto.title ?? randomTitle,
        slug: importResumeDto.slug ?? kebabCase(randomTitle),
      },
    });
  }

  async importLinkedin(userId: string, importLinkedinDto: ImportLinkedinDto) {
    const SCRAPIN_API_KEY = this.configService.get<string>("SCRAPIN_API_KEY");
    const linkedinScrapeURL = `https://api.scrapin.io/enrichment/profile?apikey=${SCRAPIN_API_KEY}&linkedinUrl=${importLinkedinDto.linkedinURL}`;
    const linkedinRes = await this.httpService.axiosRef.get(linkedinScrapeURL);

    const resume = scrapinToResume(linkedinRes.data);
    const randomTitle = `LinkedIn (${new Date().toLocaleDateString()})`;

    const data = deepmerge(defaultResumeData, {
      basics: resume.basics,
      sections: resume.sections,
    } satisfies DeepPartial<ResumeData>);

    return this.prisma.resume.create({
      data: {
        userId,
        visibility: "private",
        data,
        title: randomTitle,
        slug: kebabCase(randomTitle),
      },
    });
  }

  findAll(userId: string) {
    return this.prisma.resume.findMany({ where: { userId }, orderBy: { updatedAt: "desc" } });
  }

  findOne(id: string, userId?: string) {
    if (userId) {
      return this.prisma.resume.findUniqueOrThrow({ where: { userId_id: { userId, id } } });
    }

    return this.prisma.resume.findUniqueOrThrow({ where: { id } });
  }

  async findOneStatistics(id: string) {
    const result = await this.prisma.statistics.findFirst({
      select: { views: true, downloads: true },
      where: { resumeId: id },
    });

    return {
      views: result?.views ?? 0,
      downloads: result?.downloads ?? 0,
    };
  }

  async findOneByUsernameSlug(username: string, slug: string, userId?: string) {
    const resume = await this.prisma.resume.findFirstOrThrow({
      where: { user: { username }, slug, visibility: "public" },
    });

    // Update statistics: increment the number of views by 1
    if (!userId) {
      await this.prisma.statistics.upsert({
        where: { resumeId: resume.id },
        create: { views: 1, downloads: 0, resumeId: resume.id },
        update: { views: { increment: 1 } },
      });
    }

    return resume;
  }

  async update(userId: string, id: string, updateResumeDto: UpdateResumeDto) {
    try {
      const { locked } = await this.prisma.resume.findUniqueOrThrow({
        where: { id },
        select: { locked: true },
      });

      if (locked) throw new BadRequestException(ErrorMessage.ResumeLocked);

      return await this.prisma.resume.update({
        data: {
          title: updateResumeDto.title,
          slug: updateResumeDto.slug,
          visibility: updateResumeDto.visibility,
          data: updateResumeDto.data as unknown as Prisma.JsonObject,
        },
        where: { userId_id: { userId, id } },
      });
    } catch (error) {
      if (error.code === "P2025") {
        Logger.error(error);
        throw new InternalServerErrorException(error);
      }
    }
  }

  lock(userId: string, id: string, set: boolean) {
    return this.prisma.resume.update({
      data: { locked: set },
      where: { userId_id: { userId, id } },
    });
  }

  async remove(userId: string, id: string) {
    await Promise.all([
      // Remove files in storage, and their cached keys
      this.storageService.deleteObject(userId, "resumes", id),
      this.storageService.deleteObject(userId, "previews", id),
    ]);

    return this.prisma.resume.delete({ where: { userId_id: { userId, id } } });
  }

  async printResume(resume: ResumeDto, userId?: string) {
    const url = await this.printerService.printResume(resume);

    // Update statistics: increment the number of downloads by 1
    if (!userId) {
      await this.prisma.statistics.upsert({
        where: { resumeId: resume.id },
        create: { views: 0, downloads: 1, resumeId: resume.id },
        update: { downloads: { increment: 1 } },
      });
    }

    return url;
  }

  printPreview(resume: ResumeDto) {
    return this.printerService.printPreview(resume);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function scrapinToResume(scrapin: any) {
  const person = scrapin.person;
  const fullName = `${person.firstName} ${person.lastName}`;
  const headline = person.headline ?? "";
  const location = person.location ?? "";
  const pictureUrl = person.photoUrl ?? "";
  const summary = person.summary ?? "";

  const skills = person.skills.map((skill: string) => {
    return {
      id: createId(),
      visible: true,
      name: skill,
      description: "",
      level: 0,
      keywords: [],
    };
  });

  const languages = person.languages.map((lang: string) => {
    return {
      id: createId(),
      visible: true,
      name: lang,
      description: "",
      level: 0,
    };
  });

  const profile = {
    id: createId(),
    visible: true,
    network: "LinkedIn",
    username: person.publicIdentifier,
    icon: "linkedin",
    url: {
      label: "",
      href: person.linkedInUrl,
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const experiences = person.positions.positionHistory.map((position: any) => {
    const date = formatDateRange(position.startEndDated);

    return {
      id: createId(),
      visible: true,
      company: position.companyName ?? "",
      position: position.title ?? "",
      location: "",
      date: date,
      summary: position.description ?? "",
      url: {
        label: "",
        href: position.linkedInUrl ?? "",
      },
    };
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const educations = person.schools.educationHistory.map((school: any) => {
    const date = formatDateRange(school.startEndDated);

    return {
      id: createId(),
      visible: true,
      institution: school.schoolName ?? "",
      studyType: school.fieldOfStudy ?? "",
      area: "",
      score: "",
      date: date,
      summary: school.degreeName ?? "",
      url: {
        label: "",
        href: school.linkedInUrl ?? "",
      },
    };
  });

  const basics: Basics = {
    name: fullName,
    headline: headline,
    email: "",
    phone: "",
    location: location,
    url: defaultUrl,
    customFields: [],
    picture: {
      url: pictureUrl,
      size: 64,
      aspectRatio: 1,
      borderRadius: 0,
      effects: {
        hidden: false,
        border: false,
        grayscale: false,
      },
    },
  };

  const sections: Sections = {
    summary: {
      ...defaultSection,
      id: "summary",
      name: "Summary",
      content: summary,
    },
    education: {
      ...defaultSection,
      id: "education",
      name: "Education",
      items: educations,
    },
    experience: {
      ...defaultSection,
      id: "experience",
      name: "Experience",
      items: experiences,
    },
    skills: {
      ...defaultSection,
      id: "skills",
      name: "Skills",
      items: skills,
    },
    languages: {
      ...defaultSection,
      id: "languages",
      name: "Languages",
      items: languages,
    },
    profiles: {
      ...defaultSection,
      id: "profiles",
      name: "Profiles",
      items: [profile],
    },

    volunteer: { ...defaultSection, id: "volunteer", name: "Volunteering", items: [] },
    interests: { ...defaultSection, id: "interests", name: "Interests", items: [] },
    projects: { ...defaultSection, id: "projects", name: "Projects", items: [] },
    publications: { ...defaultSection, id: "publications", name: "Publications", items: [] },
    references: { ...defaultSection, id: "references", name: "References", items: [] },
    awards: { ...defaultSection, id: "awards", name: "Awards", items: [] },
    certifications: { ...defaultSection, id: "certifications", name: "Certifications", items: [] },
    custom: {},
  };

  return {
    basics,
    sections,
  };
}

function formatDateRange(startEndDate?: {
  start?: { month: number; year: number };
  end?: { month: number; year: number };
}): string {
  if (!startEndDate) return "";

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const { start, end } = startEndDate;

  const formatMonthYear = (date: { month: number; year: number }) => {
    return `${monthNames[date.month - 1]} ${date.year}`;
  };

  if (start && end) {
    return `${formatMonthYear(start)} to ${formatMonthYear(end)}`;
  } else if (start) {
    return `Since ${formatMonthYear(start)}`;
  } else if (end) {
    return `Until ${formatMonthYear(end)}`;
  } else {
    return "";
  }
}
