import { Controller, Delete, Get, Param, Req, Res, UseGuards } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import { PrismaService } from "nestjs-prisma";

import { TwoFactorGuard } from "@/server/auth/guards/two-factor.guard";
import { User } from "@/server/user/decorators/user.decorator";

@Controller("account")
export class AccountController {
  constructor(private prisma: PrismaService) {}

  @Get("entitlements")
  @UseGuards(TwoFactorGuard)
  @Throttle(30, 60)
  async entitlements(@User("id") userId: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { plan: true, hasAI: true, templatesCap: true },
    });
    return user;
  }

  @Get("billing")
  @UseGuards(TwoFactorGuard)
  @Throttle(15, 60)
  async billing(@User("id") userId: string) {
    const [entitlements, payments] = await Promise.all([
      this.prisma.user.findUniqueOrThrow({
        where: { id: userId },
        select: { plan: true, hasAI: true, templatesCap: true },
      }),
      this.prisma.payment.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 50,
        select: {
          id: true,
          reference: true,
          sku: true,
          amountKES: true,
          currency: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);
    return { entitlements, payments };
  }

  @Get("sessions")
  @UseGuards(TwoFactorGuard)
  async sessions(@User("id") userId: string) {
    const sessions = await this.prisma.session.findMany({
      where: { userId },
      orderBy: { lastUsedAt: "desc" },
      select: { id: true, userAgent: true, ip: true, createdAt: true, lastUsedAt: true },
    });
    return { sessions };
  }

  @Delete("sessions/:id")
  @UseGuards(TwoFactorGuard)
  async revokeSession(
    @User("id") userId: string,
    @Param("id") id: string,
    @Req() req: any,
    @Res({ passthrough: true }) res: any,
  ) {
    const session = await this.prisma.session.findUnique({ where: { id } });
    if (!session || session.userId !== userId) return { ok: true };
    await this.prisma.session.delete({ where: { id } });
    const refresh = req.cookies?.Refresh as string | undefined;
    if (refresh) {
      const { createHash } = await import("node:crypto");
      const tokenHash = createHash("sha256").update(refresh).digest("hex");
      if (tokenHash === (session as any).tokenHash) {
        res.clearCookie("Authentication");
        res.clearCookie("Refresh");
      }
    }
    return { ok: true };
  }
}
