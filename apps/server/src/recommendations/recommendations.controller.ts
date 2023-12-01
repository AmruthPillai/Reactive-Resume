import { Body, Controller, Post } from "@nestjs/common";
import { PalmGenerateTextRequest } from "@reactive-resume/schema";

import { RecommendationsService } from "./recommendations.service";

@Controller("recommendations")
export class RecommendationsController {
  constructor(private readonly recommendationsService: RecommendationsService) {}

  @Post("text")
  async text(@Body() palmReq: PalmGenerateTextRequest) {
    const recommendation = await this.recommendationsService.getTextRecommendation(palmReq);
    return recommendation;
  }
}
