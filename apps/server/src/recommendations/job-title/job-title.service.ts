import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

import { PromptKey } from "../palm/palm.prompt";

@Injectable()
export class JobTitleService {
  constructor(private readonly prisma: PrismaService) {}
  select_jobTitle = {
    id: true,
    title: true,
    relatedJobTitles: true,
    recommendations: {
      select: {
        id: true,
        phrase: true,
        highlight: true,
        locale: true,
      },
    },
    category: true,
  };

  async createJobTitle(
    jobTitle: string,
    relatedJobTitles: string[],
    phrases: string[],
    type: string,
  ) {
    return await this.prisma.jobTitle.create({
      data: {
        title: jobTitle,
        relatedJobTitles: relatedJobTitles,
        recommendations: {
          createMany: {
            data: phrases.map((phrase) => {
              return { phrase, type: type };
            }),
            skipDuplicates: true,
          },
        },
      },
      select: this.select_jobTitle,
    });
  }

  async createRecommendations(jobTitleId: string, phrases: string[], type: PromptKey) {
    return await this.prisma.recommendationSnippet.createMany({
      data: phrases.map((phrase) => {
        return { phrase, type: type, jobTitleId };
      }),
    });
  }

  async getJobTitle(jobTitle: string) {
    return await this.prisma.jobTitle.findFirst({
      where: {
        title: jobTitle,
      },
      select: this.select_jobTitle,
    });
  }
}
