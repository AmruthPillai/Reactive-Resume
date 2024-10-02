import * as path from "node:path";

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { User as UserEntity } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
  CreateResumeDto,
  importResumeSchema,
  ResumeDto,
  UpdateResumeDto,
} from "@reactive-resume/dto";
import { defaultMetadata, resumeDataSchema } from "@reactive-resume/schema";
import { ErrorMessage } from "@reactive-resume/utils";
import { diskStorage } from "multer";
import { zodToJsonSchema } from "zod-to-json-schema";

import { User } from "@/server/user/decorators/user.decorator";

import { OptionalGuard } from "../auth/guards/optional.guard";
import { TwoFactorGuard } from "../auth/guards/two-factor.guard";
import { Resume } from "./decorators/resume.decorator";
import { ResumeGuard } from "./guards/resume.guard";
import { ResumeService } from "./resume.service";
import { transformZodJson } from "./utils/transform-zod-json";

@ApiTags("Resume")
@Controller("resume")
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Get("schema")
  getSchema() {
    // console.log(sectionsSchema.parse(defaultSectionsHandler))
    // return defaultSectionsHandler;
    const json = {
      basics: {
        name: "NGUYEN HUYEN ANH",
        headline: "Management Information System",
        email: "nguyenhuyenanh7577@gmail.com",
        phone: "0944367926",
        location: "Trieu Khuc, Thanh Xuan, Ha Noi",
        url: {
          label: "",
          href: "",
        },
        customFields: [],
        picture: {
          url: "",
          size: 64,
          aspectRatio: 1,
          borderRadius: 0,
          effects: {
            hidden: false,
            border: false,
            grayscale: false,
          },
        },
      },
      sections: {
        summary: {
          name: "CAREER OBJECTIVE",
          columns: 1,
          separateLinks: true,
          visible: true,
          id: "summary",
          content:
            "Short-term goal: \nComplete assigned tasks well to become an official staff of the\ncompany, learn and accumulate experience in the skills required.\nLong-term goal: \nDesire to make a long-term commitment to the company,\ncontribute to the company's development and achieve\ncareer advancement.\nDevelop deep expertise in business development and take on\na management role in the future.",
        },
        awards: {
          name: "CERTIFICATE",
          columns: 1,
          separateLinks: true,
          visible: true,
          id: "awards",
          items: [
            {
              id: "kgtko8huafc2713567xbnyzl",
              visible: true,
              title: "English Output Certificate",
              awarder: "",
              date: "",
              summary: "",
              url: "",
            },
          ],
        },
        certifications: {
          name: "",
          columns: 1,
          separateLinks: true,
          visible: true,
          id: "certifications",
          items: [],
        },
        education: {
          name: "EDUCATION",
          columns: 1,
          separateLinks: true,
          visible: true,
          id: "education",
          items: [
            {
              id: "kgtko8huafc2713567xbnyzl",
              visible: true,
              institution: "Academy Of Finance",
              studyType: "",
              area: "",
              score: "",
              date: "09/2019 - 9/2023",
              summary: "",
              url: "",
            },
          ],
        },
        experience: {
          name: "EXPERIENCE",
          columns: 1,
          separateLinks: true,
          visible: true,
          id: "experience",
          items: [
            {
              id: "kgtko8huafc2713567xbnyzl",
              visible: true,
              company: "",
              // company: "PATHWAY ENGLISH CENTER",
              position: "ACTIVITY",
              location: "",
              date: "6/2022 - 11/2022",
              summary:
                "Provide information about courses to students and parents\nManage student and teacher information\nPrepare  and  arrange  learning  events,  classes  and\nextracurricular activities.\nHandle issues and requests from students and parents.",
              url: "",
            },
            {
              id: "kgtko8huafc2713567xbnyzl",
              visible: true,
              company: "HANOSSA IMPORT EXPORT JOINT STOCK COMPANY",
              position: "Sales Executive",
              location: "",
              date: "11/2023 - 5/2024",
              summary:
                "Search  for  and  consult  with  customers,  providing  tailored\nproduct/service solutions to meet their needs.\nNegotiate  pricing  and  generate  invoices  for  customers,\nmanage  payments,  ensuring  accuracy  and  timely\nprocessing.\nProvide  after-sales  support,  resolve  any  issues  that  arise,\nand maintain long-term relationships with customers.",
              url: "",
            },
          ],
        },
        volunteer: {
          name: "",
          columns: 1,
          separateLinks: true,
          visible: true,
          id: "volunteer",
          items: [],
        },
        interests: {
          name: "",
          columns: 1,
          separateLinks: true,
          visible: true,
          id: "interests",
          items: [],
        },
        languages: {
          name: "SKILLS",
          columns: 1,
          separateLinks: true,
          visible: true,
          id: "languages",
          items: [
            {
              id: "kgtko8huafc2713567xbnyzl",
              visible: true,
              name: "English",
              description: "",
              level: 1,
            },
            {
              id: "kgtko8huafc2713567xbnyzl",
              visible: true,
              name: "Communicaition",
              description: "",
              level: 1,
            },
            {
              id: "kgtko8huafc2713567xbnyzl",
              visible: true,
              name: "Microsoft Office",
              description: "",
              level: 1,
            },
            {
              id: "kgtko8huafc2713567xbnyzl",
              visible: true,
              name: "Problem solving",
              description: "",
              level: 1,
            },
            {
              id: "kgtko8huafc2713567xbnyzl",
              visible: true,
              name: "Team work",
              description: "",
              level: 1,
            },
          ],
        },
        profiles: {
          name: "",
          columns: 1,
          separateLinks: true,
          visible: true,
          id: "profiles",
          items: [],
        },
        projects: {
          name: "",
          columns: 1,
          separateLinks: true,
          visible: true,
          id: "projects",
          items: [],
        },
        publications: {
          name: "",
          columns: 1,
          separateLinks: true,
          visible: true,
          id: "publications",
          items: [],
        },
        references: {
          name: "",
          columns: 1,
          separateLinks: true,
          visible: true,
          id: "references",
          items: [],
        },
        skills: {
          name: "SKILLS",
          columns: 1,
          separateLinks: true,
          visible: true,
          id: "skills",
          items: [
            {
              id: "kgtko8huafc2713567xbnyzl",
              visible: true,
              name: "Canva",
              description: "",
              level: 1,
            },
            {
              id: "kgtko8huafc2713567xbnyzl",
              visible: true,
              name: "Excel For Finance",
              description: "",
              level: 1,
            },
          ],
        },
        custom: {
          "B U S I N E S S   D E V E L O P M E N T": {
            name: "B U S I N E S S   D E V E L O P M E N T",
            columns: 1,
            separateLinks: true,
            visible: true,
            id: "kgtko8huafc2713567xbnyzl",
            items: [
              {
                id: "kgtko8huafc2713567xbnyzl",
                visible: true,
                name: "Member of The event committee",
                description:
                  "Plan, conceptualize and participate in the club events.\nParticipate in academic and support courses of club.",
                date: "",
                location: "",
                summary: "",
                url: "",
              },
            ],
          },
          Admin: {
            name: "Admin",
            columns: 1,
            separateLinks: true,
            visible: true,
            id: "kgtko8huafc2713567xbnyzl",
            items: [],
          },
        },
      },
      metadata: defaultMetadata,
      workStatus: {
        openToWork: false,
        pricing: undefined,
        jobType: "REMOTE",
        jobLocation: "",
      },
    };
    // const data1 = JSON.parse(json);
    // console.log(data1)
    return transformZodJson(json);
    return zodToJsonSchema(resumeDataSchema);
  }

  @Post()
  @UseGuards(TwoFactorGuard)
  async create(@User() user: UserEntity, @Body() createResumeDto: CreateResumeDto) {
    try {
      return await this.resumeService.create(user.id, createResumeDto);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        throw new BadRequestException(ErrorMessage.ResumeSlugAlreadyExists);
      }

      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Post("import")
  @UseGuards(TwoFactorGuard)
  async import(@User() user: UserEntity, @Body() importResumeDto: unknown) {
    try {
      const result = importResumeSchema.parse(importResumeDto);
      return await this.resumeService.import(user.id, result);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        throw new BadRequestException(ErrorMessage.ResumeSlugAlreadyExists);
      }

      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Get()
  @UseGuards(TwoFactorGuard)
  findAll(@User() user: UserEntity) {
    return this.resumeService.findAll(user.id);
  }

  @Get(":id")
  @UseGuards(TwoFactorGuard, ResumeGuard)
  findOne(@Resume() resume: ResumeDto) {
    return resume;
  }

  @Get(":id/statistics")
  @UseGuards(TwoFactorGuard)
  findOneStatistics(@Param("id") id: string) {
    return this.resumeService.findOneStatistics(id);
  }

  @Get("/public/:username/:slug")
  @UseGuards(OptionalGuard)
  findOneByUsernameSlug(
    @Param("username") username: string,
    @Param("slug") slug: string,
    @User("id") userId: string,
  ) {
    return this.resumeService.findOneByUsernameSlug(username, slug, userId);
  }

  @Patch(":id")
  @UseGuards(TwoFactorGuard)
  update(
    @User() user: UserEntity,
    @Param("id") id: string,
    @Body() updateResumeDto: UpdateResumeDto,
  ) {
    return this.resumeService.update(user.id, id, updateResumeDto);
  }

  @Patch(":id/lock")
  @UseGuards(TwoFactorGuard)
  lock(@User() user: UserEntity, @Param("id") id: string, @Body("set") set = true) {
    return this.resumeService.lock(user.id, id, set);
  }

  @Delete(":id")
  @UseGuards(TwoFactorGuard)
  remove(@User() user: UserEntity, @Param("id") id: string) {
    return this.resumeService.remove(user.id, id);
  }

  @Get("/print/:id")
  @UseGuards(OptionalGuard, ResumeGuard)
  async printResume(@User("id") userId: string | undefined, @Resume() resume: ResumeDto) {
    try {
      const url = await this.resumeService.printResume(resume, userId);

      return { url };
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Get("/print/:id/preview")
  @UseGuards(TwoFactorGuard, ResumeGuard)
  async printPreview(@Resume() resume: ResumeDto) {
    try {
      const url = await this.resumeService.printPreview(resume);

      return { url };
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, callback) => {
          console.log("daw");
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
          const ext = path.extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      limits: { fileSize: 1000 * 1000 * 5 },
      fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
          cb(null, true);
        } else {
          cb(new BadRequestException("Invalid file type, only images are allowed!"), false);
        }
      },
    }),
  )
  @Post("upload")
  @UseGuards(TwoFactorGuard)
  async upload(
    @UploadedFile()
    file: Express.Multer.File,
    @User() user: UserEntity,
  ) {
    return this.resumeService.upload(file, user.id);
    // return this.resumeService.upload(file, user.id);
  }
}
