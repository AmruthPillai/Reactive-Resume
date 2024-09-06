import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { User as UserEntity } from "@prisma/client";

import { TwoFactorGuard } from "../auth/guards/two-factor.guard";
import { User } from "../user/decorators/user.decorator";
import { OpenAIService } from "./openai.service";

@Controller("openai")
export class OpenAIController {
  constructor(private readonly openaiService: OpenAIService) {}

  @UseGuards(TwoFactorGuard)
  @Post("/improve-writing")
  async improveWriting(@User() user: UserEntity, @Body() body: { original: string }) {
    return this.openaiService.improveWriting(body.original);
  }

  @UseGuards(TwoFactorGuard)
  @Post("/fix-grammar")
  async fixGrammar(@User() user: UserEntity, @Body() body: { original: string }) {
    return this.openaiService.fixGrammar(body.original);
  }

  @UseGuards(TwoFactorGuard)
  @Post("/change-tone")
  async changeTone(@User() user: UserEntity, @Body() body: { original: string; mood: string }) {
    return this.openaiService.changeTone(body.original, body.mood);
  }
}
