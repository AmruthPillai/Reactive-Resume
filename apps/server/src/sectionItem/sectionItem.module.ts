import { Module } from "@nestjs/common";

import { AuthModule } from "@/server/auth/auth.module";

import { SectionItemController } from "./sectionItem.controller";
import { SectionItemService } from "./sectionItem.service";

@Module({
  imports: [AuthModule],
  controllers: [SectionItemController],
  providers: [SectionItemService],
  exports: [SectionItemService],
})
export class SectionItemModule {}
