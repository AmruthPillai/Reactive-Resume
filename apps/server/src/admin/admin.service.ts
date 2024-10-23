import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { UserPartialInformation } from "@reactive-resume/dto";
import { PrismaService } from "nestjs-prisma";
import { PaginationInterface } from "../common/interfaces/pagination.interface";
import { Prisma, Resume } from "@prisma/client";
import { PaginationQueryDto, paginationQueryResumeDto } from "./dtos/pagination.dto";
import { UserCountResumes, UserWithCount } from "./interfaces/user.interface";
import xlsx from "node-xlsx";
import { ResumeResponseInterface, ResumeRawDataInterface } from "./interfaces/resume.interface";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { kebabCase } from "@reactive-resume/utils";

@Injectable()
export class AdminService {
  /**
   * constructor
   */
  constructor(
    /**
     * inject prisma service
     */
    private readonly prisma: PrismaService,

    /**
     * request
     */
    @Inject(REQUEST) private readonly req: Request,
  ) {}

  /**
   * get user conditon
   */
  private getUserCondition(pagination: PaginationQueryDto): Prisma.UserWhereInput {
    if (!pagination.search) {
      return {};
    }

    const where: Prisma.UserWhereInput = {
      OR: [
        {
          name: {
            contains: pagination.search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: pagination.search,
          },
        },
      ],
    };

    return where;
  }

  /**
   *  get Users
   */
  async getUsers(
    paginationDto: PaginationQueryDto,
  ): Promise<PaginationInterface<UserPartialInformation>> {
    try {
      const { page, pageSize } = paginationDto;

      const where: Prisma.UserWhereInput = this.getUserCondition(paginationDto);

      // get users
      const [data, countRecord] = await Promise.all([
        this.prisma.user.findMany({
          where: where,
          take: pageSize,
          skip: (page - 1) * pageSize,
          select: {
            name: true,
            email: true,
            _count: {
              select: {
                resumes: true,
              },
            },
          },
        }),

        this.prisma.user.count({
          where: where,
        }),
      ]);

      return {
        data: data,
        meta: {
          currentPage: page,
          itemPerPage: pageSize,
          totalItem: countRecord,
          totalPage: Math.ceil(countRecord / pageSize),
        },
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * download users
   */
  async downloadUsers(): Promise<Buffer> {
    // get users data
    let data: UserWithCount[] = [];

    try {
      data = await this.prisma.user.findMany({
        select: {
          name: true,
          email: true,
          _count: {
            select: {
              resumes: true,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }

    if (data.length === 0) {
      throw new NotFoundException("no user data found");
    }

    const rows = [];

    // add data
    data.forEach((item) => {
      rows.push(
        Object.values({
          name: item.name,
          email: item.email,
          resumes: item._count.resumes,
        } as UserCountResumes),
      );
    });

    // add header
    rows.unshift(Object.keys({ name: "", email: "", resumes: 0 } as UserCountResumes));

    // style sheet
    const sheetOptions = { "!cols": [{ wch: 50 }, { wch: 50 }, { wch: 50 }, { wch: 50 }] };

    // create buffer
    const buffer: Buffer = xlsx.build([
      {
        name: "list-user",
        data: rows,
        options: sheetOptions,
      },
    ]);

    return buffer;
  }

  /**
   * create where resume condition
   */
  private getResumeConditon(paginationDto: paginationQueryResumeDto): Prisma.ResumeWhereInput {
    try {
      const { search, openToWork, userIdentify } = paginationDto;

      let userCondition: Prisma.ResumeWhereInput = {};

      let resumeCondition: Prisma.ResumeWhereInput = {};

      if (search) {
        // user condition
        userCondition = {
          user: {
            OR: [
              {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                email: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          },
        };

        let slug: string = kebabCase(search);

        // resume condition
        resumeCondition = {
          OR: [
            {
              title: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              slug: {
                contains: slug,
                mode: "insensitive",
              },
            },
            {
              data: {
                path: ["basics", "name"],
                string_contains: search,
              },
            },
          ],
        };
      }

      // open to work condition
      let openToWorkCondition: Prisma.ResumeWhereInput = {};
      if (openToWork) {
        openToWorkCondition = {
          data: {
            path: ["workStatus", "openToWork"],
            equals: openToWork === "yes" ? true : false,
          },
        };
      }

      // resumes belong a owner condition
      let belongOwnerCondition: Prisma.ResumeWhereInput = {};
      if (userIdentify) {
        belongOwnerCondition = {
          userId: userIdentify,
        };
      }

      // combine conditions
      const where: Prisma.ResumeWhereInput = {
        AND: [
          {
            OR: [userCondition, resumeCondition],
          },
          openToWorkCondition,
          belongOwnerCondition,
        ],
      };

      return where;
    } catch (error) {
      throw error;
    }
  }

  /**
   * get list resumes
   */
  async getListResumes(
    paginationDto: paginationQueryResumeDto,
  ): Promise<PaginationInterface<ResumeResponseInterface>> {
    try {
      // where condtion
      const where: Prisma.ResumeWhereInput = this.getResumeConditon(paginationDto);

      // get page, pageSize
      const { page, pageSize } = paginationDto;

      const [rawData, count]: [ResumeRawDataInterface[], number] = await Promise.all([
        // get resumes data
        this.prisma.resume.findMany({
          where: where,
          skip: (page - 1) * pageSize,
          take: pageSize,
          select: {
            id: true,
            title: true,
            slug: true,
            data: true,
            user: true,
          },
        }),

        // count record
        this.prisma.resume.count({
          where: where,
        }),
      ]).catch((err) => {
        throw err;
      });

      const data: ResumeResponseInterface[] = [];

      // base URL
      const protocol = this.req.headers["x-forwarded-proto"] || this.req.protocol;
      const url: string = protocol + "://" + this.req.headers.host;
      const newUrl: URL = new URL(this.req.url, url);
      const baseUrl: string = `${newUrl.origin}${newUrl.pathname}`;

      // convert data to ResumeResponseInterface
      rawData.forEach((item: ResumeRawDataInterface) => {
        const dataResume = item.data as any;
        data.push({
          cvTitle: item.title,
          nameCandidate: dataResume?.basics?.name ?? "",
          openToWork: dataResume?.workStatus?.openToWork ?? false,
          ownerName: item.user.name,
          ownerEmail: item.user.email,
          linkCv: `${baseUrl}/${item.slug}`,
          linkListCvOwner: `${baseUrl}?userIdentify=${item.user.id}`,
        } as ResumeResponseInterface);
      });

      return {
        data: data,
        meta: {
          currentPage: page,
          itemPerPage: pageSize,
          totalItem: count,
          totalPage: Math.ceil(count / pageSize),
        },
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * get a resume by id and slug
   */
  async findOneResume(identify: string): Promise<Resume> {
    try {
      return await this.prisma.resume.findFirstOrThrow({
        where: {
          OR: [
            {
              id: identify,
            },
            {
              slug: identify,
            },
          ],
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
