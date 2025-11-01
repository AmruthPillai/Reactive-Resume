
---

# 🤖 AI Integration & Feature Control Guide

**Product:** CV Builder
**Owner:** Emmanuel Chekumbe (@emcie4)
**Audience:** Developers building the AI rewrite / grammar / translation features
**Goal:** Implement AI features using **our own API key**, under strict rate limits, billing tiers, and anti-abuse rules.

---

## 1. Overview

We’re adding **AI-powered writing and improvement tools** (for resumes, cover letters, summaries) directly into Reactive Resume.

**Key points:**

* Users **do not** bring their own API keys.
* We host our **own API key** securely on the server.
* Access is **gated by plan** (AI Add-on or Lifetime).
* Usage is **rate-limited** and logged to control costs.
* No keys or raw prompts are ever exposed to browsers.

This approach gives us:

* Predictable cost control
* Simpler UX (no BYOK friction)
* Easier monitoring & support
* Stronger data privacy guarantees

---

## 2. Business context

| Plan        | AI Access | Daily Limit      | Pricing   |
| ----------- | --------- | ---------------- | --------- |
| Free        | ❌ None    | 0                | Free      |
| Templates10 | ❌ None    | 0                | 100 KES   |
| AI Add-on   | ✅ Yes     | 200 requests/day | 500 KES   |
| Lifetime    | ✅ Yes     | 300 requests/day | 1,000 KES |

AI features include:

* “Improve this text”
* “Summarize experience”
* “Generate professional objective”
* “Rephrase to sound confident”

---

## 3. Architecture

**Server-side proxy only (no client keys).**

```
Client → /api/ai/rewrite (POST)
        ↓
NestJS backend (auth + entitlement + rate limit)
        ↓
OpenAI API (our key)
        ↓
Response → client (text only)
```

**Location in repo**

```
apps/
  server/src/ai/
    ai.controller.ts
    ai.service.ts
    ai.guard.ts
    ai.rate-limit.guard.ts
```

---

## 4. Environment variables

```bash
# OpenAI
OPENAI_API_KEY=sk-xxxx
AI_MODEL=gpt-5-mini
AI_MAX_DAILY_FREE=0
AI_MAX_DAILY_ADDON=200
AI_MAX_DAILY_LIFETIME=300

# Cache / limits
REDIS_URL=redis://localhost:6379
```

These keys live **server-side only** — never pushed to client or repo.

---

## 5. Server-side implementation

### 5.1 Controller

`apps/server/src/ai/ai.controller.ts`

```ts
import { Controller, Post, Body, Req, UseGuards } from "@nestjs/common";
import { AiService } from "./ai.service";
import { AuthGuard } from "../auth/auth.guard";
import { AiEntitlementGuard } from "./ai.guard";
import { AiRateLimitGuard } from "./ai.rate-limit.guard";

@Controller("api/ai")
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post("rewrite")
  @UseGuards(AuthGuard, AiEntitlementGuard, AiRateLimitGuard)
  async rewrite(@Req() req, @Body() body: any) {
    const text = body.text?.slice(0, 2000) || "";
    return await this.aiService.rewrite(req.user, text);
  }
}
```

---

### 5.2 Service

`apps/server/src/ai/ai.service.ts`

```ts
import OpenAI from "openai";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AiService {
  private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

  async rewrite(user, text: string) {
    const prompt = `
    Improve the following CV content for clarity and professionalism,
    keeping Kenyan job market context in mind:
    ---
    ${text}
    ---`;

    const response = await this.openai.chat.completions.create({
      model: process.env.AI_MODEL ?? "gpt-5-mini",
      temperature: 0.4,
      max_completion_tokens: 600,
      messages: [
        { role: "system", content: "You are a helpful career assistant." },
        { role: "user", content: prompt },
      ],
    });

    const result = response.choices?.[0]?.message?.content?.trim() ?? "";
    return { text: result };
  }
}
```

---

### 5.3 Entitlement Guard

`apps/server/src/ai/ai.guard.ts`

```ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AiEntitlementGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = await this.prisma.user.findUnique({
      where: { id: req.user.id },
      select: { plan: true, hasAI: true },
    });
    if (user?.hasAI || user?.plan === "lifetime") return true;
    throw new ForbiddenException("AI not enabled for your plan");
  }
}
```

---

### 5.4 Rate-Limit Guard

`apps/server/src/ai/ai.rate-limit.guard.ts`

```ts
import { CanActivate, ExecutionContext, Injectable, TooManyRequestsException } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class AiRateLimitGuard implements CanActivate {
  redis = new Redis(process.env.REDIS_URL!);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const userId = req.user.id;
    const key = `ai:${userId}:${new Date().toISOString().slice(0, 10)}`;
    const used = await this.redis.incr(key);
    if (used === 1) await this.redis.expire(key, 86400);

    const limit = req.user.plan === "lifetime" ? 300 : 200;
    if (used > limit) throw new TooManyRequestsException("Daily AI limit reached");
    return true;
  }
}
```

---

## 6. Client integration

### 6.1 Component usage

`apps/client/src/features/ai/RewriteButton.tsx`

```tsx
import { useState } from "react";

export function RewriteButton({ text, onResult }) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    const res = await fetch("/api/ai/rewrite", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    setLoading(false);

    if (!res.ok) return alert("AI not available or limit reached");
    const data = await res.json();
    onResult(data.text);
  }

  return (
    <button onClick={handleClick} disabled={loading} className="btn btn-primary">
      {loading ? "Thinking..." : "Improve with AI"}
    </button>
  );
}
```

### 6.2 Optional quota indicator

Fetch `/api/account/ai-usage` to show:

> “AI remaining today: 146”

(Implement with same Redis counter logic.)

---

## 7. Cost control measures

| Control      | Description                                           |
| ------------ | ----------------------------------------------------- |
| Daily limits | 200 (AI add-on), 300 (Lifetime)                       |
| Max tokens   | 300 output tokens per call                            |
| Rate limit   | 1 req/sec per user                                    |
| Model        | `gpt-5-mini` (cheap and fast)                        |
| Logging      | Log tokens + latency                                  |
| Cache        | Optional Redis hash to reuse identical prompts (24 h) |

At scale, this keeps costs to **under a few dollars/month per thousand users**.

---

## 8. Abuse prevention

Pair this with your anti-sharing rules:

* 2 active devices max per account
* Export and AI request rate-limits
* 2FA requirement for premium accounts
* IP anomaly detection
* Watermark PDFs with account ID + hash

Together, these make large-scale sharing uneconomical.

---

## 9. Data & privacy policy

* All AI requests go server-to-server via our API key.
* We **don’t store** user prompts longer than needed.
* Logs store: `userId`, `requestId`, `tokens`, `cost`, **no raw resume text**.
* Privacy copy:

  > “AI features are powered by a licensed model provider. Inputs are processed securely and are not used to train models.”

(OpenAI confirms API data isn’t used for training by default.)

---

## 10. QA checklist

| Test               | Expected                             |
| ------------------ | ------------------------------------ |
| Free user          | 403 on `/api/ai/rewrite`             |
| AI Add-on user     | Works up to 200/day                  |
| Lifetime user      | Works up to 300/day                  |
| Over limit         | 429 TooManyRequests                  |
| Missing auth       | 401 Unauthorized                     |
| Plan upgrade       | Entitlement updates immediately      |
| Suspicious sharing | 2FA prompt or session lock triggered |

---

## 11. Deployment steps

1. Add new `ai` module in NestJS.
2. Add `OPENAI_API_KEY` to `.env` (server only).
3. Deploy Redis for rate limits.
4. Update client (AI buttons, optional quota).
5. Update billing plans to include `hasAI`.
6. Test with small user pool (verify quotas).
7. Rollout to production.

---

## 12. Developer tips

* Never commit API keys.
* Keep all AI code in `apps/server/src/ai/` (merge-safe).
* Review monthly token usage.
* Tune temperature/max_completion_tokens for cost.
* Log model version in each request.
* Encourage code reviews on rate-limit logic.

> Developers may research “OpenAI best practices for server proxies,” “NestJS rate limiting,” and “ioredis usage patterns” for deeper optimizations.

---

## ✅ Summary (for any developer)

| Aspect            | Implementation                            |
| ----------------- | ----------------------------------------- |
| Who pays          | We do (our OpenAI API key)                |
| Access            | Premium plans only (AI add-on / Lifetime) |
| Where logic lives | `apps/server/src/ai/`                     |
| Key security      | Server-side `.env`                        |
| Rate-limit        | Redis per user/day                        |
| Output cap        | 300 tokens                                |
| Privacy           | Logs anonymized                           |
| BYOK              | Disabled                                  |

---


