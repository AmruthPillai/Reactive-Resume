import { Controller, Get, Query, UseGuards, UsePipes } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Roles } from "../auth/enums/roles.enum";
import { Role } from "../auth/decorators/roles.decorator";
import { TwoFactorGuard } from "../auth/guards/two-factor.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { AdminService } from "./admin.service";
import { PaginationDto } from "@reactive-resume/dto";
import { ZodValidationPipe } from "nestjs-zod";

@ApiTags("Admin")
@Controller("admin")
export class AdminController {
  /**
   * contructor
   */
  constructor(
    /**
     * inject admin service
     */
    private readonly adminService: AdminService,
  ) {}

  /**
   * get all users
   */
  @Get("/users")
  @Role([Roles.ADMIN])
  @UseGuards(TwoFactorGuard, RolesGuard)
  @ApiOperation({
    description: "Get all users (name email number of cv)",
  })
  @UsePipes(ZodValidationPipe)
  async GetUser(
    @Query() paginationDto: PaginationDto,
    @Query("page") page?: string,
    @Query("pageSize") pageSize?: string,
  ) {
    return this.adminService.getAllUsers(paginationDto);
  }
}
