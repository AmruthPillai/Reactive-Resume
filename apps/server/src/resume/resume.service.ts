import * as fs from "node:fs";
// eslint-disable-next-line unicorn/import-style
import * as path from "node:path";

import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { InputJsonValue } from "@prisma/client/runtime/library";
import { CreateResumeDto, ImportResumeDto, ResumeDto, UpdateResumeDto } from "@reactive-resume/dto";
import {
  defaultMetadata,
  defaultResumeData,
  defaultWorkStatus,
  ResumeData,
  resumeDataSchema,
} from "@reactive-resume/schema";
import type { DeepPartial } from "@reactive-resume/utils";
import { ErrorMessage, generateRandomName, kebabCase } from "@reactive-resume/utils";
import deepmerge from "deepmerge";
import { PrismaService } from "nestjs-prisma";
// import pdf from "pdf-parse/lib/pdf-parse";
// import pdf from "pdf-parse";
import Pdf from "pdf-parse";
import { ZodObject, ZodString } from "zod";

import { PrinterService } from "@/server/printer/printer.service";

import { GenaiService } from "../genai/genai.service";
import { StorageService } from "../storage/storage.service";
import { transformZodJson } from "./utils/transform-zod-json";

@Injectable()
export class ResumeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly printerService: PrinterService,
    private readonly storageService: StorageService,
    private readonly genaiService: GenaiService,
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

  getPath(filename: string) {
    return path.join(process.cwd(), "uploads", filename).split("/").join("/");
  }

  async convertPdfToString(filePath: string) {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await Pdf(dataBuffer);
    return data.text;
  }

  async handleUpload(filename: string) {
    const filePath = this.getPath(filename);
    const pdfText = await this.convertPdfToString(filePath);
    // return pdfText;
    const json = await this.genaiService.convertResumeToJson(pdfText);
    // console.log(json);
    const data1 = JSON.parse(json);
    // console.log(data1);
    const transformData = transformZodJson({
      ...data1,
      workStatus: defaultWorkStatus,
      metadata: defaultMetadata,
    });
    // const result2 = resumeDataSchema.safeParse(transformData);
    // console.log("?>>", result2.error?.errors);
    // console.log(transformData);
    return transformData;
    // return json;
    const text = JSON.parse(json);
    // const text = json;
    // console.log(text);
    // const keys = Object.keys(text.sections.custom);
    // if(keys.length===1&&text.sections.custom[keys[0]].items.length===0){
    text.sections.custom = {};
    // }
    const data = {
      basics: text.basics,
      metadata: defaultMetadata,
      sections: text.sections,
    };
    return data;
  }

  async upload(file: Express.Multer.File, userId: string) {
    const filename = file.filename;
    // eslint-disable-next-line unicorn/prefer-module
    const data = await this.handleUpload(filename);
    const result = resumeDataSchema.safeParse(data);
    if (result.error?.errors)
      throw new HttpException(
        `The input data is invalid. Please try again.: \n${result.error.errors}`,
        HttpStatus.BAD_REQUEST,
      );
    // console.log(data);
    const randomTitle = generateRandomName();
    // return randomTitle;
    // return data;
    return this.prisma.resume.create({
      data: {
        userId,
        visibility: "private",
        data: data as InputJsonValue,
        title: randomTitle,
        slug: kebabCase(randomTitle),
      },
    });
  }

  replaceEmptyStringsWithSchema = (schema: ZodObject<any>, data: any): any => {
    const newData = { ...data };
    console.log(newData);

    for (const key of Object.keys(newData)) {
      const schemaField = schema.shape[key];
      console.log(key);

      if (schemaField instanceof ZodObject) {
        // Nếu là object lồng nhau, gọi đệ quy
        newData[key] = this.replaceEmptyStringsWithSchema(schemaField, newData[key]);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      } else if (schemaField instanceof ZodString && schemaField._def.checks) {
        const hasMinLengthCheck = schemaField._def.checks.some((check) => check.kind === "min");

        // Nếu chuỗi rỗng và có minLength, thay thế bằng "?"
        if (hasMinLengthCheck && newData[key] === "") {
          newData[key] = "?";
        }
      }
    }

    return newData;
  };
}
