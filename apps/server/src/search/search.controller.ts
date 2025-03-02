import { Controller, Get, InternalServerErrorException, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { SearchService } from "./search.service";

@ApiTags("Search")
@Controller("search")
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async searchUsers(
    @Query("query") searchQuery: string,
    @Query("totalResults") totalResults: number,
  ) {
    try {
      const users = await this.searchService.searchUsers(searchQuery, totalResults);
      return users;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
