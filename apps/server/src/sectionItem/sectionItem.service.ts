import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { CreateSectionItemDto, SectionFormat, UpdateSectionItemDto } from "@reactive-resume/dto";
import { PrismaService } from "nestjs-prisma";

import {
  parseAwardData,
  parseBasicData,
  parseCertificationData,
  parseCustomData,
  parseEducationData,
  parseExperienceData,
  parseInterestData,
  parseLanguageData,
  parseProfileData,
  parseProjectData,
  parsePublicationData,
  parseReferenceData,
  parseSkillData,
  parseVolunteerData,
} from "../utils/section-parsers";

@Injectable()
export class SectionItemService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    try {
      const basics = await this.prisma.basicsItem.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
      });
      const profiles = await this.prisma.profileItem.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
      });
      const experiences = await this.prisma.workItem.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
      });
      const education = await this.prisma.educationItem.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
      });
      const skills = await this.prisma.skillItem.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
      });
      const languages = await this.prisma.languageItem.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
      });
      const awards = await this.prisma.awardItem.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
      });
      const certifications = await this.prisma.certificationItem.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
      });
      const interests = await this.prisma.interestItem.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
      });
      const projects = await this.prisma.projectItem.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
      });
      const publications = await this.prisma.publicationItem.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
      });
      const volunteering = await this.prisma.volunteerItem.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
      });
      const references = await this.prisma.referenceItem.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
      });
      const custom = await this.prisma.customItem.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
      });

      return {
        basics: basics,
        profiles: profiles,
        experiences: experiences,
        education: education,
        skills: skills,
        languages: languages,
        awards: awards,
        certifications: certifications,
        interests: interests,
        projects: projects,
        publications: publications,
        volunteering: volunteering,
        references: references,
        custom: custom,
      };
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
  async createSectionItem(userId: string, createSectionDto: CreateSectionItemDto) {
    try {
      const { format, data } = createSectionDto;

      switch (format) {
        case "basics": {
          const parsedData = parseBasicData(data);
          return await this.prisma.basicsItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case "profiles": {
          const parsedData = parseProfileData(data);
          return await this.prisma.profileItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case "experience": {
          const parsedData = parseExperienceData(data);
          return await this.prisma.workItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case "education": {
          const parsedData = parseEducationData(data);
          return await this.prisma.educationItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case "skills": {
          const parsedData = parseSkillData(data);
          return await this.prisma.skillItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case "languages": {
          const parsedData = parseLanguageData(data);
          return await this.prisma.languageItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case "awards": {
          const parsedData = parseAwardData(data);
          return await this.prisma.awardItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case "certifications": {
          const parsedData = parseCertificationData(data);
          return await this.prisma.certificationItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case "interests": {
          const parsedData = parseInterestData(data);
          return await this.prisma.interestItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case "projects": {
          const parsedData = parseProjectData(data);
          return await this.prisma.projectItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case "publications": {
          const parsedData = parsePublicationData(data);
          return await this.prisma.publicationItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case "volunteering": {
          const parsedData = parseVolunteerData(data);
          return await this.prisma.volunteerItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case "references": {
          const parsedData = parseReferenceData(data);
          return await this.prisma.referenceItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case "custom": {
          const parsedData = parseCustomData(data);
          return await this.prisma.customItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        default: {
          throw new Error("Invalid section type");
        }
      }
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async updateSectionItem(userId: string, id: string, updateSectionDto: UpdateSectionItemDto) {
    const { data, format } = updateSectionDto;
    if (!data || !format) {
      throw new Error("Data is required");
    }
    try {
      switch (format) {
        case SectionFormat.Basics: {
          const parsedData = parseBasicData(data);
          return await this.prisma.basicsItem.update({
            data: parsedData,
            where: { userId_id: { userId, id } },
          });
        }

        case SectionFormat.Profiles: {
          const parsedData = parseProfileData(data);
          return await this.prisma.profileItem.update({
            data: parsedData,
            where: { userId_id: { userId, id } },
          });
        }

        case SectionFormat.Experience: {
          const parsedData = parseExperienceData(data);
          return await this.prisma.workItem.update({
            data: parsedData,
            where: { userId_id: { userId, id } },
          });
        }

        case SectionFormat.Education: {
          const parsedData = parseEducationData(data);
          return await this.prisma.educationItem.update({
            data: parsedData,
            where: { userId_id: { userId, id } },
          });
        }

        case SectionFormat.Skills: {
          const parsedData = parseSkillData(data);
          return await this.prisma.skillItem.update({
            data: parsedData,
            where: { userId_id: { userId, id } },
          });
        }

        case SectionFormat.Languages: {
          const parsedData = parseLanguageData(data);
          return await this.prisma.languageItem.update({
            data: parsedData,
            where: { userId_id: { userId, id } },
          });
        }

        case SectionFormat.Awards: {
          const parsedData = parseAwardData(data);
          return await this.prisma.awardItem.update({
            data: parsedData,
            where: { userId_id: { userId, id } },
          });
        }

        case SectionFormat.Certifications: {
          const parsedData = parseCertificationData(data);
          return await this.prisma.certificationItem.update({
            data: parsedData,
            where: { userId_id: { userId, id } },
          });
        }

        case SectionFormat.Interests: {
          const parsedData = parseInterestData(data);
          return await this.prisma.interestItem.update({
            data: parsedData,
            where: { userId_id: { userId, id } },
          });
        }

        case SectionFormat.Projects: {
          const parsedData = parseProjectData(data);
          return await this.prisma.projectItem.update({
            data: parsedData,
            where: { userId_id: { userId, id } },
          });
        }

        case SectionFormat.Publications: {
          const parsedData = parsePublicationData(data);
          return await this.prisma.publicationItem.update({
            data: parsedData,
            where: { userId_id: { userId, id } },
          });
        }

        case SectionFormat.Volunteering: {
          const parsedData = parseVolunteerData(data);
          return await this.prisma.volunteerItem.update({
            data: parsedData,
            where: { userId_id: { userId, id } },
          });
        }

        case SectionFormat.References: {
          const parsedData = parseReferenceData(data);
          return await this.prisma.referenceItem.update({
            data: parsedData,
            where: { userId_id: { userId, id } },
          });
        }

        case SectionFormat.Custom: {
          const parsedData = parseCustomData(data);
          return await this.prisma.customItem.update({
            data: parsedData,
            where: { userId_id: { userId, id } },
          });
        }

        default: {
          throw new Error("Invalid section type");
        }
      }
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async deleteSectionItem(format: SectionFormat, id: string) {
    try {
      switch (format) {
        case SectionFormat.Basics: {
          return await this.prisma.basicsItem.delete({ where: { id } });
        }
        case SectionFormat.Profiles: {
          return await this.prisma.profileItem.delete({ where: { id } });
        }
        case SectionFormat.Experience: {
          return await this.prisma.workItem.delete({ where: { id } });
        }
        case SectionFormat.Education: {
          return await this.prisma.educationItem.delete({ where: { id } });
        }
        case SectionFormat.Skills: {
          return await this.prisma.skillItem.delete({ where: { id } });
        }
        case SectionFormat.Languages: {
          return await this.prisma.languageItem.delete({ where: { id } });
        }
        case SectionFormat.Awards: {
          return await this.prisma.awardItem.delete({ where: { id } });
        }
        case SectionFormat.Certifications: {
          return await this.prisma.certificationItem.delete({ where: { id } });
        }
        case SectionFormat.Interests: {
          return await this.prisma.interestItem.delete({ where: { id } });
        }
        case SectionFormat.Projects: {
          return await this.prisma.projectItem.delete({ where: { id } });
        }
        case SectionFormat.Publications: {
          return await this.prisma.publicationItem.delete({ where: { id } });
        }
        case SectionFormat.Volunteering: {
          return await this.prisma.volunteerItem.delete({ where: { id } });
        }
        case SectionFormat.References: {
          return await this.prisma.referenceItem.delete({ where: { id } });
        }
        case SectionFormat.Custom: {
          return await this.prisma.customItem.delete({ where: { id } });
        }
        default: {
          throw new Error("Invalid section type");
        }
      }
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
