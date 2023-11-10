import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RedisService } from "@songkeys/nestjs-redis";
import Redis from "ioredis";

import { Config } from "../config/schema";

@Injectable()
export class UtilsService {
  private readonly redis: Redis;
  logger = new Logger(UtilsService.name);

  constructor(
    private readonly redisService: RedisService,
    private readonly configService: ConfigService<Config>,
  ) {
    this.redis = this.redisService.getClient();
  }

  getUrl(): string {
    const url =
      this.configService.get("NODE_ENV") === "production"
        ? this.configService.get("PUBLIC_URL")
        : this.configService.get("__DEV__CLIENT_URL");

    if (!url) {
      throw new InternalServerErrorException("No PUBLIC_URL or __DEV__CLIENT_URL was found.");
    }

    return url;
  }

  async getCachedOrSet<T>(
    key: string,
    callback: () => Promise<T> | T,
    ttl: number = 1000 * 60 * 60 * 24, // 24 hours
    type: "json" | "string" = "json",
  ): Promise<T> {
    // Try to get the value from the cache
    const start = performance.now();
    const cachedValue = await this.redis.get(key);
    const duration = Number(performance.now() - start).toFixed(0);

    if (!cachedValue) {
      this.logger.debug(`Cache Key "${key}": miss`);
    } else {
      this.logger.debug(`Cache Key "${key}": hit - ${duration}ms`);
    }

    // If the value is in the cache, return it
    if (cachedValue) {
      return (type === "string" ? cachedValue : JSON.parse(cachedValue)) as T;
    }

    // If the value is not in the cache, run the callback
    const value = await callback();
    const valueToCache = (type === "string" ? value : JSON.stringify(value)) as string;

    // Store the value in the cache
    await this.redis.set(key, valueToCache, "PX", ttl);

    // Return the value
    return value;
  }
}
