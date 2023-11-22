import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ContributorDto } from "@reactive-resume/dto";

import { Config } from "../config/schema";

type GitHubResponse = { id: number; login: string; html_url: string; avatar_url: string }[];
type CrowdinContributorsResponse = {
  data: { data: { id: number; username: string; avatarUrl: string } }[];
};

@Injectable()
export class ContributorsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<Config>,
  ) {}

  async fetchGitHubContributors() {
    const response = await this.httpService.axiosRef.get(
      `https://api.github.com/repos/AmruthPillai/Reactive-Resume/contributors`,
    );
    const data = response.data as GitHubResponse;

    return data.map((user) => {
      return {
        id: user.id,
        name: user.login,
        url: user.html_url,
        avatar: user.avatar_url,
      } satisfies ContributorDto;
    });
  }

  async fetchCrowdinContributors() {
    try {
      const projectId = this.configService.getOrThrow("CROWDIN_PROJECT_ID");
      const accessToken = this.configService.getOrThrow("CROWDIN_PERSONAL_TOKEN");

      const response = await this.httpService.axiosRef.get(
        `https://api.crowdin.com/api/v2/projects/${projectId}/members`,
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
      const { data } = response.data as CrowdinContributorsResponse;

      return data.map(({ data }) => {
        return {
          id: data.id,
          name: data.username,
          url: `https://crowdin.com/profile/${data.username}`,
          avatar: data.avatarUrl,
        } satisfies ContributorDto;
      });
    } catch (error) {
      return [];
    }
  }
}
