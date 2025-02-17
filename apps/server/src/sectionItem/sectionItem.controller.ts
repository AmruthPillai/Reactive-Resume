import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { User as UserEntity } from "@prisma/client";
import { sectionSchemaWithData } from "@reactive-resume/schema";
import zodToJsonSchema from "zod-to-json-schema";

import { TwoFactorGuard } from "../auth/guards/two-factor.guard";
import { User } from "../user/decorators/user.decorator";
import { SectionItemService } from "./sectionItem.service";

@ApiTags("SectionItem")
@Controller("sectionItem")
export class SectionItemController {
  constructor(private readonly sectionItemService: SectionItemService) {}

  @Get("schema")
  getSchema() {
    return zodToJsonSchema(sectionSchemaWithData);
  }

  @Get()
  @UseGuards(TwoFactorGuard)
  findAll(@User() user: UserEntity) {
    return this.sectionItemService.findAll(user.id);
  }

  @Get("/hello")
  hello() {
    return "Hello World!";
  }


}
