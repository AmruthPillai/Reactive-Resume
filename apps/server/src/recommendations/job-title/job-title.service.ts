import { Injectable } from "@nestjs/common";
import { JobTitleRecommendationsDto, JobTitleSearchDto } from "@reactive-resume/dto";
import { PromptKey } from "@reactive-resume/schema";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class JobTitleService {
  constructor(private readonly prisma: PrismaService) {}

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
    });
  }

  async createRecommendations(jobTitleId: string, phrases: string[], type: PromptKey) {
    return await this.prisma.recommendationSnippet.createMany({
      data: phrases.map((phrase) => {
        return { phrase, type: type, jobTitleId };
      }),
    });
  }

  async getRecommendations(jobTitle: string): Promise<JobTitleRecommendationsDto> {
    const recommendations = await this.prisma.jobTitle.findFirst({
      where: {
        title: {
          contains: jobTitle,
          mode: "insensitive", // Case-insensitive search
        },
      },
      select: {
        id: true,
        title: true,
        relatedJobTitles: true,
        recommendations: {
          select: {
            id: true,
            phrase: true,
          },
        },
      },
    });
    return recommendations as JobTitleRecommendationsDto;
  }

  async searchJobTitle(search: string): Promise<JobTitleSearchDto[]> {
    return await this.prisma.jobTitle.findMany({
      where: {
        title: {
          contains: search,
          mode: "insensitive", // Case-insensitive search
        },
      },
      take: 10,
      select: {
        id: true,
        title: true,
      },
    });
  }
}
