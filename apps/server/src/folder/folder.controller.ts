import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { User as UserEntity } from "@prisma/client";
import { CreateFolderDto, MoveResumeToFolderDto, UpdateFolderDto } from "@reactive-resume/dto";

import { TwoFactorGuard } from "../auth/guards/two-factor.guard";
import { User } from "../user/decorators/user.decorator";
import { FolderService } from "./folder.service";

@Controller("folder")
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Post()
  @UseGuards(TwoFactorGuard)
  create(@User() user: UserEntity, @Body() createFolderDto: CreateFolderDto) {
    return this.folderService.create(user.id, createFolderDto);
  }

  @Get()
  @UseGuards(TwoFactorGuard)
  findAll(@User() user: UserEntity) {
    return this.folderService.findAll(user.id);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.folderService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(TwoFactorGuard)
  update(
    @User() user: UserEntity,
    @Param("id") id: string,
    @Body() updateFolderDto: UpdateFolderDto,
  ) {
    return this.folderService.update(user.id, id, updateFolderDto);
  }

  @Patch("/move-resume/:id")
  @UseGuards(TwoFactorGuard)
  moveResumeToFolder(
    @User() user: UserEntity,
    @Param("id") id: string,
    @Body() moveResumeToFolderDto: MoveResumeToFolderDto,
  ) {
    return this.folderService.moveResumeToFolder(user.id, id, moveResumeToFolderDto);
  }

  @Delete(":id")
  @UseGuards(TwoFactorGuard)
  remove(
    @Param("id") id: string,
    @Query("isDeleteResumes") isDeleteResumes: boolean,
    @User() user: UserEntity,
  ) {
    return this.folderService.remove(id, user.id, isDeleteResumes);
  }
}
