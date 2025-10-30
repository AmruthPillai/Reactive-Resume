import { Body, Controller, Get, Headers, HttpCode, Post, Query, Req } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import { ConfigService } from "@nestjs/config";
import type { Request } from "express";

import type { Config } from "@/server/config/schema";

import { PaystackService } from "./paystack.service";

@Controller("paystack")
export class PaystackController {
  constructor(private svc: PaystackService, private config: ConfigService<Config>) {}

  @Get("config")
  getConfig() {
    const pub = this.config.get("PAYSTACK_PUBLIC_KEY");
    return {
      publicKey: pub,
      currency: "KES",
      channels: ["card", "mobile_money", "bank_transfer", "apple_pay"],
    } as const;
  }

  // GET /api/paystack/verify?reference=REF&userId=UID&sku=templates10&amountKES=100
  @Get("verify")
  @Throttle({ verify: { ttl: 60, limit: 10 } })
  async verify(@Query() q: any) {
    const { reference, userId, sku, amountKES } = q;
    const v = await this.svc.verify(reference);
    if (!(v?.status && v?.data?.status === "success")) return { ok: false } as const;
    const paidKES = Math.round(((v?.data?.amount as number) || 0) / 100);
    if (+amountKES && +amountKES !== paidKES)
      return { ok: false, reason: "amount_mismatch" } as const;
    const meta = v?.data?.metadata || {};
    await this.svc.fulfill({
      reference,
      sku: meta.sku || sku,
      userId: meta.userId || userId,
      amountKES: paidKES,
      rawEvent: { source: "verify", v },
    });
    return { ok: true } as const;
  }

  @Get("health")
  health() {
    return { ok: true };
  }

  @HttpCode(200)
  @Get("webhook")
  // Informational endpoint to prevent 404s if GET pinged; actual webhook uses POST.
  info() {
    return { ok: true };
  }

  @Post("webhook")
  @HttpCode(200)
  @Throttle({ webhook: { ttl: 60, limit: 120 } })
  async webhook(
    @Headers("x-paystack-signature") sig: string,
    @Req() req: Request & { rawBody?: Buffer },
    @Body() body: any,
  ) {
    // raw body is needed for signature verification
    const raw = (req as any).rawBody
      ? ((req as any).rawBody as Buffer)
      : Buffer.from(typeof body === "string" ? body : JSON.stringify(body));
    this.svc.verifySignature(sig, raw);
    const evt = typeof body === "string" ? JSON.parse(body) : body;
    if (evt?.event === "charge.success") {
      const ref = evt?.data?.reference as string | undefined;
      const paidKES = Math.round(((evt?.data?.amount as number) || 0) / 100);
      const meta = evt?.data?.metadata || {};
      if (ref && meta.sku && meta.userId) {
        await this.svc.fulfill({
          reference: ref,
          sku: meta.sku,
          userId: meta.userId,
          amountKES: paidKES,
          rawEvent: { source: "webhook", evt },
        });
      }
    }
    return { received: true } as const;
  }
}
