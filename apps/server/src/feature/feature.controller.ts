import { Controller, Get } from "@nestjs/common";

import { FeatureService } from "./feature.service";

@Controller("feature")
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}

  @Get("/flags")
  getFeatureFlags() {
    return this.featureService.getFeatures();
  }
}
