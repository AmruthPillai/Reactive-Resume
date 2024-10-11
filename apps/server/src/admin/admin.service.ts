import { Injectable, NotFoundException } from "@nestjs/common";
import { UserPartialInformation } from "@reactive-resume/dto";
import { PrismaService } from "nestjs-prisma";
import { PaginationInterface } from "../common/interfaces/pagination.interface";
import { Prisma } from "@prisma/client";
import { PaginationQueryDto } from "./dtos/pagination.dto";
import { UserCountResumes, UserWithCount } from "./interfaces/user.interface";
import xlsx from "node-xlsx";

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
}
