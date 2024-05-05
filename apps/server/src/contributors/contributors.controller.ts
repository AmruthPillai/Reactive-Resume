import { Controller, Get } from "@nestjs/common";

import { ContributorsService } from "./contributors.service";

@Controller("contributors")
export class ContributorsController {
  constructor(private readonly contributorsService: ContributorsService) {}

  @Get("/github")
  async githubContributors() {
    return this.contributorsService.fetchGitHubContributors();
  }

  @Get("/crowdin")
  async crowdinContributors() {
    return this.contributorsService.fetchCrowdinContributors();
  }
}
