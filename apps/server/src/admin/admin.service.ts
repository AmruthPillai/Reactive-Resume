import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { PaginationDto } from "@reactive-resume/dto";

@Injectable()
export class AdminService {
  /**
   * constructor
   */
  constructor(
    /**
     * inject user service
     */
    private readonly userService: UserService,
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

    return this.userService.getAllUsers(paginationDto, select);
  }
}
