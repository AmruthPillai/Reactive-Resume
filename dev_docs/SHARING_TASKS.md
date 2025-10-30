---

# Anti‑Sharing Tasks (Backlog)

Status: draft • Owner: @emcie4 • Scope: Server + Client + Ops

---

## Phase 1 (Now)

1) 2FA Nudge for Paid Users
- Type: Client
- Desc: Persistent banner/toast on dashboard for paid users until 2FA enabled.
- AC: Paid user sees nudge; disappears after enabling 2FA.
- Est: 0.5–1d

2) Gate Premium Actions Behind 2FA
- Type: Server
- Desc: Require `twoFactorEnabled === true` to (a) buy Lifetime, (b) enable AI add‑on, (c) export > 5 PDFs/day.
- AC: Guard returns 403 with actionable message; happy path works.
- Est: 1–2d

3) Session Limit: Max 2 Concurrent Devices
- Type: Server + Client
- Desc: Enforce 2 active sessions per user; UI to view/revoke sessions in Settings.
- AC: Third login revokes oldest or is blocked with clear messaging; revoke button works.
- Est: 2–3d

4) Quotas: Exports and AI per Day
- Type: Server
- Desc: Per‑user counters with soft ceilings (e.g., 20 exports/day, 200 AI calls/day). On exceed: prompt 2FA or backoff.
- AC: Limits enforced; counters reset daily; step‑up path succeeds.
- Est: 1–2d

5) Risk Signals + Step‑Up
- Type: Server
- Desc: Log device IDs, IPs, geolocation (coarse). Compute simple risk score; require 2FA on high risk for next high‑value action.
- AC: Risk score persisted; step‑up trigger observable in logs/metrics.
- Est: 1–2d

6) Observability
- Type: Ops/Server
- Desc: Metrics for `risk_score`, `2fa_stepups_total`, `sessions_active`, `exports_per_user`, `ai_calls_per_user`.
- AC: Dashboard panels created; alerts on spikes.
- Est: 1d

---

## Phase 2 (Next)

7) Device Activations with Cooldown
- Type: Server + Client
- Desc: 2 device slots; allow manual “free a slot” with 30‑day cooldown per slot.
- AC: Swapping devices respects cooldown; clear UI.
- Est: 2–3d

8) Invisible PDF Watermark
- Type: Server
- Desc: Embed non‑PII identifier (hash(userId+timestamp)) into PDF bytes.
- AC: Identifier recoverable offline; no visual artifact.
- Est: 1–2d

9) Phone Verification for Paid Tiers
- Type: Server + Client
- Desc: SMS OTP and verified phone on profile; use as risk signal and for recovery.
- AC: Flow works; optional in UI; stored securely.
- Est: 2–3d

10) Mobile Money Correlation
- Type: Server
- Desc: When available, correlate Paystack MSISDN with verified phone for Lifetime purchases; raise risk on mismatch.
- AC: No hard block; risk adjusts; audits stored.
- Est: 1d

11) Risk Dashboard
- Type: Client (internal) + Server
- Desc: Admin page: top outliers by devices/day, geo jumps, throughput; account flags.
- AC: Paging, filters, and account actions.
- Est: 2–4d

---

## Phase 3 (Later)

12) Group/Team Plans
- Type: Product + Server + Client
- Desc: Multi‑seat pack (5–50 seats), seat invites, and consolidated billing.
- AC: Seats assigned, payment recorded per group, entitlements propagate.
- Est: 1–2 weeks

13) Automated Alerts & Remediation
- Type: Ops/Server
- Desc: Alert on anomalies; auto‑apply flags (`require2FAForPremium`) and notify user.
- AC: Alerts tested; flag toggles observed in logs.
- Est: 2–3d

---

## Technical Notes

- Data minimization: store coarse IP, device ID (server‑generated), city‑level geolocation.
- Be transparent: Sessions UI with revoke; clear copy for step‑up prompts.
- Don’t hard‑fail card payments; use phone/MSISDN correlation as a risk input.

