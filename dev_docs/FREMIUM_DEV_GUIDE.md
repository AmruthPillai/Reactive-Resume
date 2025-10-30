

---

# Freemium Implementation Guide

**Product:** Reactive Resume — Kenya Edition
**Owner:** Emmanuel Chekumbe (@emcie4)
**Document purpose:** Explain the **business rationale**, the **technical plan**, and the **professional standards** for implementing a Kenya-first freemium model (templates + AI + lifetime), with Paystack (M-PESA) payments.

---

## 1) What we’re building (high level)

A localized, mobile-first resume builder for Kenya, with:

* **Free tier**: app access + 3 free templates.
* **KES 100 pack**: unlocks **10 premium templates**.
* **KES 500 AI add-on**: unlocks AI rewrite/grammar/translation.
* **KES 1,000 lifetime**: unlocks **everything forever**.

Payments via **Paystack** (M-PESA, Cards, Apple Pay). We’ll **self-host** on DigitalOcean (Droplet, Postgres, Spaces) and keep code merge-safe with the upstream Reactive-Resume repo.

---

## 2) Why (business rationale)

* Kenya’s job seekers are price-sensitive but **very mobile-money fluent**.
* Existing tools either charge in USD or aren’t localized for Kenyan CV norms.
* A **clear freemium ladder** + instant M-PESA checkout = high conversion with low infra cost.
* One-time lifetime option accelerates early revenue; we can add subscriptions later.

**Success (12 months):**

* ≥ 5,000 MAU
* ≥ 10% free → paid conversion
* Support burden low (self-serve billing page)
* Infra cost < 5% of revenue

---

## 3) Professional standards (how we’ll work)

* **Keep custom code isolated** so upstream updates don’t break us.
* **Idempotent** payments (no double granting on webhook retries).
* **Zero trust** on client amounts; verify server-side.
* **Least privilege**: server keeps secrets, client only public key.
* **Rate limit** AI to cap spend.
* **Automated tests** for critical flows (payments, entitlements, export guard).
* **Observability**: structured logs, metrics, daily reconciliation job.

Engineers are encouraged to research best practices and propose improvements that align with the design below.

---

## 4) System architecture (at a glance)

**Monorepo (fork of Reactive-Resume):**

```
apps/
  client/      ← React (Vite) UI
  server/      ← NestJS API (Prisma + Postgres)
  artboard/    ← Renderer (do not modify for paywall)
prisma/        ← DB schema + migrations
```

**Our custom modules (keep changes here):**

```
apps/server/src/payments/      ← Paystack module (controller, service)
apps/server/src/ai/            ← AI proxy (rewrite endpoint + rate limit)
apps/server/src/account/       ← Billing + entitlements endpoints
apps/server/src/resume/        ← Export guard hook-in (minimal change)
apps/client/src/features/ai/   ← AI buttons/flows
apps/client/src/features/billing/  ← Billing page (history + plan)
apps/client/src/features/payments/ ← Pricing + Checkout UI
apps/client/src/features/templates/← Gallery lock UX
apps/client/src/data/templatesMeta.ts ← Template premium map
```

Infra (prod): **DigitalOcean Droplet** (Docker Compose), **Postgres** (self-host on DO), **Spaces** (S3), **Browserless/Chromium** container, **Nginx** + Let’s Encrypt.

---

## 5) Pricing → SKUs → Entitlements

**SKUs**

* `templates10` → **KES 100** → `templatesCap = 10`
* `ai_addon` → **KES 500** → `hasAI = true`
* `lifetime` → **KES 1,000** → `plan = 'lifetime'`, `hasAI = true`, `templatesCap = 999`

**Entitlements on User**

* `plan: 'free' | 'lifetime'`
* `hasAI: boolean`
* `templatesCap: number` (default **3** on free)

**Rules**

* Lifetime implies **full unlock** (ignore other caps).
* AI usable if `hasAI === true` or `plan === 'lifetime'`.
* Premium templates require `templatesCap >= 10` (or lifetime).

---

## 6) Data model (Prisma)

`prisma/schema.prisma`

```prisma
model User {
  id           String  @id @default(cuid())
  email        String  @unique
  plan         String  @default("free") // free | lifetime
  hasAI        Boolean @default(false)
  templatesCap Int     @default(3)
  // …other fields from upstream
}

model Payment {
  id          String   @id @default(cuid())
  userId      String
  reference   String   @unique
  sku         String   // templates10 | ai_addon | lifetime
  amountKES   Int
  currency    String   @default("KES")
  status      String   // initialized | success | failed | refunded
  rawEvent    Json?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

Run:

```bash
pnpm prisma generate
pnpm prisma migrate dev -n add_freemium_entitlements
```

---

## 7) Payments (Paystack) — summary

(There’s a separate, deeper “Paystack Integration Guide”; this is the quick operational view.)

**Client:** InlineJS popup v2

* Set `currency: 'KES'`, `channels: ['card','mobile_money','bank_transfer','apple_pay']`
* Include `metadata: { sku, userId }`
* On success callback: call `GET /api/paystack/verify?reference=...`

**Server:**

* `/api/paystack/verify`: server → Paystack Verify. Trust only if `status=success`. Check amount (subunits ÷ 100).
* `/api/paystack/webhook`: validate signature (**HMAC-SHA512 of raw body** with secret). On `charge.success`, **upsert** by `reference`, update entitlements **idempotently**.

**Security:** never fulfill from client; always verify on server; webhook is the source of truth.

---

## 8) Template locking (UX + server guard)

**Template metadata (client)**
`apps/client/src/data/templatesMeta.ts` (example)

```ts
export const TEMPLATE_META = {
  classic:      { premium:false, requiredCap:1 },
  modern:       { premium:false, requiredCap:2 },
  techMinimal:  { premium:false, requiredCap:3 },
  twoColumn:    { premium:true,  requiredCap:10 },
  elegant:      { premium:true,  requiredCap:10 },
  ngosKenya:    { premium:true,  requiredCap:10 },
  pscKenya:     { premium:true,  requiredCap:10 },
  telcoPro:     { premium:true,  requiredCap:10 },
  bankingATS:   { premium:true,  requiredCap:10 },
} as const;
```

**Gallery lock (client)**

* If `entitlements.templatesCap < requiredCap` **and** not lifetime → show a translucent lock overlay with **“Unlock (KES 100)”** button → `/pricing`.

**Server guard (defense in depth)**

* Attach to create / change-template / export endpoints.
* If template is premium and user doesn’t meet cap/lifetime → **403**.

> Keep the **artboard** app unmodified; gating happens in client UI and API.

---

## 9) AI feature gating

**Server proxy** (`apps/server/src/ai/ai.controller.ts`)

* Endpoint: `POST /api/ai/rewrite`
* Guard: user must have `hasAI` or `plan='lifetime'`.
* Add **rate limit** (e.g., 200 requests/day/user via Redis or DB counter).
* Calls provider (OpenAI) **server-side** with our API key (never expose to client).

**Client**

* AI buttons disabled unless entitlement allows it.
* On click → call `/api/ai/rewrite`, update UI with response.

**Note:** If upstream shows “Bring Your Own Key,” hide it in our fork.

---

## 10) Billing & Settings (self-serve)

**Server**

* `GET /api/account/entitlements` → `{ plan, hasAI, templatesCap }`
* `GET /api/account/billing` → `{ entitlements, payments[] }`

**Client**

* `/pricing` → three cards (KES 100 / 500 / 1000) → Paystack popup.
* `/settings/billing` → plan details + payment history (date, SKU, amount, status, reference). Optional “Download receipt” (PDF) link.

---

## 11) Environment variables (prod)

```
PAYSTACK_PUBLIC_KEY=pk_live_xxx
PAYSTACK_SECRET_KEY=sk_live_xxx
PAYSTACK_BASE_URL=https://api.paystack.co

DATABASE_URL=postgresql://resume:<password>@<host>:5432/resume
S3_ENDPOINT=https://<space>.<region>.digitaloceanspaces.com
S3_BUCKET=<space>
S3_REGION=<region>
S3_ACCESS_KEY=<key>
S3_SECRET_KEY=<secret>
S3_FORCE_PATH_STYLE=false

BROWSERLESS_URL=http://browserless:3000?token=<token>
SMTP_URL=smtp://<provider-host>:<port>
MAIL_FROM="CV Kenya <noreply@cvkenya.co>"

PUBLIC_URL=https://app.cvkenya.co
STORAGE_PUBLIC_URL=https://<space>.<region>.digitaloceanspaces.com
```

---

## 12) Security checklist

* Server-side **Verify** & **Webhook** (HMAC-SHA512 on raw body).
* Unique `Payment.reference` + **upsert** for idempotency.
* Amount comparison (subunits ÷ 100 vs SKU table).
* HTTPS everywhere; CORS restrict to our origin.
* Secrets only in server env; rotate if leaked.
* Minimal PII; never store card data.
* Rate-limit **/verify**, **/webhook**, and **/api/ai/** endpoints.

---

## 13) Observability & reconciliation

* **Logs** (structured): reference, sku, amount, userId, status flow (initialized → success/failed). Redact secrets.
* **Metrics**: `payments_success_total{sku}`, `payments_failed_total`, `webhook_signature_fail_total`.
* **Daily reconciliation**: compare Paystack Transactions vs DB `Payment.success` by date.
* **Alerts**: spike in signature failures; verify failures > baseline; mismatch in reconciliation.

---

## 14) QA & acceptance criteria

**Flows to test**

1. Free user: only free templates usable; premium show lock; export free works.
2. KES 100 pack: after success, premium templates unlock; AI still locked.
3. KES 500 AI: AI enabled, rate-limit enforced; templates remain as per cap.
4. Lifetime: everything unlocked.
5. Client tampering: change price in devtools → server rejects (amount mismatch).
6. Webhook retry: duplicate events don’t double-grant.
7. Export guard: blocked for locked templates; allowed when entitled.
8. Billing page: payments list renders; references match Paystack dashboard.

**Definition of Done**

* All endpoints covered by unit tests for **verify**, **webhook signature**, **fulfillment idempotency**, **export guard**, **AI guard**.
* E2E happy-path tests for each SKU.
* Logging & metrics in place; docs readme updated.
* Staging with **test keys** green; production keys only set on final cutover.

---

## 15) Dev workflow & updates

* **Fork** the upstream repo. Keep our changes in the folders listed above.
* Add upstream as remote: `git remote add upstream <original>`
* Monthly: `git fetch upstream && git merge upstream/main` → resolve small diffs, run migrations, deploy.
* Build & push our own Docker images (never pull upstream images in prod).
* Branching: `feature/freemium-*`, `release/*` → PR → CI → staging → production.

---

## 16) Deployment (DO + Docker Compose)

* Services: `api`, `client`, `browserless`, `postgres` (or DO managed), `nginx`.
* Only 80/443 open to public; DB in private network or strict firewall.
* Let’s Encrypt certs via `certbot` or `Caddy`.
* Nightly `pg_dump` to Spaces; weekly restore test.
* Blue/green: bring up new stack on a secondary upstream, flip Nginx after smoke tests.

---

## 17) Edge cases & runbooks

* **User says “paid but locked”**: find `reference` in dashboard → run `/verify` manually or re-deliver webhook; check idempotent upsert worked.
* **Webhook 401**: confirm raw-body HMAC logic and secret; redeploy fix.
* **Refunds/chargebacks**: mark `Payment.status='refunded'` and (optionally) revoke entitlements.
* **High AI spend**: lower per-day cap, add exponential backoff on client retries, review logs.

---

## 18) Hand-off summary for any developer

* Start from **section 6 (Data model)** and **section 7 (Payments)**; wire server first.
* Implement **template locking** (section 8) and **AI gating** (section 9).
* Add **billing pages** (section 10) for transparency and support.
* Follow **security**, **observability**, and **QA** sections to reach production quality.
* Keep custom code in **isolated folders**; merge upstream monthly.

> You’re encouraged to do additional research and propose improvements—especially around testing, performance, and accessibility—so long as they preserve the contract described here.

---
