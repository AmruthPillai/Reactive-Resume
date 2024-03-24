import { Injectable } from "@nestjs/common";
import { PromptKey } from "@reactive-resume/schema";
import { RedisService } from "@songkeys/nestjs-redis";
import { PrismaService } from "nestjs-prisma";

import { UtilsService } from "../utils/utils.service";
import { JobTitleService } from "./job-title/job-title.service";
import { PalmService } from "./palm/palm.service";

@Injectable()
export class RecommendationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly palmService: PalmService,
    private readonly jobTitleService: JobTitleService,
    private readonly redisService: RedisService,
    private readonly utils: UtilsService,
  ) {}

  async getRecommendation(title: string, type: PromptKey) {
    return this.utils.getCachedOrSet(
      `recommendations:${title}:${type}`,
      async () => {
        // Get Job Title from DB
        let jt = await this.prisma.jobTitle.findFirst({
          where: {
            title: title,
          },
          select: {
            id: true,
          },
        });
        // Job Title: If Not exist, add Job Title and Recommendations
        if (!jt) {
          const palmResponse = await this.palmService.getRecommendation(title, type);
          jt = await this.jobTitleService.createJobTitle(
            palmResponse.jobTitle,
            palmResponse.relatedJobTitles,
            palmResponse.suggestions,
            type,
          );
        } else {
          // Recommendations: If Not exist, add Recommendations
          const count = await this.prisma.recommendationSnippet.count({
            where: {
              jobTitleId: jt.id,
              type,
            },
          });
          if (count < 5) {
            const palmResponse = await this.palmService.getRecommendation(title, type);
            await this.jobTitleService.createRecommendations(jt.id, palmResponse.suggestions, type);
          }
        }
        return this.jobTitleService.getRecommendations(title);
      },
      1000 * 60 * 60 * 1, // 1 hour
    );
  }

  async searchJobTitles(search: string) {
    return this.utils.getCachedOrSet(
      `autocomplete:job-title:${search}}`,
      async () => {
        return this.jobTitleService.searchJobTitle(search);
      },
      1000 * 60 * 60 * 1, // 1 hour
    );
  }
}
