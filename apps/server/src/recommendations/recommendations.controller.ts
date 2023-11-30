import { Body, Controller, Post } from "@nestjs/common";
import { PalmSummaryRequest } from "@reactive-resume/schema";

import { RecommendationsService } from "./recommendations.service";

@Controller("recommendations")
export class RecommendationsController {
  constructor(private readonly recommendationsService: RecommendationsService) {}

  @Post("summary")
  async summary(@Body() palmReq: PalmSummaryRequest) {
    const recommendation = await this.recommendationsService.getSummaryRecommendation(
      palmReq.summary,
    );
    return recommendation;
  }
}
