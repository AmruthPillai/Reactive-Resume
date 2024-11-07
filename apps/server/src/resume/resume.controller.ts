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
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { User as UserEntity } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
  CreateResumeDto,
  importResumeSchema,
  ResumeDto,
  UpdateResumeDto,
} from "@reactive-resume/dto";
import { defaultBasicMapping, defaultSectionsMapping } from "@reactive-resume/schema";
import { ErrorMessage } from "@reactive-resume/utils";

import { User } from "@/server/user/decorators/user.decorator";

import { OptionalGuard } from "../auth/guards/optional.guard";
import { TwoFactorGuard } from "../auth/guards/two-factor.guard";
import { Resume } from "./decorators/resume.decorator";
import { ResumeGuard } from "./guards/resume.guard";
import { ResumeService } from "./resume.service";

@ApiTags("Resume")
@Controller("resume")
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Get("schema")
  getSchema() {
    const schema = {
      basics: defaultBasicMapping,
      sections: defaultSectionsMapping,
    };
    // return schema;
    return {
      basics: defaultBasicMapping,
      sections: defaultSectionsMapping,
    };
    // return defaultResumeData;
    // return zodToJsonSchema(resumeDataSchema);
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
  async import(@User() user: UserEntity, @Body() data: unknown) {
    try {
      console.log(data);
      const result = importResumeSchema.parse(data);
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

  @Post("upload")
  // @UseGuards(TwoFactorGuard)
  async upload(@Body() { data }: { data: string }) {
    // return {
    //   summary: [
    //     "Business Analyst with +4 years of experience.",
    //     "Strong problem-solving and research skills.",
    //     "Effective communication and teamwork skills.",
    //     "Ability to work under pressure and manage multiple tasks.",
    //     "Quick learner and adept at resolving problems.",
    //   ],
    //   education: [
    //     "Thuong Mai University",
    //     "Major: Management Information System",
    //     "Certification: 925 TOEIC",
    //   ],
    //   skills: [
    //     "Synthesizing information and reporting",
    //     "Receiving and handling complaints",
    //     "Coordinating small-scale personnel",
    //     "Arranging work according to process",
    //     "Basic design ability: Design websites and build mock-ups, prototype",
    //     "Basic web programming: Have knowledge of HTML and CSS",
    //     "Understand customer needs: Receive information from stakeholders and analyze their needs, establish a foundation, suggest future functions",
    //     "Learn about operations: Learn about operations related to the software to develop more functions for the software and ensure the software works as required",
    //     "Documentation: Can build all kinds of Documents such as: Function specification documents, function descriptions, documents",
    //     "Ability to manage change/issue/risk",
    //     "Presentation ability",
    //     "Ability to communicate with clients",
    //     "Good English speaking to communicate and write Emails",
    //     "Ability to work on multiple tasks",
    //   ],
    //   experience: [
    //     {
    //       project: "Real Estate Sales Management Software",
    //       description:
    //         "Provide Real estate brokers and salesmen an easy method to showcase their projects with customers and increase reach. Customers can also check and contact the salesman through the system if they are interested in the project. Giving both sides a mutual contact and information sharing ground.",
    //       teamSize: "10 members",
    //       position: "Business Analyst",
    //       duration: "8/2020 - 12/2020",
    //       responsibilities: [
    //         "Conduct the Sprint Planning to estimate the work",
    //         "Sprint report to the customer, follow up with PO, development team",
    //         "Daily tracking progress",
    //         "Conduct the retro meeting at the end of each sprint. Point out the things that we have done well and which things we need to improve",
    //         "System Analysis and Design",
    //         "Module development",
    //         "Document Design SRS, FRS, BRD",
    //         "Design Manual",
    //         "Support developers in the software development process",
    //         "Guide end users to use the software",
    //         "Creating Test Cases",
    //         "Participate in software testing (functionality)",
    //         "Train users on how to use the software",
    //       ],
    //       technologies: ["Integrate Google map’s API to show the location of the project"],
    //     },
    //     {
    //       project: "Fire point management software",
    //       description:
    //         "Manage and provide fire fighting forces when a fire breaks out. Fire point is managed through smoke/heat alarm devices. The Fire point management software is capable of: locate the closest fire truck, fire fighting forces, available fire fighter,...",
    //       teamSize: "8 members",
    //       position: "Business Analyst",
    //       duration: "2/2021 - 2/2023",
    //       responsibilities: [
    //         "Apply Scrum framework to the project",
    //         "Conduct the Sprint Planning to estimate the work",
    //         "Sprint report to the customer, follow up with PO, development team",
    //         "Daily tracking progress",
    //         "Conduct the retro meeting at the end of each sprint. Point out the things that we have done well and which things we need to improve",
    //         "System Analysis and Design",
    //         "Module development",
    //         "Document Design SRS, FRS, BRD",
    //         "Design Manual",
    //         "Support developers in the software development process",
    //         "Guide end users to use the software",
    //         "Creating Test Cases",
    //         "Participate in software testing (functionality)",
    //         "Train users on how to use the software",
    //         "Support calling for fire inspection",
    //       ],
    //       technologies: ["real-time integration via google map API"],
    //     },
    //     {
    //       project: "Document storage software",
    //       description:
    //         "Document storage software allows users to store documents digitally and provide the exact location of said document. This software follow the government’s document storage protocol strictly and have been used by many government agencies",
    //       teamSize: "10 members",
    //       position: "Business Analyst",
    //       duration: "1/2023 - 4/2023",
    //       responsibilities: [
    //         "System Analysis and Design",
    //         "Module Development",
    //         "SRS, FRS, BRD document design",
    //         "Designing user manuals",
    //         "Participate in dev support during software development",
    //         "Instruct end users to use the software",
    //         "Create test cases",
    //         "Participate in software testing (functions)",
    //       ],
    //       technologies: ["OCR"],
    //     },
    //     {
    //       project: "Distribution Management Software",
    //       description:
    //         "This software allows users to manage all distribution of agencies such as: manage goods’ in and out flow, check on agencies’ sales, provide agencies’ with the ability to pre-order goods, sales directly to customer through e-contract, have e-signature for easy sales process,...",
    //       teamSize: "5 members",
    //       position: "Business analyst",
    //       duration: null,
    //       responsibilities: [
    //         "Apply Scrum Framework to the project",
    //         "Daily tracking progress and hosting daily stand-up to sync status",
    //         "Closely work with development team, PO",
    //         "Sprint report to customer",
    //         "Once a week conduct the review meeting with the team to see what items can't be done in the current sprint",
    //         "Conduct the retrospective meeting at the end of the sprint",
    //         "System analysis and design",
    //         "Module Development",
    //         "SRS, FRS, BRD document design",
    //         "Designing user manuals",
    //         "UI/UX design, mock up and prototype building",
    //         "Participate in dev support during software development",
    //         "Instruct end users to use the software",
    //         "Create test cases",
    //         "Participate in software testing (functions)",
    //       ],
    //       technologies: ["E-signature"],
    //     },
    //     {
    //       project: "Live streaming app for Shopify",
    //       description:
    //         "Allowing merchants on shopify the ability to live stream directly on their shopify storefront and have a list of products where merchants can select to show to customer and customer can buy directly on stream. The app also have analytic and pre-recorded stream and using custom RTMP technology",
    //       teamSize: "3 members",
    //       position: "Business analyst/PM",
    //       duration: "1/2024 - Now",
    //       responsibilities: [
    //         "Implement the Scrum framework for the project.",
    //         "Perform Sprint Planning to estimate tasks.",
    //         "Provide Sprint reports to the customer and follow up with the Product Owner and development team.",
    //         "Track progress daily.",
    //         "Hold retrospective meetings at the end of each sprint to identify successes and areas for improvement.",
    //         "Research Shopify's policies and requirements for publishing your app.",
    //         "Write product descriptions for the app",
    //         "Designing promotional videos",
    //         "System analysis and design",
    //         "SRS, FRS, BRD document design",
    //         "Designing user manuals",
    //         "Wireframe design and construction",
    //         "Participate in dev support during software development",
    //         "Create test cases",
    //         "Participate in software testing (functions)",
    //       ],
    //       technologies: ["Custom RTMP"],
    //     },
    //   ],
    // };
    // return data;
    return this.resumeService.upload(data, "");
    // return this.resumeService.upload(data.data, "cm163hj0q000210dr7ul5bjrn");
  }

  // @Post("")
}
