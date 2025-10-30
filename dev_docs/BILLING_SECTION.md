
---

# 🧾 Billing Section Implementation Guide

**Module:** User Account → Billing & Subscription
**Product:** Reactive Resume Kenya (Freemium Version)
**Owner:** Emmanuel Chekumbe (@emcie4)
**Audience:** Frontend & Backend developers working on the user dashboard

---

## 1. Purpose

The Billing section allows users to:

1. View their **current plan and entitlements** (Free, Templates Pack, AI Add-on, or Lifetime).
2. See **past payments** (date, SKU, amount, status, reference).
3. Access **upgrade options** directly (Paystack popup buttons).
4. (Optional) Download **receipts** for payments.
5. Contact support in case of billing issues.

This ensures transparency, self-service, and trust — users can confirm what they’ve paid for, without needing admin help.

---

## 2. Where this fits (UI placement)

This feature will be **added to the existing “Account / Settings” page** — not as a separate dashboard.

**Navigation:**

```
Settings
 ├── Profile
 ├── Security
 ├── Billing   ← New Section (we’re adding this)
```

If the upstream UI doesn’t have multi-tab settings yet, add a small sidebar or tab component so “Billing” appears next to Profile/Security.

> ✅ **Decision:** Extend the existing “Account” page, not replace it.
> We’ll add a **new “Billing” tab/section** under `apps/client/src/features/account/`.

---

## 3. Feature Overview

| Feature            | Description                                                      |
| ------------------ | ---------------------------------------------------------------- |
| Current Plan       | Show user’s plan, template cap, and AI status.                   |
| Payment History    | List of all successful/failed payments with Paystack references. |
| Upgrade Buttons    | Paystack popups for each SKU (KES 100 / 500 / 1000).             |
| Receipt (Optional) | Generate simple PDF receipt for each payment.                    |
| Support Link       | Button to email or WhatsApp admin for payment issues.            |

---

## 4. Backend design

### 4.1 Endpoints (NestJS)

**1️⃣ `/api/account/entitlements`**
Returns basic plan info:

```json
{
  "plan": "free",
  "templatesCap": 3,
  "hasAI": false
}
```

**2️⃣ `/api/account/billing`**
Returns full info for the Billing page:

```json
{
  "entitlements": {
    "plan": "ai_addon",
    "templatesCap": 10,
    "hasAI": true
  },
  "payments": [
    {
      "sku": "ai_addon",
      "amountKES": 500,
      "status": "success",
      "reference": "CV_AI_1699877332918",
      "createdAt": "2025-10-28T09:33:12.000Z"
    },
    {
      "sku": "templates10",
      "amountKES": 100,
      "status": "success",
      "reference": "CV_T10_1699877341822",
      "createdAt": "2025-09-05T09:11:45.000Z"
    }
  ]
}
```

**3️⃣ (Optional)** `/api/account/receipt/:reference`
Generates a small PDF receipt (using `reportlab` or `pdfkit`) for download.

---

### 4.2 Backend logic (NestJS controller)

`apps/server/src/account/account.controller.ts`

```ts
@Get('billing')
@UseGuards(AuthGuard)
async billing(@Req() req) {
  const [entitlements, payments] = await Promise.all([
    this.prisma.user.findUnique({
      where: { id: req.user.id },
      select: { plan: true, hasAI: true, templatesCap: true }
    }),
    this.prisma.payment.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      take: 50
    })
  ]);
  return { entitlements, payments };
}
```

---

## 5. Frontend design

### 5.1 Path & structure

Add a new page:
`apps/client/src/features/billing/BillingPage.tsx`

If settings already exist, import this into `SettingsTabs` as one of the routes.

### 5.2 Component layout (React + Tailwind)

```tsx
import { useEffect, useState } from "react";

export default function BillingPage() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/api/account/billing", { credentials: "include" })
      .then((res) => res.json())
      .then(setData);
  }, []);
  if (!data) return <p>Loading billing info...</p>;

  const { entitlements, payments } = data;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <section className="border rounded-xl p-4 bg-white shadow-sm">
        <h2 className="text-xl font-bold mb-2">Current Plan</h2>
        <p>
          <strong>Plan:</strong> {entitlements.plan}
        </p>
        <p>
          <strong>Templates:</strong> {entitlements.templatesCap}
        </p>
        <p>
          <strong>AI Access:</strong>{" "}
          {entitlements.hasAI ? "Enabled" : "Not enabled"}
        </p>
      </section>

      <section className="border rounded-xl p-4 bg-white shadow-sm">
        <h2 className="text-xl font-bold mb-2">Payment History</h2>
        {payments.length === 0 ? (
          <p>No payments yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left p-2">Date</th>
                <th>SKU</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Reference</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.reference}>
                  <td className="p-2">{new Date(p.createdAt).toLocaleString()}</td>
                  <td>{p.sku}</td>
                  <td>KES {p.amountKES}</td>
                  <td>{p.status}</td>
                  <td className="font-mono text-xs">{p.reference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="border rounded-xl p-4 bg-white shadow-sm">
        <h2 className="text-xl font-bold mb-2">Upgrade Options</h2>
        <div className="flex gap-4">
          <button onClick={() => pay("templates10", 100)} className="btn btn-outline">
            10 Templates — KES 100
          </button>
          <button onClick={() => pay("ai_addon", 500)} className="btn btn-outline">
            AI Add-on — KES 500
          </button>
          <button onClick={() => pay("lifetime", 1000)} className="btn btn-primary">
            Lifetime Access — KES 1,000
          </button>
        </div>
      </section>
    </div>
  );
}
```

*(The `pay()` function triggers your Paystack popup; reuse your earlier implementation.)*

---

## 6. Optional: Receipts

Add a “Download receipt” button next to each payment.

* Backend generates a one-page PDF:

  * Logo + “CV Kenya” header
  * Payment info (SKU, KES, reference, date)
  * Footer with “Generated automatically – not a tax invoice”

---

## 7. UX & copywriting

* **Tone:** friendly, clear, no jargon.
* **Example header:**
  “Upgrade your experience — affordable, one-time plans for Kenyan job seekers.”
* Add trust elements:

  * ✅ “Powered by Paystack (M-PESA, Card, Apple Pay)”
  * 🔒 “Secure payment processing”

---

## 8. Security and data

* Only the **authenticated user** can view their billing page.
* Never expose other users’ payments.
* Amounts and statuses come from **verified Paystack data** (not the popup).
* The table should show even failed payments (useful for support).

---

## 9. Rollout plan

1. Add backend endpoints (entitlements, billing, optional receipt).
2. Build Billing UI page.
3. Integrate Paystack popups for upgrade buttons.
4. QA:

   * Logged-in user only.
   * Correct entitlements after payment.
   * Payment history matches Paystack dashboard.
   * Works on mobile.
5. Merge into staging → deploy to production.

---

## 10. For developers (best practices)

* Keep this module self-contained — don’t mix payment logic into unrelated controllers.
* Write small tests:

  * `/api/account/billing` returns current user’s data.
  * Access control (403 if unauthenticated).
* Research: look at Stripe / LemonSqueezy / Supabase billing UIs for UX inspiration.
* Follow DRY (don’t repeat yourself): use shared components from `shadcn/ui` or `Card` components.
* Document all changes in the README for the `account` module.

---

## ✅ Summary (for any new developer)

| Goal                  | Implementation                          |
| --------------------- | --------------------------------------- |
| Show user plan        | `/api/account/entitlements`             |
| Show payment history  | `/api/account/billing`                  |
| Paystack checkout     | InlineJS popup per SKU                  |
| Self-service upgrades | Buttons on Billing page                 |
| Receipts              | Optional `/receipt/:reference` endpoint |
| Integration type      | Add new section in Settings             |
| Auth                  | Required (JWT/session guard)            |

---

