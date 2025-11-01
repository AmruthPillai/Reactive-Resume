import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { PrismaService } from "nestjs-prisma";

import type { Config } from "@/server/config/schema";

import { GoogleDriveController } from "./google-drive.controller";
import { GoogleDriveStrategy } from "./google-drive.strategy";

@Module({
  imports: [PassportModule],
  controllers: [GoogleDriveController],
  providers: [
    PrismaService,
    {
      provide: GoogleDriveStrategy,
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Config>) => {
        try {
          const clientID = configService.getOrThrow("GOOGLE_CLIENT_ID");
          const clientSecret = configService.getOrThrow("GOOGLE_CLIENT_SECRET");
          const callbackURL = configService.getOrThrow("GOOGLE_DRIVE_CALLBACK_URL");
          return new GoogleDriveStrategy(clientID, clientSecret, callbackURL);
        } catch {
          // Do not crash app if not configured
          return {} as unknown as GoogleDriveStrategy;
        }
      },
    },
  ],
})
export class GoogleDriveModule {}

