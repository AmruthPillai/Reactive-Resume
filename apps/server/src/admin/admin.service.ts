import { Injectable, NotFoundException } from "@nestjs/common";
import { UserPartialInformation } from "@reactive-resume/dto";
import { PrismaService } from "nestjs-prisma";
import { PaginationInterface } from "../common/interfaces/pagination.interface";
import { Prisma } from "@prisma/client";
import { PaginationQueryDto } from "./dtos/pagination.dto";
import { Workbook, Worksheet } from "exceljs";
import * as tmp from "tmp";
import { UserCountResumes, UserWithCount } from "./interfaces/user.interface";
import { NAMEFILE, POSTFIX, WORKSHEET } from "./constants/file.constant";

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
   * download list users
   */
  async downLoadUser(): Promise<string> {
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

    //  create working book
    const book: Workbook = new Workbook();

    //  adding worksheet to workbook
    const sheet: Worksheet = book.addWorksheet(WORKSHEET);

    // add header
    rows.unshift(Object.keys({ name: "", email: "", resumes: 0 } as UserCountResumes));

    sheet.addRows(rows);

    let file: string = await new Promise((resole, reject) => {
      tmp.file(
        {
          discardDescriptor: true,
          prefix: NAMEFILE,
          postfix: POSTFIX,
          mode: parseInt("0600", 8),
        },

        async (err, file) => {
          if (err) {
            throw err;
          }

          // writing temp file
          book.xlsx
            .writeFile(file)
            .then((_) => {
              resole(file);
            })
            .catch((err) => {
              throw err;
            });
        },
      );
    });

    return file;
  }
}
