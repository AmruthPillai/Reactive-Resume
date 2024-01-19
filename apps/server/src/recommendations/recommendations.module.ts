import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { StorageModule } from "../storage/storage.module";
import { UserService } from "../user/user.service";
import { UtilsService } from "../utils/utils.service";
import { JobTitleService } from "./job-title/job-title.service";
import { PalmService } from "./palm/palm.service";
import { RecommendationsController } from "./recommendations.controller";
import { RecommendationsService } from "./recommendations.service";

@Module({
  imports: [HttpModule, StorageModule],
  providers: [
    RecommendationsService,
    PalmService,
    JobTitleService,
    ConfigService,
    UserService,
    UtilsService,
  ],
  controllers: [RecommendationsController],
})
export class RecommendationsModule {}
