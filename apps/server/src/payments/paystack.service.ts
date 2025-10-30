import { createHmac } from "node:crypto";

import { HttpService } from "@nestjs/axios";
import {
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { firstValueFrom } from "rxjs";

@Injectable()
export class PaystackService {
  base = process.env.PAYSTACK_BASE_URL ?? "https://api.paystack.co";
  secret = process.env.PAYSTACK_SECRET_KEY ?? "";

  constructor(private http: HttpService, private prisma: PrismaService) {}

  async verify(reference: string) {
    const { data } = await firstValueFrom(
      this.http.get(`${this.base}/transaction/verify/${reference}`, {
        headers: { Authorization: `Bearer ${this.secret}` },
      }),
    );
    return data;
  }

  verifySignature(sig: string | undefined, raw: Buffer) {
    if (!sig) throw new UnauthorizedException("No signature");
    const hash = createHmac("sha512", this.secret).update(raw).digest("hex");
    if (hash !== sig) throw new UnauthorizedException("Bad signature");
  }

  async fulfill(args: {
    reference: string;
    sku: string;
    userId: string;
    amountKES: number;
    rawEvent?: unknown;
  }) {
    const { reference, sku, userId, amountKES, rawEvent } = args;
    await this.prisma.payment.upsert({
      where: { reference },
      update: { status: "success", rawEvent: rawEvent as any },
      create: {
        reference,
        userId,
        sku,
        amountKES,
        currency: "KES",
        status: "success",
        rawEvent: rawEvent as any,
      },
    });

    switch (sku) {
      case "templates10":
        await this.prisma.user.update({
          where: { id: userId },
          data: { templatesCap: 10 },
        });
        break;
      case "lifetime":
        await this.prisma.user.update({
          where: { id: userId },
          data: { plan: "lifetime", hasAI: true, templatesCap: 999 },
        });
        break;
      case "ai_addon":
        await this.prisma.user.update({
          where: { id: userId },
          data: { hasAI: true },
        });
        break;
      default:
        break;
    }
  }
}
