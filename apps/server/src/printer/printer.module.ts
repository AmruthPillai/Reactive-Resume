import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

import { StorageModule } from "../storage/storage.module";
import { PrinterService } from "./printer.service";

@Module({
  imports: [HttpModule, StorageModule],
  providers: [PrinterService],
  exports: [PrinterService],
})
export class PrinterModule {}
