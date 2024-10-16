import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";

import { TwoFactorGuard } from "@/server/auth/guards/two-factor.guard";
import { User } from "@/server/user/decorators/user.decorator";

import { AnyObject } from "../resume/types";
import { StorageService } from "./storage.service";

@ApiTags("Storage")
@Controller("storage")
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Put("image")
  @UseGuards(TwoFactorGuard)
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(@User("id") userId: string, @UploadedFile("file") file: Express.Multer.File) {
    if (!file.mimetype.startsWith("image")) {
      throw new BadRequestException(
        "The file you uploaded doesn't seem to be an image, please upload a file that ends in .jp(e)g or .png.",
      );
    }

    return this.storageService.uploadObject(userId, "pictures", file.buffer, userId);
  }

  @Get("locations")
  locations() {
    return this.storageService.locations();
  }

  @Post("locations")
  newLocations(@Body() data: Prisma.LocationsCreateInput) {
    return this.storageService.newLocations(data);
  }

  @Delete("locations/:id")
  deleteLocation(@Param() param: AnyObject) {
    return this.storageService.deleteLocation(param.id);
  }

  @Put("locations/:id")
  updateLocation(@Param() param: AnyObject, @Body() data: AnyObject) {
    return this.storageService.updateLocation(param.id, data.name);
  }
}
