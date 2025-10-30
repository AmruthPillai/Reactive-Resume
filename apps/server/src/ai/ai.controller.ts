import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";

import { TwoFactorGuard } from "@/server/auth/guards/two-factor.guard";
import { User } from "@/server/user/decorators/user.decorator";

import { AiService } from "./ai.service";

type Mode = "improve" | "fix" | "tone";

@Controller("ai")
export class AiController {
  constructor(private readonly svc: AiService) {}

  @Post("rewrite")
  @UseGuards(TwoFactorGuard)
  @Throttle(1, 1)
  async rewrite(@User("id") userId: string, @Body() body: any) {
    const text: string = String(body?.text ?? "").slice(0, 2000);
    const mode: Mode | undefined = body?.mode;
    const mood: string | undefined = body?.mood;
    return this.svc.rewrite(userId, text, mode, mood);
  }
}

