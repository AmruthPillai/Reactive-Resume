import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { ErrorMessage } from "@reactive-resume/utils";
import { PrismaService } from "nestjs-prisma";

import { StorageService } from "../storage/storage.service";
import { PaginationDto, UserPartialInformation } from "@reactive-resume/dto";
import { PaginationInterface } from "../common/interfaces/pagination.interface";

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  async findOneById(id: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id },
      include: { secrets: true },
    });

    if (!user.secrets) {
      throw new InternalServerErrorException(ErrorMessage.SecretsNotFound);
    }

    return user;
  }

  async findOneByIdentifier(identifier: string) {
    const user = await (async (identifier: string) => {
      // First, find the user by email
      const user = await this.prisma.user.findUnique({
        where: { email: identifier },
        include: { secrets: true },
      });

      // If the user exists, return it
      if (user) return user;

      // Otherwise, find the user by username
      // If the user doesn't exist, throw an error
      return this.prisma.user.findUnique({
        where: { username: identifier },
        include: { secrets: true },
      });
    })(identifier);

    return user;
  }

  async findOneByIdentifierOrThrow(identifier: string) {
    const user = await (async (identifier: string) => {
      // First, find the user by email
      const user = await this.prisma.user.findUnique({
        where: { email: identifier },
        include: { secrets: true },
      });

      // If the user exists, return it
      if (user) return user;

      // Otherwise, find the user by username
      // If the user doesn't exist, throw an error
      return this.prisma.user.findUniqueOrThrow({
        where: { username: identifier },
        include: { secrets: true },
      });
    })(identifier);

    return user;
  }

  create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data, include: { secrets: true } });
  }

  updateByEmail(email: string, data: Prisma.UserUpdateArgs["data"]) {
    return this.prisma.user.update({ where: { email }, data });
  }

  async updateByResetToken(resetToken: string, data: Prisma.SecretsUpdateArgs["data"]) {
    await this.prisma.secrets.update({ where: { resetToken }, data });
  }

  async deleteOneById(id: string) {
    await this.storageService.deleteFolder(id);

    return this.prisma.user.delete({ where: { id } });
  }

  /**
   *
   * get roles by identifier(id or email)
   *
   */
  async getRoles(identifier: string): Promise<string[]> {
    try {
      return (
        await this.prisma.user.findFirstOrThrow({
          where: {
            OR: [{ id: identifier }, { email: identifier }],
          },
        })
      ).roles;
    } catch (error) {
      throw new HttpException(error, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  /**
   * get all users and pagination
   */
  async getAllUsers(
    paginationDto: PaginationDto,
    select: object,
    where: object = {},
  ): Promise<PaginationInterface<UserPartialInformation>> {
    try {
      // total records
      let totalRecord: number = 0;

      try {
        totalRecord = await this.prisma.user.count({ where: where });
      } catch (error) {
        throw new BadRequestException(error);
      }

      // there is no record
      if (totalRecord === 0) {
        return {
          data: [],
          meta: {
            currentPage: paginationDto.page,
            itemPerPage: paginationDto.pageSize,
            totalItem: 0,
            totalPage: 0,
          },
        };
      }

      // total Page
      const totalPage: number = Math.ceil(totalRecord / paginationDto.pageSize);

      // set page require to 1 if it greater than totalPage
      if (paginationDto.page > totalPage) {
        paginationDto.page = 1;
      }

      // get all users
      let users: UserPartialInformation[] = [];

      try {
        users = await this.prisma.user.findMany({
          skip: (paginationDto.page - 1) * paginationDto.pageSize,
          take: paginationDto.pageSize,
          where: where,
          select: select,
        });
      } catch (error) {
        throw new BadRequestException(error);
      }

      return {
        data: users,
        meta: {
          currentPage: paginationDto.page,
          itemPerPage: paginationDto.pageSize,
          totalItem: totalRecord,
          totalPage: totalPage,
        },
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
}
