import { Injectable, ForbiddenException, ServiceUnavailableException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import OpenAI from "openai";
import { PrismaService } from "nestjs-prisma";

import type { Config } from "@/server/config/schema";

@Injectable()
export class AiService {
  private client: OpenAI | null = null;
  private model: string;
  private maxFree: number;
  private maxAddon: number;
  private maxLifetime: number;

  constructor(private config: ConfigService<Config>, private prisma: PrismaService) {
    const key = this.config.get<string>("OPENAI_API_KEY");
    this.model = this.config.get<string>("AI_MODEL") ?? "gpt-4o-mini";
    this.maxFree = Number(this.config.get("AI_MAX_DAILY_FREE")) || 0;
    this.maxAddon = Number(this.config.get("AI_MAX_DAILY_ADDON")) || 200;
    this.maxLifetime = Number(this.config.get("AI_MAX_DAILY_LIFETIME")) || 300;
    if (key) {
      this.client = new OpenAI({ apiKey: key });
    }
  }

  private async checkAndConsumeQuota(userId: string) {
    // Figure out max per day based on entitlements
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { plan: true, hasAI: true },
    });
    const cap = user.plan === "lifetime" ? this.maxLifetime : user.hasAI ? this.maxAddon : this.maxFree;
    if (cap <= 0) throw new ForbiddenException("AI not available for your plan");

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const key = { userId_date: { userId, date: today } } as const;
    const usage = await this.prisma.usage.findUnique({ where: key });
    const aiCalls = usage?.aiCalls ?? 0;
    if (aiCalls >= cap) {
      throw new ForbiddenException("AI daily limit reached. Try again tomorrow.");
    }
    await this.prisma.usage.upsert({
      where: key,
      update: { aiCalls: { increment: 1 } },
      create: { userId, date: today, prints: 0, aiCalls: 1 },
    });
  }

  private buildPrompt(text: string, mode?: string, mood?: string) {
    const base =
      "You are an AI writing assistant specialized in resume copy. Return only the revised text with no prefixes, suffixes, or extra lines.";
    if (mode === "fix") {
      return `${base}\nFix only spelling and grammar. Keep meaning. Return in the original language.\n\nText: """${text}"""\n\nRevised Text: """`;
    }
    if (mode === "tone" && mood) {
      return `${base}\nChange the tone to be ${mood} and return in the original language.\n\nText: """${text}"""\n\nRevised Text: """`;
    }
    return `${base}\nImprove the writing and return in the original language.\n\nText: """${text}"""\n\nRevised Text: """`;
  }

  async rewrite(userId: string, text: string, mode?: string, mood?: string) {
    if (!this.client) {
      throw new ServiceUnavailableException("AI is not configured");
    }
    await this.checkAndConsumeQuota(userId);
    const input = String(text ?? "").slice(0, 2000);
    const prompt = this.buildPrompt(input, mode, mood);

    const res = await this.client.chat.completions.create({
      model: this.model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
      temperature: mode === "fix" ? 0 : 0.5,
      stop: ['"""'],
      n: 1,
    });
    const out = res.choices?.[0]?.message?.content ?? input;
    return { text: out };
  }
}

