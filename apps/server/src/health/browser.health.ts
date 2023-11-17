import { Injectable } from "@nestjs/common";
import { HealthIndicator, HealthIndicatorResult } from "@nestjs/terminus";

import { PrinterService } from "../printer/printer.service";

@Injectable()
export class BrowserHealthIndicator extends HealthIndicator {
  constructor(private readonly printerService: PrinterService) {
    super();
  }

  async isHealthy(): Promise<HealthIndicatorResult> {
    try {
      const version = await this.printerService.getVersion();

      return this.getStatus("browser", true, { version });
    } catch (error) {
      return this.getStatus("browser", false, { message: error.message });
    }
  }
}
