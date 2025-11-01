import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { google } from "googleapis";
import { Readable } from "stream";
import { ConfigService } from "@nestjs/config";
import type { Config } from "@/server/config/schema";
import { Prisma } from "@prisma/client";
import { CreateResumeDto, ImportResumeDto, ResumeDto, UpdateResumeDto } from "@reactive-resume/dto";
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
    private readonly configService: ConfigService<Config>,
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

  async exportDocx(resume: ResumeDto, userId?: string) {
    // Guard premium template export and apply daily quotas for owner (same as printResume)
    if (userId && resume.userId === userId) {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      const key = { userId_date: { userId, date: today } } as const;
      const usage = await this.prisma.usage.findUnique({ where: key });
      const prints = usage?.prints ?? 0;
      if (prints >= 5) {
        const user = await this.prisma.user.findUniqueOrThrow({
          where: { id: userId },
          select: { twoFactorEnabled: true },
        });
        if (!user.twoFactorEnabled) {
          throw new ForbiddenException(
            "Daily export limit reached. Enable 2FA to continue exporting today.",
          );
        }
      }

      await this.prisma.usage.upsert({
        where: key,
        update: { prints: { increment: 1 } },
        create: { userId, date: today, prints: 1, aiCalls: 0 },
      });

      const template = (resume.data as any)?.metadata?.template as string | undefined;
      const premiumTemplates = new Set([
        "twoColumn",
        "elegant",
        "ngosKenya",
        "pscKenya",
        "telcoPro",
        "bankingATS",
      ]);
      if (template && premiumTemplates.has(template)) {
        const user = await this.prisma.user.findUniqueOrThrow({
          where: { id: userId },
          select: { plan: true, templatesCap: true },
        });
        const entitled = user.plan === "lifetime" || (user.templatesCap ?? 0) >= 10;
        if (!entitled) {
          throw new ForbiddenException("Template is premium and not unlocked");
        }
      }
    }

    const buffer = await this.printerService.exportDocx(resume);

    // Update statistics: increment downloads by 1 for public requests
    if (!userId) {
      await this.prisma.statistics.upsert({
        where: { resumeId: resume.id },
        create: { views: 0, downloads: 1, resumeId: resume.id },
        update: { downloads: { increment: 1 } },
      });
    }

    return buffer;
  }

  async exportGoogleDoc(resume: ResumeDto, userId?: string) {
    // Apply same gating as printResume
    if (userId && resume.userId === userId) {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      const key = { userId_date: { userId, date: today } } as const;
      const usage = await this.prisma.usage.findUnique({ where: key });
      const prints = usage?.prints ?? 0;
      if (prints >= 5) {
        const user = await this.prisma.user.findUniqueOrThrow({
          where: { id: userId },
          select: { twoFactorEnabled: true },
        });
        if (!user.twoFactorEnabled) {
          throw new ForbiddenException(
            "Daily export limit reached. Enable 2FA to continue exporting today.",
          );
        }
      }

      await this.prisma.usage.upsert({
        where: key,
        update: { prints: { increment: 1 } },
        create: { userId, date: today, prints: 1, aiCalls: 0 },
      });

      const template = (resume.data as any)?.metadata?.template as string | undefined;
      const premiumTemplates = new Set([
        "twoColumn",
        "elegant",
        "ngosKenya",
        "pscKenya",
        "telcoPro",
        "bankingATS",
      ]);
      if (template && premiumTemplates.has(template)) {
        const user = await this.prisma.user.findUniqueOrThrow({
          where: { id: userId },
          select: { plan: true, templatesCap: true },
        });
        const entitled = user.plan === "lifetime" || (user.templatesCap ?? 0) >= 10;
        if (!entitled) {
          throw new ForbiddenException("Template is premium and not unlocked");
        }
      }
    }

    // Only the owner can export to their Google Drive
    if (!userId || userId !== resume.userId) {
      throw new ForbiddenException(ErrorMessage.GoogleDriveExportError);
    }

    // Build HTML for conversion
    const html = await this.printerService.buildResumeHtml(resume);

    // Per-user OAuth2 using stored refresh token
    const userSecrets = await this.prisma.secrets.findUnique({
      where: { userId: userId },
      select: { googleDriveRefreshToken: true },
    });

    const refreshToken = userSecrets?.googleDriveRefreshToken ?? null;
    if (!refreshToken) {
      throw new ForbiddenException(ErrorMessage.GoogleDriveNotConnected);
    }

    const clientID = this.configService.getOrThrow("GOOGLE_CLIENT_ID");
    const clientSecret = this.configService.getOrThrow("GOOGLE_CLIENT_SECRET");
    const redirectUri = this.configService.getOrThrow("GOOGLE_DRIVE_CALLBACK_URL");

    const oauth2 = new google.auth.OAuth2(clientID, clientSecret, redirectUri);
    oauth2.setCredentials({ refresh_token: refreshToken });

    const drive = google.drive({ version: "v3", auth: oauth2 });

    const name = resume.title || "resume";
    const media = { mimeType: "text/html", body: Readable.from([html]) };
    const metadata: any = { name, mimeType: "application/vnd.google-apps.document" };

    const createRes = await drive.files.create({
      requestBody: metadata,
      media,
      fields: "id, webViewLink",
      supportsAllDrives: true,
    });

    const fileId = createRes.data.id as string;
    const url = `https://docs.google.com/document/d/${fileId}/edit`;

    if (!userId) {
      await this.prisma.statistics.upsert({
        where: { resumeId: resume.id },
        create: { views: 0, downloads: 1, resumeId: resume.id },
        update: { downloads: { increment: 1 } },
      });
    }

    return url;
  }

  async printResume(resume: ResumeDto, userId?: string) {
    // Guard premium template export and apply daily quotas for owner
    if (userId && resume.userId === userId) {
      // Daily quota: allow up to 5 exports/day without 2FA; beyond that require 2FA
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      const key = { userId_date: { userId, date: today } } as const;
      const usage = await this.prisma.usage.findUnique({ where: key });
      const prints = usage?.prints ?? 0;
      if (prints >= 5) {
        const user = await this.prisma.user.findUniqueOrThrow({
          where: { id: userId },
          select: { twoFactorEnabled: true },
        });
        if (!user.twoFactorEnabled) {
          throw new ForbiddenException(
            "Daily export limit reached. Enable 2FA to continue exporting today.",
          );
        }
      }

      await this.prisma.usage.upsert({
        where: key,
        update: { prints: { increment: 1 } },
        create: { userId, date: today, prints: 1, aiCalls: 0 },
      });

      const template = (resume.data as any)?.metadata?.template as string | undefined;
      const premiumTemplates = new Set([
        "twoColumn",
        "elegant",
        "ngosKenya",
        "pscKenya",
        "telcoPro",
        "bankingATS",
      ]);
      if (template && premiumTemplates.has(template)) {
        const user = await this.prisma.user.findUniqueOrThrow({
          where: { id: userId },
          select: { plan: true, templatesCap: true },
        });
        const entitled = user.plan === "lifetime" || (user.templatesCap ?? 0) >= 10;
        if (!entitled) {
          throw new ForbiddenException("Template is premium and not unlocked");
        }
      }
    }

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
