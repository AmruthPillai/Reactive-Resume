import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { BillingController } from "./billing.controller";
import { BillingService } from "./billing.service";

@Module({
  imports: [AuthModule, HttpModule],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
