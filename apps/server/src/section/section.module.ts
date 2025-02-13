import { Module } from "@nestjs/common";

import { AuthModule } from "@/server/auth/auth.module";

import { SectionController } from "./section.controller";
import { SectionService } from "./section.service";

@Module({
  imports: [AuthModule],
  controllers: [SectionController],
  providers: [SectionService],
  exports: [SectionService],
})
export class SectionModule {}
