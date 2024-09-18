import {
  BadRequestException,
  Body,
  Controller,
  Get,
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
}
