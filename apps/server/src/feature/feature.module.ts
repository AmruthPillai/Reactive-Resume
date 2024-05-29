import { Module } from "@nestjs/common";

import { FeatureController } from "./feature.controller";
import { FeatureService } from "./feature.service";

@Module({
  providers: [FeatureService],
  controllers: [FeatureController],
  exports: [FeatureService],
})
export class FeatureModule {}
