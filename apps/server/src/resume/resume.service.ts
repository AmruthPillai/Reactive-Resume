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
  leanBasicsSchema,
  leanSectionsSchema,
  ResumeData,
  Sections,
} from "@reactive-resume/schema";
import type { DeepPartial } from "@reactive-resume/utils";
import { ErrorMessage, generateRandomName, kebabCase } from "@reactive-resume/utils";
import { generateObject } from "ai";
import deepmerge from "deepmerge";
import { PrismaService } from "nestjs-prisma";

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
    const { name, email, picture } = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { name: true, email: true, picture: true },
    });

    const existingResume =
      createAiResumeDto.existingResumeId &&
      (await this.prisma.resume.findUniqueOrThrow({
        where: { userId_id: { userId, id: createAiResumeDto.existingResumeId } },
      }));

    const jobDescription = createAiResumeDto.jobDescription ?? "";

    console.log("AI Resume Creation:", {
      name,
      email,
      picture,
      existingResume,
      jobDescription,
    });

    const { object: basicsResult } = await generateObject({
      model: openai("gpt-4o"),
      system: "You generate a resume",
      // here is a sample resume data (don't use data from here): ${JSON.stringify(defaultResumeData.basics)},
      prompt: `Create a new resume from my existing resume for the job description.,
      here is my current resume: ${JSON.stringify(existingResume)},
      here is the job description: ${jobDescription}`,
      schema: leanBasicsSchema,
    });

    const { object: sectionsResult } = await generateObject({
      model: openai("gpt-4o"),
      system: "You generate a resume",
      // here is a sample resume data (don't use data from here): ${JSON.stringify(defaultResumeData.basics)},
      prompt: `Create a new resume from my existing resume for the job description.,
      here is my current resume: ${JSON.stringify(existingResume)},
      here is the job description: ${jobDescription}`,
      schema: leanSectionsSchema,
    });

    const data = deepmerge(defaultResumeData, {
      basics: { ...basicsResult, name, email, picture: { url: picture ?? "" } },
      sections: { ...sectionsResult },
    } satisfies DeepPartial<ResumeData>);

    const resume = this.prisma.resume.create({
      data: {
        data: data,
        userId,
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
        title: importResumeDto.title ?? randomTitle,
        slug: importResumeDto.slug ?? kebabCase(randomTitle),
      },
    });
  }

  async importLinkedin(userId: string, importLinkedinDto: ImportLinkedinDto) {
    throw new BadRequestException("LinkedIn import is disabled");
    const SCRAPIN_API_KEY = this.configService.get<string>("SCRAPIN_API_KEY");
    const linkedinScrapeURL = `https://api.scrapin.io/enrichment/profile?apikey=${SCRAPIN_API_KEY}&linkedinUrl=${importLinkedinDto.linkedinURL}`;
    const linkedinRes = await this.httpService.axiosRef.get(linkedinScrapeURL);

    const resume = scrapinToResume(linkedinRes.data);
    const currentDateTime = new Date().toISOString();
    const randomTitle = "My LinkedIn Resume " + currentDateTime;

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

const mockResponse2 = {
  success: true,
  person: {
    publicIdentifier: "raz-polak-125901133",
    linkedInIdentifier: "ACoAACC0I20B_mXBoJn9DKw7lIMrpxim7aWltgk",
    memberIdentifier: "548676461",
    linkedInUrl: "https://www.linkedin.com/in/raz-polak-125901133",
    firstName: "Raz",
    lastName: "Polak",
    headline: "VP R&D at AlfaBet",
    location: "Israel",
    summary: null,
    photoUrl: null,
    backgroundUrl: null,
    openToWork: false,
    premium: false,
    creationDate: {
      month: 11,
      year: 2016,
    },
    followerCount: 765,
    positions: {
      positionsCount: 4,
      positionHistory: [
        {
          title: "VP R&D",
          companyName: "AlfaBet",
          description: "",
          startEndDate: {
            start: {
              month: 10,
              year: 2023,
            },
            end: null,
          },
          companyLogo:
            "https://media.licdn.com/dms/image/v2/D4D0BAQEIX60xecqiiw/company-logo_400_400/company-logo_400_400/0/1721200290731/alfa_bets_logo?e=1735776000&v=beta&t=8XRvob9jgDFjGOPHDMPK_THTo7I7lwpecXXcG45fgGc",
          linkedInUrl: "https://www.linkedin.com/company/86794171/",
          linkedInId: "86794171",
        },
        {
          title: "Backend Team Lead",
          companyName: "AlfaBet",
          description: "",
          startEndDate: {
            start: {
              month: 10,
              year: 2022,
            },
            end: {
              month: 9,
              year: 2023,
            },
          },
          companyLogo:
            "https://media.licdn.com/dms/image/v2/D4D0BAQEIX60xecqiiw/company-logo_400_400/company-logo_400_400/0/1721200290731/alfa_bets_logo?e=1735776000&v=beta&t=8XRvob9jgDFjGOPHDMPK_THTo7I7lwpecXXcG45fgGc",
          linkedInUrl: "https://www.linkedin.com/company/86794171/",
          linkedInId: "86794171",
        },
        {
          title: "Backend Software Engineer",
          companyName: "Voyager Labs",
          description: "",
          startEndDate: {
            start: {
              month: 7,
              year: 2020,
            },
            end: {
              month: 10,
              year: 2022,
            },
          },
          companyLogo:
            "https://media.licdn.com/dms/image/v2/C4D0BAQGyMywNoDgobg/company-logo_400_400/company-logo_400_400/0/1630507955783/voyager_analytics_logo?e=1735776000&v=beta&t=jwoFIUWIM35WlNr-VDcMX-mNTvMEc67QptJjdw7enKQ",
          linkedInUrl: "https://www.linkedin.com/company/6426008/",
          linkedInId: "6426008",
        },
        {
          title: "Fullstack Developer",
          companyName: "PowerLink CRM",
          description: "",
          startEndDate: {
            start: {
              month: 2,
              year: 2020,
            },
            end: {
              month: 7,
              year: 2020,
            },
          },
          companyLogo:
            "https://media.licdn.com/dms/image/v2/C4D0BAQG3xBMP_fIe8g/company-logo_400_400/company-logo_400_400/0/1667979568178/powerlink_software_ltd_logo?e=1735776000&v=beta&t=bvBNGhsaRfFB9ziqxYyKACTxOWKHHpEX3CzRiZJT1x0",
          linkedInUrl: "https://www.linkedin.com/company/2365062/",
          linkedInId: "2365062",
        },
      ],
    },
    schools: {
      educationsCount: 2,
      educationHistory: [
        {
          degreeName: "Computer Software Engineering",
          fieldOfStudy: "Computer Software Engineering",
          linkedInUrl: "https://www.linkedin.com/company/139762/",
          schoolLogo:
            "https://media.licdn.com/dms/image/v2/D4D0BAQFCHc8xuxxGtg/company-logo_400_400/company-logo_400_400/0/1666245441936/afeka_tel_aviv_academic_college_of_engineering_logo?e=1735776000&v=beta&t=tYsLW58kcWEQ8OVdsJ3K20K31pOXNCsHBFwfwjA7qA4",
          schoolName: "Afeka Tel Aviv Academic College of Engineering",
          startEndDate: {
            start: {
              month: 1,
              year: 2018,
            },
            end: {
              month: 1,
              year: 2022,
            },
          },
        },
        {
          degreeName: "Android Developer",
          fieldOfStudy: "Android Developer",
          linkedInUrl: "https://www.linkedin.com/company/17754/",
          schoolLogo:
            "https://media.licdn.com/dms/image/v2/D4D0BAQEwpJJ6B2j9kQ/company-logo_400_400/company-logo_400_400/0/1697480953848/john_bryce_logo?e=1735776000&v=beta&t=B78Gjs-eTTl2xnAzLU12d9pqixflAavB0j4ERLNzuLs",
          schoolName: "John Bryce",
          startEndDate: {
            start: {
              month: 1,
              year: 2015,
            },
            end: {
              month: 1,
              year: 2016,
            },
          },
        },
      ],
    },
    skills: [
      "Software Development",
      "Python",
      "Java",
      "Android Development",
      "Django",
      "JavaScript",
      "React.js",
      "Linux",
      "SQL",
    ],
    languages: [],
    recommendations: {
      recommendationsCount: 1,
      recommendationHistory: [
        {
          caption: "August 6, 2023, Netanel worked with Raz on the same team",
          description:
            "I had the pleasure of working with Raz on various projects, and I can't express enough how invaluable his contributions were. From back-end development to DevOps, Raz's versatile skillset is simply impressive.\n\nHis enthusiasm and commitment made every project an engaging and productive experience. He continually displayed a sense of ownership and responsibility. Raz's dedication to not just completing tasks but moving projects forward set a standard that encouraged everyone around him to strive for excellence.\n\nHis blend of technical expertise, versatility, ownership, and positive collaboration makes him an outstanding asset to any team.",
          authorFullname: "Netanel Rabinowitz",
          authorUrl: "https://www.linkedin.com/in/netanel-rabinowitz-44949812a",
        },
      ],
    },
    certifications: {
      certificationsCount: 0,
      certificationHistory: [],
    },
  },
  company: {
    linkedInId: "86794171",
    name: "AlfaBet",
    universalName: "alfa-bets",
    linkedInUrl: "https://www.linkedin.com/company/86794171",
    employeeCount: 30,
    followerCount: 2604,
    employeeCountRange: {
      start: 11,
      end: 50,
    },
    websiteUrl: null,
    tagline: "Making sports analytics better with machine learning",
    description:
      "At AlfaBet, we are at the forefront of innovation in the sports analytics space, using cutting-edge machine learning models and proprietary algorithms to deliver insights that were previously impossible to uncover. Our advanced technology allows us to process vast amounts of data in real-time, providing our clients with real-time insights and actionable recommendations. Our team of experts combines expertise in data science and a deep understanding of the sports world to provide in-depth analysis of various sporting events, including football, basketball, baseball, American football, and beyond.\n\nOur products are expertly crafted to align with the unique requirements of our esteemed global partners, thanks to our deep-rooted connections. This allows for streamlined business operations that are optimized for revenue generation, outstanding performance, and a solid reputation. Whether you're a team, league, or broadcaster, our customized, cutting-edge analytics will help you better understand performance, identify opportunities for improvement, and drive success. \n\nReady to join the future of sports analytics - AlfaBet Re-Innovating the Game!",
    industry: "Software Development",
    phone: null,
    specialities: [],
    headquarter: {
      city: "Herzelia",
      country: "IL",
      postalCode: null,
      geographicArea: null,
      street1: null,
      street2: null,
    },
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQEIX60xecqiiw/company-logo_400_400/company-logo_400_400/0/1721200290731/alfa_bets_logo?e=1735776000&v=beta&t=8XRvob9jgDFjGOPHDMPK_THTo7I7lwpecXXcG45fgGc",
    foundedOn: {
      year: 2021,
    },
  },
  credits_left: 15,
  rate_limit_left: 15,
};

const mockResponse = {
  success: true,
  person: {
    publicIdentifier: "zaslavsky",
    linkedInIdentifier: "ACoAAAAg_9EBpgaHaI_WdvLOzshjRyJDPAdZmSc",
    memberIdentifier: "2162641",
    linkedInUrl: "https://www.linkedin.com/in/zaslavsky",
    firstName: "Yair",
    lastName: "Zaslavsky",
    headline:
      "Senior Software Engineer at Cash App by Block (formerly Square), owner and senior consultant at LIDA group",
    location: "Seattle, United States of America",
    summary:
      "A senior SDE at Cash-App (a business unit of Block).\nFormer SDE At Amazon (Alexa Smart properties) and other companies, \n \nOver 15 years of proven development and technological experience in various environments (Windows,Linux/Unix, and heterogenous/cross-platform environments) and many programming languages (Java/J2EE, C, C++, and others...)\nA team player with broad system understanding. \nA good source of information for various design and development methods.\nI always look forward to learning new technologies, particularly in the domains of OS, networking, databases, and design.\n\nSpecialties: System design, OO Design, and Programming.\nServer-Side programming.\nInfrastructure programming (DB, XML, networking, multi-threading)\nDatabase programming (MS-SQL, PostgreSQL,MySQL, HSQL, Oracle, SQLite, DynamoDB, MongoDB)\nJEE/J2EE design and programming (Over JBoss application server, EJB 3.0, EJB 3.1)\nJava server/agent side programming (JDK 1.42, JDK 5.0 , JDK 6.0, JDK 8.0)\nKotlin programming\nMicro services architecture\nConcurrency and distributed computing",
    photoUrl: null,
    backgroundUrl:
      "https://media.licdn.com/dms/image/v2/C5616AQFby6l2aDBD9g/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1624206894927?e=1733356800&v=beta&t=AHPCu_LtRm2Qk689RGNkq1ndpqSK3bONiryJHLOqMmQ",
    openToWork: false,
    premium: true,
    creationDate: { month: 3, year: 2005 },
    followerCount: 12_620,
    positions: {
      positionsCount: 15,
      positionHistory: [
        {
          title: "Owner",
          companyName: "Lida group consulting",
          companyLocation: "Washington, United States",
          description:
            "Skills: JavaScript · Kotlin · Docker Products · Amazon Web Services (AWS) · Cloud Computing · Software Architectural Design · Mentoring",
          startEndDate: { start: { month: 5, year: 2022 }, end: null },
          contractType: "Part-time",
          companyLogo: null,
          linkedInUrl:
            "https://www.linkedin.com/search/results/all/?keywords=Lida+group+consulting",
        },
        {
          title: "Senior Software Engineer",
          companyName: "Cash App",
          description:
            "Skills: JavaScript · Software Design · Kotlin · Docker Products · Amazon Web Services (AWS) · Cloud Computing · Software Architectural Design · Mentoring",
          startEndDate: { start: { month: 8, year: 2021 }, end: null },
          contractType: "Full-time",
          companyLogo:
            "https://media.licdn.com/dms/image/v2/D4E0BAQGeJ6Vq6m300Q/company-logo_400_400/company-logo_400_400/0/1725037560984/cash_app_logo?e=1735776000&v=beta&t=_QyWMUBD-TEFYYvotZsxM8RNLTJRLPjFhch4RFT8W_Q",
          linkedInUrl: "https://www.linkedin.com/company/29296664/",
          linkedInId: "29296664",
        },
        {
          title: "Software Development Engineer",
          companyName: "Amazon",
          companyLocation: "Greater Seattle Area",
          description:
            "Engineer in Alexa Smart Properties,, a startup like organization which provides offerings for setting up Alexa in properties which are not the typical private residentials.\n\nI've joined as the 5th engineer to the team, and led several projects",
          startEndDate: { start: { month: 12, year: 2017 }, end: { month: 8, year: 2021 } },
          companyLogo:
            "https://media.licdn.com/dms/image/v2/C560BAQHTvZwCx4p2Qg/company-logo_400_400/company-logo_400_400/0/1630640869849/amazon_logo?e=1735776000&v=beta&t=Ng_k984xQj8LysPUb06odC3MOQn2kMUPXyPoknw56JE",
          linkedInUrl: "https://www.linkedin.com/company/1586/",
          linkedInId: "1586",
        },
        {
          title: "Senior Software Engineer",
          companyName: "Aconex",
          companyLocation: "Melbourne, Australia",
          description:
            "Full stack developer on the main platform SaaS cloud product.\nPerforming design and implementations of various features at the product.\nUsage of the following technologies:\n* Java for Sever side development (tomcat, Spring, Sping-boot, Hibernate, TestNG).\n* JDK 6 for core product and JDK 8 for Micro services.\n* MS-SQL as the relational database for the core product\n* PostgreSQL as the relational database for micro services\n* Html, CSS , JSP, and Javascript related fameworks for Frontend (Angular.js, JQuery and other related frameworks).\n* TDD/BDD practices using TestNJ, Karma, Jasmin, ,PhantomJS, Dredd and Drakov.\n* Sellenium for UI functional tests\n* Jenkins for CI.\n* Python/Flask framework for development of various tools\n* Docker for containerized deployment of Micro services that are being developed for the core platform.\n* Amazon AWS services for build infrastructure\n* Amazon AWS components for development of large scale processing jobs : EC2. ELB, Auto scaling groups, S3, SQS, DynamoDB, IAM\n* HashiCorp Terraform scripts to construct AWS environments.\n* Axon framework and other tools for event sourcing \nPracticing Agile methodologies for the development of the product.\n",
          startEndDate: { start: { month: 3, year: 2015 }, end: { month: 11, year: 2017 } },
          companyLogo:
            "https://media.licdn.com/dms/image/v2/C4E0BAQFBuylGf4tjFg/company-logo_400_400/company-logo_400_400/0/1636538863904/aconex_logo?e=1735776000&v=beta&t=YL2Se1up7NjQWyTU2QvO1pe1TLBiniVVvb5K4LCYPPE",
          linkedInUrl: "https://www.linkedin.com/company/19617/",
          linkedInId: "19617",
        },
        {
          title:
            "Hands on team leader at RHEV-M SW infrastructure group/Maintainer at oVirt open source project",
          companyName: "Red Hat",
          description:
            "Technically leading Java/Java EE aspects at the SW infrastructure group at RHEV-M.\nPerforming design, implementation, and code reviews for various SW infrastructure topics that sever other groups at the RHEV-M product.\nWorking on Multi-Threading issues and infrastructure , Authentication and Authorization, Database and DAOs issues, Asyncrhnous tasks framework and more.\nContinuing to serve as a maintainer at the Engine component at the oVirt open source project (see www.ovirt.org)",
          startEndDate: { start: { month: 6, year: 2012 }, end: { month: 3, year: 2015 } },
          companyLogo:
            "https://media.licdn.com/dms/image/v2/C4E0BAQEto-TydTTIfQ/company-logo_400_400/company-logo_400_400/0/1630583759577/red_hat_logo?e=1735776000&v=beta&t=gaAu7lhmIH1N2sTqlIHqVLZE5rBwTtdrbFFl3PNrcEY",
          linkedInUrl: "https://www.linkedin.com/company/3545/",
          linkedInId: "3545",
        },
        {
          title:
            "Hands on team lead at RHEV-M backend group/Maintainer at oVirt open source project",
          companyName: "Red Hat",
          description:
            "Besides being a team lead at the RHEV-M backend group, I am now also one of the maintainers of the oVirt engine-core component (Java EE component that concentrates business logic , data access layer , authentication, and other issues) of the oVirt open source project. More about oVirt can be found at www.ovirt.org",
          startEndDate: { start: { month: 11, year: 2011 }, end: { month: 6, year: 2012 } },
          companyLogo:
            "https://media.licdn.com/dms/image/v2/C4E0BAQEto-TydTTIfQ/company-logo_400_400/company-logo_400_400/0/1630583759577/red_hat_logo?e=1735776000&v=beta&t=gaAu7lhmIH1N2sTqlIHqVLZE5rBwTtdrbFFl3PNrcEY",
          linkedInUrl: "https://www.linkedin.com/company/3545/",
          linkedInId: "3545",
        },
        {
          title: "Team lead at RHEV-M Backend group",
          companyName: "Red Hat",
          description:
            '"Hands on" team lead at the RHEV-M (RedHat Enterprise Virtualization Manager) Backend group.\nLeading Database and Authentication issues.\nBesides technically leading these areas , also participated in implementing several storage related buginss logic flows, such as POSIX-FS storage domain support, and cloning a VM from snapshot.',
          startEndDate: { start: { month: 1, year: 2011 }, end: { month: 6, year: 2012 } },
          companyLogo:
            "https://media.licdn.com/dms/image/v2/C4E0BAQEto-TydTTIfQ/company-logo_400_400/company-logo_400_400/0/1630583759577/red_hat_logo?e=1735776000&v=beta&t=gaAu7lhmIH1N2sTqlIHqVLZE5rBwTtdrbFFl3PNrcEY",
          linkedInUrl: "https://www.linkedin.com/company/3545/",
          linkedInId: "3545",
        },
        {
          title: "JEE backend senior SW engineer",
          companyName: "Red Hat",
          description:
            "Working in JEE backened  group on the RHEV-M (RedHat Enterprise Virtualization Manager) product.\nCurrently mainly focusing on Active-Directory and Kerberos authentication integration (using JAAS Krb login module, LDAP libraries and other frameworks).",
          startEndDate: { start: { month: 4, year: 2010 }, end: { month: 1, year: 2011 } },
          companyLogo:
            "https://media.licdn.com/dms/image/v2/C4E0BAQEto-TydTTIfQ/company-logo_400_400/company-logo_400_400/0/1630583759577/red_hat_logo?e=1735776000&v=beta&t=gaAu7lhmIH1N2sTqlIHqVLZE5rBwTtdrbFFl3PNrcEY",
          linkedInUrl: "https://www.linkedin.com/company/3545/",
          linkedInId: "3545",
        },
        {
          title: "J2EE server side team leader",
          companyName: "Cellerium",
          description:
            "Leading development of server side components for high-end solutions for the mobile domain.\nCellerium provides a platform for rapid development of cellular applications.",
          startEndDate: { start: { month: 10, year: 2007 }, end: { month: 1, year: 2010 } },
          companyLogo: null,
          linkedInUrl: "https://www.linkedin.com/search/results/all/?keywords=Cellerium",
        },
        {
          title: "J2EE/C++ SW engineer and server side technical lead",
          companyName: "Imagine Communications",
          description:
            "A team member of the NMS team, and technical leader of all JEE server side development. Worked with JEE 5.0 (EJB 3.0) over JBoss, and also with C++ over redhat linux.",
          startEndDate: { start: { month: 3, year: 2006 }, end: { month: 10, year: 2007 } },
          companyLogo:
            "https://media.licdn.com/dms/image/v2/C560BAQFxHMR-kZ_-bg/company-logo_400_400/company-logo_400_400/0/1630611047507/imagine_communications_logo?e=1735776000&v=beta&t=iaon3rg2KMlKVxmbSjTdLG7D6vm4Yc0WbKIXeja5ZHI",
          linkedInUrl: "https://www.linkedin.com/company/37660/",
          linkedInId: "37660",
        },
        {
          title: "Software Engineer",
          companyName: "SilverKite",
          description:
            "Working at Silver-Kite - a company that deals with various aspects of XML processing.\nDeveloping using Java (JDK 1.5) and C++ over Linux (Debian distribution)",
          startEndDate: { start: { month: 1, year: 2005 }, end: { month: 3, year: 2006 } },
          companyLogo: null,
          linkedInUrl: "https://www.linkedin.com/company/85877/",
          linkedInId: "85877",
        },
        {
          title: "SW Engineer",
          companyName: "MonoSphere",
          description:
            "Monosphere is a company for advanced storage management using a virtual disk technology.\nI worked as an SW engineer at the management server team of the company. Developed over Win2000 and Linux using C++, ACE, Corba and MS-SQL",
          startEndDate: { start: { month: 1, year: 2003 }, end: { month: 1, year: 2004 } },
          companyLogo: null,
          linkedInUrl: "https://www.linkedin.com/company/25122/",
          linkedInId: "25122",
        },
        {
          title: "SW Engineer",
          companyName: "MER",
          description:
            'Worked at "Managix"  - a division that develops CCTV management systems. Worked with Delphi and C#, mainly at the management server team.',
          startEndDate: { start: { month: 1, year: 2003 }, end: { month: 1, year: 2003 } },
          companyLogo: null,
          linkedInUrl: "https://www.linkedin.com/search/results/all/?keywords=MER",
        },
        {
          title: "Programmer (student)",
          companyName: "Intel",
          description:
            "Worked as a programmer , part time job at Intel - SA department (C++ /Windows)",
          startEndDate: { start: { month: 7, year: 2001 }, end: { month: 3, year: 2002 } },
          companyLogo:
            "https://media.licdn.com/dms/image/v2/C560BAQGpvWtEtj9oTQ/company-logo_400_400/company-logo_400_400/0/1630663244736/intel_corporation_logo?e=1735776000&v=beta&t=TdIw7nw8LVKKThby4cEDGCjmtAg3SJnwdvWSO8fAGBk",
          linkedInUrl: "https://www.linkedin.com/company/1053/",
          linkedInId: "1053",
        },
        {
          title: "Programmer",
          companyName: "IDF",
          description:
            "Programmer at Signal Corpes.\nDealt with C/C++ programming over DOS and Windows 95, network management (NT and Novell)",
          startEndDate: { start: { month: 4, year: 1995 }, end: { month: 2, year: 1999 } },
          companyLogo: null,
          linkedInUrl: "https://www.linkedin.com/company/3149/",
          linkedInId: "3149",
        },
      ],
    },
    schools: {
      educationsCount: 2,
      educationHistory: [
        {
          degreeName: "BSc Computer Science, OS,Programming Languages",
          fieldOfStudy: "BSc Computer Science, OS,Programming Languages",
          linkedInUrl: "https://www.linkedin.com/company/3155/",
          schoolLogo:
            "https://media.licdn.com/dms/image/v2/C4D0BAQG12formuFdJg/company-logo_400_400/company-logo_400_400/0/1630469288270/technion_logo?e=1735776000&v=beta&t=cgk1otms-o5-8isP4m_dwajO3CAENlfq6lH0CuMZVRw",
          schoolName: "Technion - Israel Institute of Technology",
          startEndDate: { start: { month: 3, year: 1999 }, end: { month: 2, year: 2003 } },
        },
        {
          degreeName: "",
          fieldOfStudy: "",
          linkedInUrl: "https://www.linkedin.com/search/results/all/?keywords=Handasaim",
          schoolLogo: null,
          schoolName: "Handasaim",
          startEndDate: { start: { month: null, year: null }, end: { month: null, year: null } },
        },
      ],
    },
    skills: [
      "Docker Products",
      "Cloud Computing",
      "Amazon Web Services (AWS)",
      "JavaScript",
      "Kotlin",
      "Mentoring",
      "Software Architectural Design",
      "Software Design",
      "XML",
      "REST",
      "Oracle",
      "PostgreSQL",
      "MySQL",
      "Linux",
      "JBoss Application Server",
      "Design Patterns",
      "Java Enterprise Edition",
      "Java",
      "EJB",
      "Databases",
    ],
    languages: ["English", "Hebrew", "Russian"],
    recommendations: {
      recommendationsCount: 5,
      recommendationHistory: [
        {
          caption: "April 1, 2009, Ran worked with Yair on the same team",
          description:
            "I had the pleasure working with Yair at SilverKite in the same team. Yair has outstanding technical skills, vast knowledge in design patterns and architectural patterns which are combined with excellent personal skills. This combination had a critical contribution to the team success, meeting its quality and deliveries targets, while not making compromises about the system non functional requirements (and performance on top of them). I would be pleased cooperating with Yair again.",
          authorFullname: "Ran Levy",
          authorUrl: "https://www.linkedin.com/in/ranl1",
        },
        {
          caption: "November 17, 2007, Itay worked with Yair but on different teams",
          description:
            "Yair is a very smart person who aspire to have in-depth knowledge on the project he works on. He knows how to combine academic level knowledge with hands-on experience to create both efficient and functional applications. Yair is a very nice and pleasant person to work with, and it is always an enriching experience to work with him.",
          authorFullname: "Itay Donanhirsh",
          authorUrl: "https://www.linkedin.com/in/itayd",
        },
        {
          caption: "November 15, 2007, Alon worked with Yair but on different teams",
          description:
            "I worked with Yair at Imagine for about a year. Immediately I recognized his professionalism and communication skills. He has a vast knowledge in his work domain and at many general topics as well. These came out valuable when Yair went to the US to do a complex integration with a third-party vendor and to demonstrate at the SCTE 2007 at that vendor's booth. Yair is a professional and a great person to work with.",
          authorFullname: "Alon Loewy",
          authorUrl: "https://www.linkedin.com/in/alon-loewy-8742501",
        },
        {
          caption: "March 1, 2006, Ziv managed Yair directly",
          description:
            "Yair is excellent, both as a person and as a professional. He is an excellent software engineer who is able to get in dept of almost any programming and S/W designing problems. He has a strong ability to work fast and accurate on complex technological assignments. Yair holds phenomenal amount of general knowledge in many subjects that makes his a great conversation partner.",
          authorFullname: "Ziv Isaiah",
          authorUrl: "https://www.linkedin.com/in/zivisaiah",
        },
        {
          caption: "February 22, 2006, Roman worked with Yair on the same team",
          description:
            "I've worked with Yair at several places during the last 8 years. Yair is a very skilled designer and programmer. He provides elegant and extendable designs that allow future improvements, and high quality code. Yair is a quick learner, and always works hard to achieve the best results possible. Yair is a team player, and is glad to provide any help.",
          authorFullname: "Roman Priborkin",
          authorUrl: "https://www.linkedin.com/in/priborkin",
        },
      ],
    },
    certifications: {
      certificationsCount: 2,
      certificationHistory: [
        {
          name: "Web Application & Software Architecture 101",
          organizationName: "Educative",
          organizationUrl: "https://www.linkedin.com/company/10874637/",
          issuedDate: "Issued Feb 2021",
        },
        {
          name: "Kotlin for Java developers",
          organizationName: "Coursera",
          organizationUrl: "https://www.linkedin.com/company/2453129/",
          issuedDate: "Issued Aug 2019",
        },
      ],
    },
  },
  company: null,
  credits_left: 12,
  rate_limit_left: 17,
};
