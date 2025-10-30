
---

# Paystack Integration Guide — Production

**Scope**
Client checkout (InlineJS v2), server verification & webhooks (NestJS), SKUs & entitlements, DigitalOcean deployment, observability, security hardening, QA and runbooks. Kenya (KES, M-PESA via `mobile_money`) supported. InlineJS reference, verify, webhooks, transaction initialize, metadata and channels are based on the latest Paystack docs. ([Paystack][1])

---

## 0) SKUs, Currency, Channels

**SKUs**

* `templates10` → **KES 100** → `templatesCap = 10`
* `ai_addon` → **KES 500** → `hasAI = true`
* `lifetime` → **KES 1,000** → `plan='lifetime'`, `hasAI=true`, `templatesCap=999`

**Currency & channels** (Kenya):

* `currency: 'KES'`
* `channels: ['card','mobile_money','bank_transfer','apple_pay']` (enables M-PESA under `mobile_money`). ([Paystack][2])

---

## 1) Data Model & Entitlements (Prisma)

```prisma
// prisma/schema.prisma
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

model User {
  id           String  @id @default(cuid())
  email        String  @unique
  plan         String  @default("free") // free | lifetime
  hasAI        Boolean @default(false)
  templatesCap Int     @default(3)
}
```

**Idempotency rule:** All fulfillment is keyed by **unique `reference`** (upsert), so webhook retries never double-credit.

---

## 2) Environment & Config

```dotenv
# Paystack
PAYSTACK_PUBLIC_KEY=pk_live_xxx
PAYSTACK_SECRET_KEY=sk_live_xxx
PAYSTACK_BASE_URL=https://api.paystack.co

# App (used for redirects / receipts)
APP_BASE_URL=https://app.cvkenya.co
```

Keep **secret key server-only**; only the public key lands in the browser. ([Paystack][2])

---

## 3) Client — InlineJS v2 (Popup)

**Install**: load via CDN or ` @paystack/inline-js` (Popup v2). ([Paystack][1])

**Popup approach (recommended for simplicity)**

* You can start the popup directly (client decides amount/metadata), but **the server still verifies** by `reference`. ([Paystack][3])

```html
<script src="https://js.paystack.co/v1/inline.js"></script>
<script>
  function pay({ sku, amountKES, email, userId }) {
    const handler = PaystackPop.setup({
      key: 'pk_live_xxx',
      email,
      amount: amountKES * 100,             // subunits
      currency: 'KES',
      channels: ['card','mobile_money','bank_transfer','apple_pay'],
      metadata: { sku, userId },           // used by webhook fulfill
      callback: function(resp) {
        fetch(`/api/paystack/verify?reference=${encodeURIComponent(resp.reference)}&userId=${userId}&sku=${sku}&amountKES=${amountKES}`, { credentials: 'include' })
          .then(() => location.reload());
      },
      onClose: function(){ /* user cancelled */ }
    });
    handler.openIframe();
  }
</script>
```

**Access-code flow (server-controlled pricing)**
Initialize on your server, return `access_code`, then call `new PaystackPop().resumeTransaction(access_code)` to open the popup with server-authoritative amount/metadata. ([Paystack][4])

---

## 4) Server — Endpoints (NestJS)

### 4.1 Verify (synchronous, after popup)

**Why:** Official guidance is to **verify on your server** using the reference from Popup/Mobile SDKs. ([Paystack][3])

```ts
// GET /api/paystack/verify?reference=REF&userId=UID&sku=templates10&amountKES=100
const res = await axios.get(
  `https://api.paystack.co/transaction/verify/${reference}`,
  { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
);
// Success when res.data.status === true && res.data.data.status === 'success'
```

* Compute paid amount: `Math.round(res.data.data.amount / 100)`.
* Compare with expected amount for SKU; if mismatch → **do not fulfill**. Amounts are **subunits**. ([Paystack][5])
* Read `metadata` (sku, userId) from response if you used it during initialize; otherwise trust query only after server-side checks. ([Paystack][6])

### 4.2 Webhook (asynchronous, source of truth)

**Security:** Validate **`x-paystack-signature`** as **HMAC-SHA512(rawBody, SECRET_KEY)** *before* trusting payload. ([Paystack][7])

* Accept `event=charge.success`, extract `reference`, `amount`, `metadata.sku`, `metadata.userId`.
* Upsert `Payment` by `reference`; switch on SKU → update `User` flags.
* Always return **200** after successful processing; Paystack retries on non-200. ([Paystack][7])

**Important:** Ensure your Nest app exposes **raw body** for this route so your HMAC matches (don’t JSON-parse first).

---

## 5) Server — Optional Initialize (access-code)

For tamper-proof pricing/metadata, initialize server-side, then let the client `resumeTransaction(access_code)`.

```ts
await axios.post(
  'https://api.paystack.co/transaction/initialize',
  {
    email: user.email,
    amount: priceKES * 100, // subunits
    currency: 'KES',
    reference: `cv_${sku}_${Date.now()}_${user.id}`,
    channels: ['card','mobile_money','bank_transfer','apple_pay'],
    metadata: { sku, userId: user.id, cancel_action: `${process.env.APP_BASE_URL}/pricing` }
  },
  { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
);
```

This endpoint supports `amount` in subunits, `channels`, and `metadata` (incl. `cancel_action`). ([Paystack][5])

---

## 6) Security Hardening (Production)

* **Never** trust client price; verify via **/verify** and **webhook**. ([Paystack][3])
* Webhook: compute signature using **raw body** (Nest `rawBody` or route-level raw middleware) and compare to header. ([Paystack][7])
* **CORS**: allow your web origin only.
* **Rate-limit** `/verify` and `/webhook` to prevent abuse.
* **Idempotency**: `Payment.reference` unique + upsert logic.
* **Secrets**: store only on server/DO; rotate if leaked.
* **PII**: store minimal fields; never store PAN or card data (Paystack handles it).
* **Allow channels**: ensure `mobile_money` appears for M-PESA. ([Paystack][2])

---

## 7) Observability & Ops

**Logging**

* Log `reference`, `sku`, `amountKES`, `userId`, and high-level status (`initialized/success/failed`).
* Redact secrets; store `rawEvent` (sanitized) for audits.

**Metrics (Prometheus labels)**

* `payments_success_total{sku=...}`, `payments_failed_total`, `webhook_verify_fail_total`.
* Latency for `/verify` and webhook handler.

**Alerts**

* Pager on: webhook signature failures spike, verify failures > baseline, mismatch between Paystack Transactions count and `Payment.success` (reconcile daily).

**Reconciliation job (daily)**

* Pull Paystack transactions list and cross-check successes with DB. (Paystack has Transactions API; Postman collection can help for manual checks.) ([Paystack][5])

---

## 8) DigitalOcean Deployment (Prod)

**Topology (single droplet, Docker Compose)**

* `client` (static built assets) served by Nginx
* `api` (Nest) behind Nginx at `/api/*`
* `browserless` (Chrome) container
* `postgres` (or DO Managed PG)
* `spaces` (S3) for files (configure S3 endpoint/keys in env)
* `smtp` provider creds

**Nginx (example, key bits)**

```nginx
# /etc/nginx/conf.d/app.conf
server {
  listen 80; server_name app.cvkenya.co;
  return 301 https://$host$request_uri;
}
server {
  listen 443 ssl http2; server_name app.cvkenya.co;
  ssl_certificate /etc/letsencrypt/live/app.cvkenya.co/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/app.cvkenya.co/privkey.pem;

  client_max_body_size 10m;

  location /api/ {
    proxy_pass http://api:3000/;  # docker service name
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }

  location / {
    root /usr/share/nginx/html;   # your built client
    try_files $uri /index.html;
  }
}
```

**Firewall**

* Allow 80/443 only publicly.
* Restrict Postgres to the private network/VPC.

**Backups**

* Nightly `pg_dump` to Spaces; weekly restore test.

---

## 9) Feature Gating in UI

* Templates gallery: lock premium items unless `templatesCap >= 10`.
* AI buttons: enabled only if `hasAI || plan==='lifetime'`.
* `/settings/billing`: show `Payment` table (date, sku, KES, status, reference), “Download receipt” (optional PDF using your templates).

---

## 10) Error Matrix & Handling

| Case                           | Symptom                      | What to do                                                  |
| ------------------------------ | ---------------------------- | ----------------------------------------------------------- |
| User closes popup              | `onClose` fired              | Show “Payment not completed”, no changes                    |
| Popup success but network drop | No `/verify` call            | Webhook will arrive—fulfill there; user can refresh         |
| Amount tampering (client)      | Verify sees different amount | Do **not** fulfill; log & show support message              |
| Webhook signature mismatch     | 401 in logs                  | Check raw body handling + secret; do **not** process        |
| Mobile money delay             | User paid but no update yet  | Poll `/verify` by `reference` after 30–60s; rely on webhook |

Docs: verify via server; webhook signature via HMAC-SHA512; mobile money channel & flow. ([Paystack][3])

---

## 11) QA Checklist (Pre-Go-Live)

1. **InlineJS** loads; popup renders with **KES** and **M-PESA** option. ([Paystack][2])
2. **Test keys** used in staging; **live keys** only in prod. ([Paystack][2])
3. Popup → returns `reference`; `/verify` **confirms success** and grants entitlements. ([Paystack][3])
4. Webhook hits `/api/paystack/webhook`; **signature validates**; idempotent upsert by `reference`. ([Paystack][7])
5. Amount math correct (subunits ×100). ([Paystack][5])
6. Payments table visible in `/settings/billing`.
7. Negative tests: wrong signature; wrong amount; duplicate webhook → no double grant.
8. Receipts (optional) generate correctly.
9. Alerts and dashboards show payment metrics.

---

## 12) Code Skeletons (NestJS)

**Module**

```ts
// apps/server/src/payments/paystack.module.ts
@Module({ imports:[HttpModule], controllers:[PaystackController], providers:[PaystackService, PrismaService] })
export class PaystackModule {}
```

**Service (verify, signature, fulfill)**

```ts
// apps/server/src/payments/paystack.service.ts
@Injectable()
export class PaystackService {
  base = process.env.PAYSTACK_BASE_URL ?? 'https://api.paystack.co';
  secret = process.env.PAYSTACK_SECRET_KEY!;

  constructor(private http: HttpService, private prisma: PrismaService) {}

  async verify(reference: string) {
    const { data } = await firstValueFrom(this.http.get(
      `${this.base}/transaction/verify/${reference}`,
      { headers: { Authorization: `Bearer ${this.secret}` } }
    ));
    return data; // check data.status && data.data.status === 'success'
  }

  verifySignature(sig: string | undefined, raw: Buffer) {
    if (!sig) throw new UnauthorizedException('No signature');
    const hash = createHmac('sha512', this.secret).update(raw).digest('hex');
    if (hash !== sig) throw new UnauthorizedException('Bad signature');
  }

  async fulfill({ reference, sku, userId, amountKES, rawEvent }: any) {
    await this.prisma.payment.upsert({
      where: { reference },
      update: { status: 'success', rawEvent },
      create: { reference, userId, sku, amountKES, currency: 'KES', status: 'success', rawEvent }
    });
    switch (sku) {
      case 'templates10': await this.prisma.user.update({ where:{id:userId}, data:{ templatesCap:10 } }); break;
      case 'lifetime':    await this.prisma.user.update({ where:{id:userId}, data:{ plan:'lifetime', hasAI:true, templatesCap:999 } }); break;
      case 'ai_addon':    await this.prisma.user.update({ where:{id:userId}, data:{ hasAI:true } }); break;
    }
  }
}
```

**Controller (verify + webhook)**

```ts
// apps/server/src/payments/paystack.controller.ts
@Controller('api/paystack')
export class PaystackController {
  constructor(private svc: PaystackService) {}

  @Get('verify')
  async verify(@Query() q: any) {
    const { reference, userId, sku, amountKES } = q;
    const v = await this.svc.verify(reference); // server -> Paystack
    if (!(v?.status && v?.data?.status === 'success')) return { ok:false };
    const paidKES = Math.round((v.data.amount || 0)/100); // subunits
    if (+amountKES && +amountKES !== paidKES) return { ok:false, reason:'amount_mismatch' };
    const meta = v.data?.metadata || {};
    await this.svc.fulfill({
      reference,
      sku: meta.sku || sku,
      userId: meta.userId || userId,
      amountKES: paidKES,
      rawEvent: { source:'verify', v }
    });
    return { ok:true };
  }

  @Post('webhook')
  @HttpCode(200)
  async webhook(@Headers('x-paystack-signature') sig: string, @Req() req: any, @Body() body: any) {
    const raw = Buffer.isBuffer(req.rawBody) ? req.rawBody : Buffer.from(JSON.stringify(body));
    this.svc.verifySignature(sig, raw);                       // HMAC-SHA512 check
    const evt = typeof body === 'string' ? JSON.parse(body) : body;
    if (evt.event === 'charge.success') {
      const ref = evt.data?.reference;
      const paidKES = Math.round((evt.data?.amount || 0) / 100);
      const meta = evt.data?.metadata || {};
      if (ref && meta.sku && meta.userId) {
        await this.svc.fulfill({
          reference: ref, sku: meta.sku, userId: meta.userId, amountKES: paidKES,
          rawEvent: { source:'webhook', evt }
        });
      }
    }
    return { received:true };
  }
}
```

**Raw body for webhook (Nest bootstrap)**

```ts
// main.ts
const app = await NestFactory.create(AppModule, { rawBody: true });
app.use('/api/paystack/webhook', bodyParser.raw({ type: '*/*' }));
app.use(bodyParser.json());
```

(InlineJS docs; verify endpoint; webhook signature; transaction initialize; mobile money channel.) ([Paystack][1])

---

## 13) Cutover Plan (Blue/Green)

1. **Staging**: Test with **test keys** + ngrok webhook, seed users, test all SKUs.
2. **Freeze**: Tag release `v1.0.0`, build images, run DB migrations.
3. **Green**: Bring up new stack behind Nginx on a **/v2** path; run smoke tests.
4. **Switch**: Flip Nginx to new upstream; monitor metrics.
5. **Rollback**: Keep previous images/compose file; `docker compose -f old.yml up -d` if needed.

---

## 14) Runbooks

**A) User paid but plan not upgraded**

* Search by email → `Payment` table for latest `reference`.
* Check Paystack Dashboard → Transactions status.
* If Paystack shows “success” but DB doesn’t:

  * Hit `/api/paystack/verify?reference=REF` (manual) OR re-deliver webhook from dashboard (if supported), OR run a small admin “reconcile by reference”.

**B) Duplicate fulfillment**

* Confirm `Payment.reference` uniqueness still enforced.
* Check logs for two different references for same user/sku; handle refunds case.

**C) Webhook 401**

* Confirm **raw body** is enabled.
* Compare your computed HMAC to `x-paystack-signature`. ([Paystack][7])

---

## 15) Documentation Pointers (for future devs)

* **InlineJS (Popup v2) features & usage**. ([Paystack][1])
* **Verify Payments** flow (server-side). ([Paystack][3])
* **Webhooks** & signature validation (HMAC-SHA512). ([Paystack][7])
* **Transactions API** (initialize, subunits, `channels`, `metadata`). ([Paystack][5])
* **Payment Channels** (ensure `mobile_money` is enabled to show M-PESA). ([Paystack][2])
* **Support article**: Mobile Money in Kenya/Ghana (user phone prompt). ([Paystack Support][8])

---

### Done.


[1]: https://paystack.com/docs/developer-tools/inlinejs/?utm_source=chatgpt.com "InlineJS | Paystack Developer Documentation"
[2]: https://paystack.com/docs/payments/payment-channels/?utm_source=chatgpt.com "Payment Channels | Paystack Developer Documentation"
[3]: https://paystack.com/docs/payments/verify-payments/?utm_source=chatgpt.com "Verify Payments | Paystack Developer Documentation"
[4]: https://paystack.com/docs/payments/accept-payments/?utm_source=chatgpt.com "Accept Payments | Paystack Developer Documentation"
[5]: https://paystack.com/docs/api/transaction/?utm_source=chatgpt.com "Transaction API | Paystack Developer Documentation"
[6]: https://paystack.com/docs/payments/metadata/?utm_source=chatgpt.com "Metadata | Paystack Developer Documentation"
[7]: https://paystack.com/docs/payments/webhooks/?utm_source=chatgpt.com "Webhooks | Paystack Developer Documentation"
[8]: https://support.paystack.com/en/articles/2128386?utm_source=chatgpt.com "Pay with Mobile Money - Paystack Support"
