import { Injectable } from "@nestjs/common";
import { UserPartialInformation } from "@reactive-resume/dto";
import { PrismaService } from "nestjs-prisma";
import { PaginationInterface } from "../common/interfaces/pagination.interface";
import { Prisma } from "@prisma/client";
import { PaginationQueryDto } from "./dtos/pagination.dto";

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
   * function get Users
   */
  private async getUsers(
    paginationDto: PaginationQueryDto,
    where: Prisma.UserWhereInput = {},
  ): Promise<PaginationInterface<UserPartialInformation>> {
    try {
      const { page, pageSize } = paginationDto;

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
        this.prisma.user.count(),
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
   * get all users and pagination
   */
  async getAllUsers(
    paginationDto: PaginationQueryDto,
  ): Promise<PaginationInterface<UserPartialInformation>> {
    return this.getUsers(paginationDto);
  }

  /**
   * Searh user
   */
  async searchUser(paginationDto: PaginationQueryDto) {
    const where: Prisma.UserWhereInput = this.getUserCondition(paginationDto);
    return this.getUsers(paginationDto, where);
  }
}
