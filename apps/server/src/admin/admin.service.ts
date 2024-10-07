import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { PaginationDto } from "@reactive-resume/dto";
import { PaginationService } from "../common/pagination/pagination.service";
import { Entities } from "../common/enums/Entities.enum";

@Injectable()
export class AdminService {
  /**
   * constructor
   */
  constructor(
    /**
     * inject pagination module
     */
    private readonly paginationService: PaginationService,
  ) {}

  /**
   * get all users and pagination
   */
  async getAllUsers(paginationDto: PaginationDto) {
    // select data
    const select: object = {
      name: true,
      email: true,
      _count: {
        select: {
          resumes: true,
        },
      },
    };

    let where: object = {};

    if (paginationDto.searchKey && paginationDto.value) {
      where = {
        [paginationDto.searchKey]: paginationDto.value,
      };
    }

    return this.paginationService.paginatedQuery(paginationDto, Entities.USER, where, select);
  }
}
