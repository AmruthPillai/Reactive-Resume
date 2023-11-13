import { Controller, Get } from "@nestjs/common";

import { UtilsService } from "../utils/utils.service";
import { ContributorsService } from "./contributors.service";

@Controller("contributors")
export class ContributorsController {
  constructor(
    private readonly contributorsService: ContributorsService,
    private readonly utils: UtilsService,
  ) {}

  @Get("/github")
  async githubContributors() {
    return this.utils.getCachedOrSet(
      `contributors:github`,
      async () => this.contributorsService.fetchGitHubContributors(),
      1000 * 60 * 60 * 24, // 24 hours
    );
  }

  @Get("/crowdin")
  async crowdinContributors() {
    return this.utils.getCachedOrSet(
      `contributors:crowdin`,
      async () => this.contributorsService.fetchCrowdinContributors(),
      1000 * 60 * 60 * 24, // 24 hours
    );
  }
}
