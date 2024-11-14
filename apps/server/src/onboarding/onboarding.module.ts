import { Module } from "@nestjs/common";

import { OnboardingController } from "./onboarding.controller";
import { OnboardingService } from "./onboarding.service";

@Module({
  imports: [],
  controllers: [OnboardingController],
  providers: [OnboardingService],
})
export class OnboardingModule {}
