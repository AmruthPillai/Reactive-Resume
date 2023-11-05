import { Injectable } from "@nestjs/common";
import { HealthIndicator, HealthIndicatorResult } from "@nestjs/terminus";

import { StorageService } from "../storage/storage.service";

@Injectable()
export class StorageHealthIndicator extends HealthIndicator {
  constructor(private readonly storageService: StorageService) {
    super();
  }

  async isHealthy(): Promise<HealthIndicatorResult> {
    try {
      await this.storageService.bucketExists();

      return this.getStatus("storage", true);
    } catch (error) {
      return this.getStatus("storage", false, { message: error.message });
    }
  }
}
