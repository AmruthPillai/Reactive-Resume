import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { Cache } from "cache-manager";
import { PrismaService } from "nestjs-prisma";

import { ErrorMessage } from "../constants/error-message";
import { StorageService } from "../storage/storage.service";

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storageService: StorageService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
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
      return this.prisma.user.findUniqueOrThrow({
        where: { username: identifier },
        include: { secrets: true },
      });
    })(identifier);

    if (!user.secrets) {
      throw new InternalServerErrorException(ErrorMessage.SecretsNotFound);
    }

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data, include: { secrets: true } });
  }

  async updateByEmail(email: string, data: Prisma.UserUpdateArgs["data"]) {
    return this.prisma.user.update({ where: { email }, data });
  }

  async updateByResetToken(resetToken: string, data: Prisma.SecretsUpdateArgs["data"]) {
    await this.prisma.secrets.update({ where: { resetToken }, data });
  }

  async deleteOneById(id: string) {
    await Promise.all([
      ...(await this.cache.store.keys(`user:${id}:*`)).map((key) => this.cache.del(key)),
      this.storageService.deleteFolder(id),
    ]);

    return this.prisma.user.delete({ where: { id } });
  }
}
