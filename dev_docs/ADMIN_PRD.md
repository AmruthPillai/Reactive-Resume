

---

# 🛠️ Admin Console — PRD & Implementation Guide

**Product:** Reactive Resume Kenya
**Owner:** Emmanuel Chekumbe (@emcie4)
**Audience:** Developers building the internal admin panel
**Goal:** A secure, merge-safe admin area to manage users, plans, payments, feature flags, and system health.

---

## 1) Executive Summary

We need a lightweight, secure **Admin Console** to:

* View/search users, payments, and usage.
* Change user plans/entitlements (templates cap, AI access, lifetime).
* Enforce security (force 2FA, revoke sessions, deactivate users).
* Inspect app health (DB, storage, browserless, SMTP).
* Adjust **feature flags** and **limits** without redeploys.
* Run **reconciliation** and simple **support actions** (resend reset email, re-verify a payment).

The console will live inside our existing app as a **role-gated section**. It must remain **merge-safe** and **audited**.

---

## 2) Scope & Out of Scope

**In scope**

* Read-only dashboards for users, payments, usage
* Admin actions: change plan, grant/revoke AI, set templatesCap, deactivate/reactivate user
* Security actions: force 2FA, revoke sessions, lock account
* System: feature flags, limits, health, webhook status
* Reconciliation tools: verify Paystack reference, export CSV
* Audit log for every admin action

**Out of scope (v1)**

* Multi-tenant super-admin across multiple deployments
* Complex RBAC hierarchies (we’ll start with `admin` boolean)
* Full refund flow in-app (we’ll still do refunds in Paystack dashboard; we can mark “refunded” in our DB)

---

## 3) Roles & Access

* `admin = true` (on `User`) → can access `/admin/*`.
* All `/admin/*` APIs require **JWT** + **server check** that `user.admin === true`.
* Optional: **step-up auth**—if admin performs sensitive actions (change plan, deactivate user), require active **2FA**.

---

## 4) Navigation & Features (UI)

**Location:** `apps/client/src/features/admin/`

Sidebar sections:

1. **Overview**

   * Totals: Users, Paid users, Lifetime, AI-enabled
   * Payments last 7/30 days (KES)
   * AI usage and export counts (sparklines)
2. **Users**

   * Search by email, filter by plan, sort by signup date
   * Table columns: Email, Plan, TemplatesCap, AI, Status (active/locked), Last login, Sessions (count), CreatedAt
   * Row actions: **View**, **Change Plan**, **Grant/Revoke AI**, **Adjust TemplatesCap**, **Force 2FA**, **Revoke All Sessions**, **Deactivate/Reactivate**, **Send Reset Email**
3. **Payments**

   * Search by reference/email, filter by sku/status
   * Row actions: **Verify with Paystack**, mark **Refunded** (manual), **Export CSV**
4. **Settings** (Feature Flags & Limits)

   * `require2FAForPremium` (bool)
   * `maxDevicesPerUser` (int, default 2)
   * `aiDailyLimitAddon` (default 200), `aiDailyLimitLifetime` (300)
   * `exportDailyLimit*` (per plan)
   * Toggle **template set availability** (enable/disable certain premium templates)
5. **Health**

   * DB status (readiness query)
   * Browserless status (ping /token)
   * Storage (Spaces) signed URL test, bucket ACL check
   * SMTP test (send to admin email)
   * Webhook recent deliveries (status code counts)
6. **Audit Log**

   * Chronological list of admin actions: who, what, when, target, before/after snapshot
   * Filter by admin user, action type, target email

---

## 5) Data Model Additions (Prisma)

```prisma
model User {
  id           String  @id @default(cuid())
  email        String  @unique
  plan         String  @default("free")   // free | lifetime
  hasAI        Boolean @default(false)
  templatesCap Int     @default(3)
  admin        Boolean @default(false)    // NEW
  active       Boolean @default(true)     // NEW (deactivate/reactivate)
  // ... lastLoginAt, twoFactorEnabled (already exists upstream if present)
}

model Payment {
  id          String   @id @default(cuid())
  userId      String
  reference   String   @unique
  sku         String
  amountKES   Int
  currency    String   @default("KES")
  status      String   // initialized | success | failed | refunded
  rawEvent    Json?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model AdminAudit {
  id        String   @id @default(cuid())
  adminId   String
  action    String   // e.g., 'CHANGE_PLAN', 'GRANT_AI', 'REVOKE_SESSIONS'
  targetId  String?  // userId or paymentId affected
  meta      Json?    // before/after snapshot or custom payload
  createdAt DateTime @default(now())
}

// optional: persist feature flags centrally
model AppSetting {
  key   String @id
  value Json
  // sample keys: 'require2FAForPremium', 'maxDevicesPerUser', 'aiDailyLimitAddon'
}
```

Run:

```bash
pnpm prisma generate
pnpm prisma migrate dev -n add_admin_console
```

---

## 6) Backend — Modules & Endpoints (NestJS)

**Module layout:** `apps/server/src/admin/`

* `admin.module.ts` (imports + providers)
* `admin.controller.ts` (REST endpoints)
* `admin.service.ts` (business logic)
* Use an **AdminGuard** that checks `req.user.admin === true`; combine with AuthGuard
* Use an **AuditService** to write `AdminAudit` for every action

### 6.1 Users

```
GET    /api/admin/users?query=&plan=&active=&page=&limit=
GET    /api/admin/users/:id
PATCH  /api/admin/users/:id/plan             { plan: "free"|"lifetime" }
PATCH  /api/admin/users/:id/ai               { hasAI: boolean }
PATCH  /api/admin/users/:id/templates-cap    { templatesCap: number }
POST   /api/admin/users/:id/revoke-sessions
POST   /api/admin/users/:id/force-2fa        { required: boolean } // set flag requiring 2FA to use premium
PATCH  /api/admin/users/:id/status           { active: boolean }
POST   /api/admin/users/:id/send-reset-email
```

### 6.2 Payments

```
GET    /api/admin/payments?query=&sku=&status=&page=&limit=
POST   /api/admin/payments/:reference/verify          // calls Paystack verify; updates Payment + entitlements if needed
PATCH  /api/admin/payments/:reference/mark-refunded   // manual bookkeeping (we still process refund in Paystack dashboard)
GET    /api/admin/payments/export.csv                 // CSV export (date range filters via query)
```

### 6.3 Settings (Feature Flags & Limits)

```
GET    /api/admin/settings
PATCH  /api/admin/settings   { key: value }   // only allow known keys; validate types
```

### 6.4 Health

```
GET /api/admin/health
// returns { dbOk, browserlessOk, smtpOk, spacesOk, webhooks:{last24h:{success,fail}} }
```

### 6.5 Audit Log

```
GET /api/admin/audit?adminId=&action=&targetId=&page=&limit=
```

**All endpoints:**

* Require `AuthGuard` + `AdminGuard`
* Log the request (adminId, action) to `AdminAudit`
* Return **200** with JSON; for write actions, include updated resource

---

## 7) Frontend — Pages & Components (React + Tailwind/shadcn)

Path: `apps/client/src/features/admin/`

* `/admin` → Overview dashboard
* `/admin/users` → Users table + search + filters
* `/admin/users/:id` → User detail + actions panel
* `/admin/payments` → Payments table + verify/mark refunded + export
* `/admin/settings` → Toggles/inputs with Save
* `/admin/health` → Status cards + “Run Test” buttons
* `/admin/audit` → Audit table with filters

**Re-usable UI**

* `AdminCard`, `AdminTable`, `ConfirmDialog`, `CopyToClipboard`, `Tag` (status badges)

**Quick Actions (User detail)**

* Change plan (dropdown) → confirm dialog
* Toggle AI → confirm
* Set templatesCap (number input) → save
* Force 2FA (toggle) → save
* Revoke all sessions (button) → confirm
* Deactivate/Reactivate (button) → confirm
* Send password reset (button) → confirm

---

## 8) Security & Compliance

* All `/admin/*` requires **JWT auth**, **AdminGuard**, **CSRF** (if applicable), **CORS restricted** to your domain.
* **Audit every admin action** with before/after meta.
* For sensitive actions, require **step-up** (if 2FA exists, check a fresh TOTP window or confirm password).
* Enforce **rate limits** and **IP allowlist** for admin routes if possible (e.g., only from office IPs/VPN in future).
* Do not expose raw PII beyond what’s necessary (mask emails/phones in lists; full details only on user detail page).

---

## 9) Reconciliation & Support Workflows

**A. “Paid but not upgraded”**

* Search payment by `reference` or user email
* Click **Verify with Paystack** → endpoint calls Paystack `/transaction/verify/:ref`
* If success, system upserts `Payment` and applies SKU entitlements
* Log action to `AdminAudit`

**B. Refund case**

* Perform refund in Paystack dashboard
* Mark `Payment.status = refunded` in admin → optionally revoke entitlements (manual confirm)

**C. Stuck accounts / abuse**

* Revoke sessions (logout everywhere)
* Toggle `active=false` to lock account
* Force 2FA
* Lower daily AI/export limits (if you expose per-user overrides, optional)

---

## 10) Performance & Pagination

* All tables must be **server-paginated** (`page`, `limit`, `total` returned).
* Use indexed filters in queries (email, createdAt, plan).
* Export CSV should stream (for large sets) or enforce max range.

---

## 11) Observability

* Log **adminId, action, target, status** for all admin endpoints.
* Metrics:

  * `admin_actions_total{action}`
  * `admin_verify_reference_total{status}`
  * `admin_user_changes_total{type}`
* Alert if verify failures spike (could indicate Paystack/API issue).

---

## 12) QA Checklist

* Admin routes blocked for non-admin users (401/403).
* Every admin write creates an **AdminAudit** entry with correct meta.
* Changing plan/AI/templatesCap immediately reflects in user experience.
* Verify reference updates `Payment` and entitlements idempotently.
* Settings changes take effect without redeploy (read from `AppSetting` table).
* Health checks report accurate statuses; SMTP test email arrives.
* CSV export works and respects filters.
* Pagination, sorting, filtering stable on users/payments lists.

---

## 13) Rollout Plan

1. Migrate DB (add `admin`, `active`, `AdminAudit`, `AppSetting`).
2. Implement AdminGuard + base pages (Overview, Users) → test.
3. Add Payments page + verify flow.
4. Add Settings with a few key flags; wire through application reads.
5. Add Health page + simple tests.
6. Harden security (2FA step-up for sensitive actions).
7. Stage → smoke test → production.

---

## 14) Developer Notes

* Keep **all admin code isolated** in `/features/admin` (client) and `/admin` (server) to stay merge-safe with upstream.
* Use existing UI kit (shadcn/ui) for consistent look & feel.
* Prefer **small, composable components** and **typed API clients**.
* Document every new setting key with description and default in a README inside `admin/`.
* Add **seed script** to make first user an admin in dev/staging.

---

## 15) Example: Auditing Middleware (server sketch)

```ts
// apps/server/src/admin/audit.service.ts
@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}
  async write(adminId: string, action: string, targetId?: string, meta?: any) {
    await this.prisma.adminAudit.create({ data: { adminId, action, targetId, meta }});
  }
}
```

Use in controllers after successful mutations:

```ts
await this.audit.write(req.user.id, 'CHANGE_PLAN', userId, { from: oldPlan, to: newPlan });
```

---

## 16) Example: Settings Service (server sketch)

```ts
@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}
  async get<T = any>(key: string, fallback: T): Promise<T> {
    const row = await this.prisma.appSetting.findUnique({ where: { key }});
    return (row?.value as T) ?? fallback;
  }
  async set(key: string, value: any) {
    await this.prisma.appSetting.upsert({
      where: { key }, update: { value }, create: { key, value }
    });
  }
}
```

Application reads (e.g., AI rate limit guard) should consult this service to honor admin changes at runtime.

---

## 17) Future Enhancements

* Fine-grained RBAC (e.g., `support`, `analyst`, `superadmin`)
* Org/University accounts (bulk licenses & dashboards)
* Webhook delivery viewer (per-event replay)
* Session/IP explorer and automated anomaly rules
* One-click “comp lifetime” grant with reason codes

---

## ✅ TL;DR for devs

* Build `/admin` as a secure, audited console.
* Core tabs: Overview, Users, Payments, Settings, Health, Audit.
* Keep everything **merge-safe** and **role-gated**.
* Record **every admin change** to `AdminAudit`.
* Provide **reconciliation tools** and **feature flags** for agile ops.

---


