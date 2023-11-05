import { Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";

import { configSchema } from "./schema";

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      validate: configSchema.parse,
    }),
  ],
})
export class ConfigModule {}
