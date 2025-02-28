import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import {
  CreateResumeDto,
  ImportResumeDto,
  LinkResumeToItemDto,
  ResumeDto,
  SectionFormat,
  UpdateResumeDto,
} from "@reactive-resume/dto";
import { defaultResumeData, ResumeData } from "@reactive-resume/schema";
import type { DeepPartial } from "@reactive-resume/utils";
import { ErrorMessage, generateRandomName } from "@reactive-resume/utils";
import slugify from "@sindresorhus/slugify";
import deepmerge from "deepmerge";
import { PrismaService } from "nestjs-prisma";

import { PrinterService } from "@/server/printer/printer.service";

import { StorageService } from "../storage/storage.service";

@Injectable()
export class ResumeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly printerService: PrinterService,
    private readonly storageService: StorageService,
  ) {}

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
        slug: createResumeDto.slug ?? slugify(createResumeDto.title),
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
        slug: importResumeDto.slug ?? slugify(randomTitle),
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
          data: updateResumeDto.data as Prisma.JsonObject,
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

  async findOnePublicByUsername(username: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { username },
    });

    if (user.profileResumeId == null) throw new BadRequestException(ErrorMessage.NOPUBLICRESUME);

    return await this.prisma.resume.findUniqueOrThrow({
      where: { id: user.profileResumeId },
    });
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

  async setDefault(userId: string, resumeId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { profileResumeId: resumeId },
    });
  }

  async linkResumeToItem(linkDTO: LinkResumeToItemDto, format: SectionFormat) {
    const { resumeId, itemId, order } = linkDTO;
    try {
      switch (format) {
        case SectionFormat.Basics: {
          return await this.prisma.resumeBasicsItemMapping.create({
            data: { resumeId, basicsItemId: itemId, order },
          });
        }
        case SectionFormat.Profiles: {
          return await this.prisma.resumeProfileItemMapping.create({
            data: { resumeId, profileItemId: itemId, order },
          });
        }
        case SectionFormat.Experience: {
          return await this.prisma.resumeWorkItemMapping.create({
            data: { resumeId, workItemId: itemId, order },
          });
        }
        case SectionFormat.Education: {
          return await this.prisma.resumeEducationItemMapping.create({
            data: { resumeId, educationItemId: itemId, order },
          });
        }
        case SectionFormat.Skills: {
          return await this.prisma.resumeSkillItemMapping.create({
            data: { resumeId, skillItemId: itemId, order },
          });
        }
        case SectionFormat.Languages: {
          return await this.prisma.resumeLanguageItemMapping.create({
            data: { resumeId, languageItemId: itemId, order },
          });
        }
        case SectionFormat.Awards: {
          return await this.prisma.resumeAwardItemMapping.create({
            data: { resumeId, awardItemId: itemId, order },
          });
        }
        case SectionFormat.Certifications: {
          return await this.prisma.resumeCertificationItemMapping.create({
            data: { resumeId, certificationItemId: itemId, order },
          });
        }
        case SectionFormat.Interests: {
          return await this.prisma.resumeInterestItemMapping.create({
            data: { resumeId, interestItemId: itemId, order },
          });
        }
        case SectionFormat.Projects: {
          return await this.prisma.resumeProjectItemMapping.create({
            data: { resumeId, projectItemId: itemId, order },
          });
        }
        case SectionFormat.Publications: {
          return await this.prisma.resumePublicationItemMapping.create({
            data: { resumeId, publicationItemId: itemId, order },
          });
        }
        case SectionFormat.Volunteering: {
          return await this.prisma.resumeVolunteerItemMapping.create({
            data: { resumeId, volunteerItemId: itemId, order },
          });
        }
        case SectionFormat.References: {
          return await this.prisma.resumeReferenceItemMapping.create({
            data: { resumeId, referenceItemId: itemId, order },
          });
        }
        case SectionFormat.Custom: {
          return await this.prisma.resumeCustomItemMapping.create({
            data: { resumeId, customItemId: itemId, order },
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
}
