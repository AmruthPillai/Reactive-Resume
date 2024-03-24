import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { PalmGenerateTextRequest } from "@reactive-resume/schema";

import { PalmService } from "./palm/palm.service";
import { RecommendationsService } from "./recommendations.service";
import { ApiTags } from "@nestjs/swagger";
import { Throttle } from "@nestjs/throttler";

@ApiTags("Recommendations")
@Controller("recommendations")
export class RecommendationsController {
  constructor(
    private readonly palmService: PalmService,
    private readonly recommendationService: RecommendationsService,
  ) {}

  @Throttle({ default: { limit: 5, ttl: 1000 } })
  @Post("text")
  async text(@Body() palmReq: PalmGenerateTextRequest) {
    const recommendation = await this.palmService.getTextRecommendation(palmReq);
    return recommendation;
  }

  @Get(":jobTitle/summary")
  async Summary(@Param("jobTitle") jobTitle: string) {
    const recommendation = await this.recommendationService.getRecommendation(jobTitle, "summary");
    return recommendation;
  }

  @Get(":jobTitle/experience")
  async WorkSummary(@Param("jobTitle") jobTitle: string) {
    const recommendation = await this.recommendationService.getRecommendation(
      jobTitle,
      "experience",
    );
    return recommendation;
  }

  @Get(":jobTitle/education")
  async EducationSummary(@Param("jobTitle") jobTitle: string) {
    const recommendation = await this.recommendationService.getRecommendation(
      jobTitle,
      "education",
    );
    return recommendation;
  }

  @Get("suggest/job-titles")
  async JobTitles(@Param("jobTitle") jobTitle: string) {
    const recommendation = await this.recommendationService.searchJobTitles(jobTitle);
    return recommendation;
  }
}
