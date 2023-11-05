import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Cache } from "cache-manager";

import { Config } from "../config/schema";

@Injectable()
export class UtilsService {
  logger = new Logger(UtilsService.name);

  constructor(
    private readonly configService: ConfigService<Config>,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

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

  async getCachedOrSet<T>(key: string, callback: () => Promise<T>, ttl?: number): Promise<T> {
    // Try to get the value from the cache
    const start = performance.now();
    const cachedValue = await this.cache.get<T>(key);
    const duration = Number(performance.now() - start).toFixed(0);

    if (cachedValue === undefined) {
      this.logger.debug(`Cache Key "${key}": miss`);
    } else {
      this.logger.debug(`Cache Key "${key}": hit - ${duration}ms`);
    }

    // If the value is in the cache, return it
    if (cachedValue !== undefined) {
      return cachedValue;
    }

    // If the value is not in the cache, run the callback
    const value = await callback();

    // Store the value in the cache
    await this.cache.set(key, value, ttl);

    // Return the value
    return value;
  }
}
