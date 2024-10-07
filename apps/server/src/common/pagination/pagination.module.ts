import { Module } from "@nestjs/common";
import { PaginationService } from "./pagination.service";

@Module({
  providers: [PaginationService],
  exports: [PaginationService],
})
export class PaginationModule {}
