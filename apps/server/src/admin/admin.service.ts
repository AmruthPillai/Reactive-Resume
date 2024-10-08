import { Injectable } from "@nestjs/common";
import { PaginationDto, UserPartialInformation } from "@reactive-resume/dto";
import { PrismaService } from "nestjs-prisma";
import { PaginationInterface } from "../common/interfaces/pagination.interface";

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
   * get all users and pagination
   */
  async getAllUsers(
    paginationDto: PaginationDto,
  ): Promise<PaginationInterface<UserPartialInformation>> {
    try {
      const { page, pageSize } = paginationDto;

      // get users
      const result = await Promise.all([
        this.prisma.user.findMany({
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
        data: result[0],
        meta: {
          currentPage: page,
          itemPerPage: pageSize,
          totalItem: result[1],
          totalPage: Math.ceil(result[1] / pageSize),
        },
      };
    } catch (error) {
      throw new Error("Error fetching users");
    }
  }
}
