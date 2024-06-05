import { Controller, Get, NotFoundException } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HealthCheck, HealthCheckService } from "@nestjs/terminus";

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
  ) {}

  private run() {
    return this.health.check([
      () => this.database.isHealthy(),
      () => this.storage.isHealthy(),
      () => this.browser.isHealthy(),
    ]);
  }

  @Get()
  @HealthCheck()
  check() {
    return this.run();
  }

  @Get("environment")
  environment() {
    if (process.env.NODE_ENV === "production") throw new NotFoundException();
    return configSchema.parse(process.env);
  }
}
