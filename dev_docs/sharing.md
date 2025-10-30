---

# Anti‑Sharing Playbook (Freemium Protection)

Purpose: reduce credential sharing abuse while minimizing friction for legitimate users. Favor “soft friction” and step‑up security triggered by risk.

---

## Goals

- Make sharing inconvenient without harming honest users
- Protect exports/AI and revenue
- Keep ops simple and observable

## Principles

- Soft friction first: deter, don’t punish. Always allow legitimate device change or re‑login.
- Step‑up on risk: require extra verification when behavior looks abnormal.
- Measure + act: log signals, score risk, act consistently, and review outliers.

## What’s already available

- Two‑Factor Authentication (TOTP) is built‑in (Settings → Security). Leverage it to raise friction for shared accounts (no new MFA needed).
- Rate limiting exists on sensitive routes (verify/webhook/account) and can be tuned per risk.

---

## Immediate Wins (low effort, high impact)

1) 2FA nudges and gates
- Nudge all paid users (Templates10 / AI / Lifetime) with a dashboard banner until 2FA is enabled.
- Require 2FA before: buying Lifetime, enabling AI add‑on, exporting > 5 PDFs/day.
- Step‑up 2FA when risk score is high (new device/IP/country, abnormal bursts).

2) Session/device hygiene
- Limit concurrent sessions/devices to 2 per account.
- Expose “Active Sessions” in Settings (list + one‑click revoke).
- Rotate refresh tokens; on suspected reuse, revoke all sessions.

3) Quotas and rate limits
- Per‑user quotas: exports/day and AI calls/day. Soft fail → ask to enable 2FA or wait 30–60s.
- Keep burst limits on high‑value routes (export, AI, billing).

4) Risk scoring + alerts
- Track per user: distinct IPs/devices/day, geolocation jumps, failed 2FA, unusual throughput.
- Trigger “suspicious sign‑in” email and require 2FA on next high‑value action when over threshold.

---

## Kenya‑Specific Enhancements

- Phone verification (SMS OTP) for paid tiers; store verified phone number.
- When payment uses Mobile Money, correlate MSISDN from Paystack (if available) with verified phone to bind Lifetime more tightly to a person (use as a risk signal, not a hard block).

---

## Medium‑Term Hardening

- Device activations: cap to 2 active devices; allow swap every 30 days with a manual “free a slot” action.
- PDF watermarking: invisible identifier (hash of user ID + timestamp) embedded into exports to deter redistribution and support enforcement.
- Step‑up UX: unified interstitial when risk is high (“Confirm with 2FA to continue”).
- Abuse ops: daily job surfaces top outliers to an admin review queue; admin flags like `require2FAForPremium` and `suspendPremium`.

---

## Detection Heuristics (examples)

- Devices/day > 3 → increase risk.
- Geo jumps: country changes > 1/day or > 2/week → increase risk.
- Throughput: > 20 exports/day or > 200 AI calls/day → require 2FA step‑up.
- Concurrent IPs: activity from > 2 IPs at the same time → revoke oldest session and require 2FA next action.

---

## Product & Pricing Levers

- Terms of Service: personal, non‑transferable license; sharing may lead to suspension.
- Provide a “Group/Team pack” (5–50 seats) to convert likely sharing cohorts into revenue.

---

## Privacy

- Collect minimal data: coarse IP, server‑generated device ID, city‑level geolocation.
- Avoid intrusive fingerprinting. Be transparent with session visibility and revocation.

---

## Rollout (phased)

Phase 1: 2FA nudges + gates; session limit 2; export/AI quotas; risk logging + step‑up prompts.

Phase 2: device activation slots; invisible PDF watermarks; phone verification tie‑in for Mobile Money; risk dashboard.

Phase 3: group plans; admin tooling; automated alerts and remediation.

---

## Appendix: Original notes (summary)

- Track logins by device/IP; limit exports and AI; log suspicious patterns.
- Optional: 2‑device session rule.
- Don’t block real users; focus on soft friction and allow legitimate changes.
- Use 2FA prominently; require 2FA on sensitive actions; add admin flag `require2FAForPremium`.

