import { Module } from "@nestjs/common";

import { AuthModule } from "@/server/auth/auth.module";

import { SectionItemController } from "./section-item.controller";
import { SectionItemService } from "./section-item.service";

@Module({
  imports: [AuthModule],
  controllers: [SectionItemController],
  providers: [SectionItemService],
  exports: [SectionItemService],
})
export class SectionItemModule {}
