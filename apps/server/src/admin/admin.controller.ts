import { Controller, Get, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiCookieAuth, ApiOperation, ApiProperty, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Roles } from "../auth/enums/roles.enum";
import { Role } from "../auth/decorators/roles.decorator";
import { TwoFactorGuard } from "../auth/guards/two-factor.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { AdminService } from "./admin.service";
import { PaginationQueryDto } from "./dtos/pagination.dto";

@ApiTags("Admin")
@Controller("admin")
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }),
)
@ApiCookieAuth()
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
    summary: "get all users",
    description: "Get all users (name email number of cv) param(page pageSize search)",
  })
  async getUsers(@Query() paginationDto: PaginationQueryDto) {
    return this.adminService.getUsers(paginationDto);
  }
}
