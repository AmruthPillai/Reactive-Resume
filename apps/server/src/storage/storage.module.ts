import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type {} from "multer";
import { MinioModule } from "nestjs-minio-client";

import { Config } from "../config/schema";
import { StorageController } from "./storage.controller";
import { StorageService } from "./storage.service";

@Module({
  imports: [
    MinioModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Config>) => ({
        useSSL: false,
        endPoint: configService.getOrThrow<string>("STORAGE_ENDPOINT"),
        port: configService.getOrThrow<number>("STORAGE_PORT"),
        region: configService.get<string>("STORAGE_REGION"),
        accessKey: configService.getOrThrow<string>("STORAGE_ACCESS_KEY"),
        secretKey: configService.getOrThrow<string>("STORAGE_SECRET_KEY"),
      }),
    }),
  ],
  controllers: [StorageController],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
