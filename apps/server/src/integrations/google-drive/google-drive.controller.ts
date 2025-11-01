import { Controller, Get, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { PrismaService } from "nestjs-prisma";

import { User } from "@/server/user/decorators/user.decorator";

import { TwoFactorGuard } from "../../auth/guards/two-factor.guard";
import { GoogleDriveGuard } from "./google-drive.guard";

@Controller("integrations/google-drive")
export class GoogleDriveController {
  constructor(private readonly prisma: PrismaService) {}

  @Get("connect")
  @UseGuards(TwoFactorGuard, GoogleDriveGuard)
  connect() {
    return;
  }

  @Get("callback")
  @UseGuards(TwoFactorGuard, GoogleDriveGuard)
  async callback(@User() oauth: { userId?: string; refreshToken?: string }, @Res() res: Response) {
    if (oauth?.userId && oauth?.refreshToken) {
      await this.prisma.secrets.update({
        where: { userId: oauth.userId },
        data: { googleDriveRefreshToken: oauth.refreshToken },
      });
    }

    res.setHeader("Content-Type", "text/html");
    res.send(
      "<html><body><script>window.close && window.close();</script><p>Google Drive connected. You can close this window.</p></body></html>",
    );
  }
}
