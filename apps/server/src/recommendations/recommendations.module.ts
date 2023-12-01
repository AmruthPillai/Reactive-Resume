import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { StorageModule } from "../storage/storage.module";
import { UserService } from "../user/user.service";
import { UtilsService } from "../utils/utils.service";
import { RecommendationsController } from "./recommendations.controller";
import { RecommendationsService } from "./recommendations.service";

@Module({
  imports: [HttpModule, StorageModule],
  providers: [RecommendationsService, ConfigService, UserService, UtilsService],
  controllers: [RecommendationsController],
})
export class RecommendationsModule {}
