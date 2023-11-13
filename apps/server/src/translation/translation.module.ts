import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

import { TranslationController } from "./translation.controller";
import { TranslationService } from "./translation.service";

@Module({
  imports: [HttpModule],
  controllers: [TranslationController],
  providers: [TranslationService],
})
export class TranslationModule {}
