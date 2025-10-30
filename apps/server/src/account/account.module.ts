import { Module } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

import { AccountController } from "./account.controller";

@Module({
  controllers: [AccountController],
  providers: [PrismaService],
})
export class AccountModule {}

