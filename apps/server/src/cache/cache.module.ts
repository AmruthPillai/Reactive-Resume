import { CacheModule as NestCacheModule } from "@nestjs/cache-manager";
import { Logger, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RedisModule } from "@songkeys/nestjs-redis";
import { redisStore } from "cache-manager-redis-yet";

import { Config } from "../config/schema";

@Module({
  imports: [
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<Config>) => ({
        config: { url: configService.getOrThrow("REDIS_URL") },
      }),
    }),
    NestCacheModule.registerAsync({
      isGlobal: true,

      inject: [ConfigService],
      useFactory: async (configService: ConfigService<Config>) => {
        const url = configService.get("REDIS_URL");

        if (!url) {
          Logger.warn(
            "`REDIS_URL` was not set, using in-memory cache instead. This is not suitable for production.",
            "CacheModule",
          );

          return {};
        }

        return { store: await redisStore({ url }) };
      },
    }),
  ],
})
export class CacheModule {}
