import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { Config } from "../config/schema";

@Injectable()
export class FeatureService {
  constructor(private readonly configService: ConfigService<Config>) {}

  getFeatures() {
    const isSignupsDisabled = this.configService.getOrThrow<boolean>("DISABLE_SIGNUPS");
    const isEmailAuthDisabled = this.configService.getOrThrow<boolean>("DISABLE_EMAIL_AUTH");

    return {
      isSignupsDisabled,
      isEmailAuthDisabled,
    };
  }
}
