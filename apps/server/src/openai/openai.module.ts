import { Module } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { OpenAIController } from "./openai.controller";
import { OpenAIService } from "./openai.service";

@Module({
  imports: [AuthModule],
  controllers: [OpenAIController],
  providers: [OpenAIService],
})
export class OpenAIModule {}
