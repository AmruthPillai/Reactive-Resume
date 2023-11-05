import { CacheInterceptor, CacheKey, CacheTTL } from "@nestjs/cache-manager";
import { Controller, Get, NotFoundException, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HealthCheck, HealthCheckService } from "@nestjs/terminus";
import { RedisService } from "@songkeys/nestjs-redis";
import { RedisHealthIndicator } from "@songkeys/nestjs-redis-health";

import { configSchema } from "../config/schema";
import { BrowserHealthIndicator } from "./browser.health";
import { DatabaseHealthIndicator } from "./database.health";
import { StorageHealthIndicator } from "./storage.health";

@ApiTags("Health")
@Controller("health")
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly database: DatabaseHealthIndicator,
    private readonly browser: BrowserHealthIndicator,
    private readonly storage: StorageHealthIndicator,
    private readonly redisService: RedisService,
    private readonly redis: RedisHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @UseInterceptors(CacheInterceptor)
  @CacheKey("health:check")
  @CacheTTL(30000) // 30 seconds
  check() {
    return this.health.check([
      () => this.database.isHealthy(),
      () => this.storage.isHealthy(),
      () => this.browser.isHealthy(),
      () => {
        return this.redis.checkHealth("redis", {
          type: "redis",
          timeout: 1000,
          client: this.redisService.getClient(),
        });
      },
    ]);
  }

  @Get("environment")
  environment() {
    if (process.env.NODE_ENV === "production") throw new NotFoundException();
    return configSchema.parse(process.env);
  }
}
