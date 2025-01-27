import { Module } from "@nestjs/common";

import { PrinterModule } from "../printer/printer.module";
import { StorageModule } from "../storage/storage.module";
import { PortfolioController } from "./portfolio.controller";
import { PortfolioService } from "./portfolio.service";

@Module({
  imports: [PrinterModule, StorageModule],
  controllers: [PortfolioController],
  providers: [PortfolioService],
  exports: [PortfolioService],
})
export class PortfolioModule {}
