import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaModule, providePrismaClientExceptionFilter } from "nestjs-prisma";

import { Config } from "@/server/config/schema";

@Module({
  imports: [
    PrismaModule.forRootAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Config>) => ({
        prismaOptions: { datasourceUrl: configService.get("DATABASE_URL") },
      }),
    }),
  ],
  providers: [providePrismaClientExceptionFilter()],
})
export class DatabaseModule {}
