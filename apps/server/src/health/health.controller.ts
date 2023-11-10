import { Controller, Get, NotFoundException } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HealthCheck, HealthCheckService } from "@nestjs/terminus";
import { RedisService } from "@songkeys/nestjs-redis";
import { RedisHealthIndicator } from "@songkeys/nestjs-redis-health";

import { configSchema } from "../config/schema";
import { UtilsService } from "../utils/utils.service";
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
    private readonly utils: UtilsService,
  ) {}

  private run() {
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

  @Get()
  @HealthCheck()
  check() {
    return this.utils.getCachedOrSet(`health:check`, () => this.run(), 1000 * 30); // 30 seconds
  }

  @Get("environment")
  environment() {
    if (process.env.NODE_ENV === "production") throw new NotFoundException();
    return configSchema.parse(process.env);
  }
}
