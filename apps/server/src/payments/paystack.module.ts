import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

import { PaystackController } from "./paystack.controller";
import { PaystackService } from "./paystack.service";

@Module({
  imports: [HttpModule],
  controllers: [PaystackController],
  providers: [PaystackService, PrismaService],
})
export class PaystackModule {}
