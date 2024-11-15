import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { OnboardingLinkedinDto } from "@reactive-resume/dto";

import { OnboardingService } from "./onboarding.service";

@Controller("onboarding")
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}
  @Post("/linkedin")
  async linkedin(@Body() body: OnboardingLinkedinDto) {
    return this.onboardingService.createOnboardingLinkedin(body);
  }

  @Get("/linkedin/:id")
  async getLinkedin(@Param("id") id: string) {
    return this.onboardingService.getOnboardingLinkedin(id);
  }
}
