import { Body, Controller, Post } from "@nestjs/common";
import { OnboardingLinkedinDto } from "@reactive-resume/dto";

import { OnboardingService } from "./onboarding.service";

@Controller("onboarding")
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}
  @Post("/linkedin")
  async linkedin(@Body() body: OnboardingLinkedinDto) {
    return this.onboardingService.createOnboardingLinkedin(body);
  }
}
