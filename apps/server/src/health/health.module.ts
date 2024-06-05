import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";

import { PrinterModule } from "../printer/printer.module";
import { StorageModule } from "../storage/storage.module";
import { BrowserHealthIndicator } from "./browser.health";
import { DatabaseHealthIndicator } from "./database.health";
import { HealthController } from "./health.controller";
import { StorageHealthIndicator } from "./storage.health";

@Module({
  imports: [TerminusModule, PrinterModule, StorageModule],
  controllers: [HealthController],
  providers: [DatabaseHealthIndicator, BrowserHealthIndicator, StorageHealthIndicator],
})
export class HealthModule {}
