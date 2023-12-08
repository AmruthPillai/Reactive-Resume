import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { StorageModule } from "../storage/storage.module";
import { StripeController } from "./stripe.controller";
import { StripeService } from "./stripe.service";

@Module({
  imports: [AuthModule, HttpModule, StorageModule],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}
