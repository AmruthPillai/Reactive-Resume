import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { PrismaService } from "nestjs-prisma";

import { AiController } from "./ai.controller";
import { AiService } from "./ai.service";

@Module({
  imports: [HttpModule],
  controllers: [AiController],
  providers: [AiService, PrismaService],
})
export class AiModule {}

