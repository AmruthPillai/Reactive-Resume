import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

import { TranslationController } from "./translation.controller";

@Module({
  imports: [HttpModule],
  controllers: [TranslationController],
})
export class TranslationModule {}
