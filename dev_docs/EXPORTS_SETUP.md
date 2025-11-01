# Exports Setup (PDF, Word, Google Docs)

This document explains how to configure and operate the server‑side export flows:

- PDF: existing Puppeteer-based print flow
- Word (.docx): server conversion via `@turbodocx/html-to-docx`
- Google Docs: per‑user Google Drive export via OAuth (creates a native Google Doc in the owner’s Drive)

## 1) Prerequisites

- Node + pnpm per repository guidelines
- MinIO or S3‑compatible storage configured (for PDF previews/download stats)
- Headless Chrome available over WebSocket for printing (PDF path)
  - `CHROME_URL`, `CHROME_TOKEN`, and optional `CHROME_IGNORE_HTTPS_ERRORS`

## 2) Environment Variables

Set in `.env` (see `.env.example` for references):

- Core
  - `PUBLIC_URL` → e.g., `https://app.example.com` (must be public/externally reachable)
  - Storage: `STORAGE_URL`, `STORAGE_*` (per existing setup)
  - Chrome: `CHROME_URL`, `CHROME_TOKEN`, `CHROME_IGNORE_HTTPS_ERRORS`

- Google OAuth (already used for login)
  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`
  - `GOOGLE_CALLBACK_URL` (existing Google Login callback)

- Google Drive (per‑user export)
  - `GOOGLE_DRIVE_CALLBACK_URL` → e.g., `${PUBLIC_URL}/api/integrations/google-drive/callback`

Notes:
- For local dev with Vite/Nest (default): `GOOGLE_DRIVE_CALLBACK_URL=http://localhost:5173/api/integrations/google-drive/callback`
- Ensure `PUBLIC_URL` matches your externally accessible domain (and is HTTPS in production).

## 3) Google Cloud Console Setup (for per‑user Drive export)

1. Enable the “Google Drive API” in your GCP project.
2. OAuth consent screen:
   - Set up and publish in your org (or test mode with test users).
3. OAuth client (Web Application):
   - Authorized JavaScript origins: your `PUBLIC_URL` (prod) and/or `http://localhost:5173` (dev)
   - Authorized redirect URIs: add `GOOGLE_DRIVE_CALLBACK_URL`
     - Example: `http://localhost:5173/api/integrations/google-drive/callback`
4. Use the same `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` as login, or create a dedicated OAuth client. Both work.

Scopes and Token:
- The Drive strategy requests scope `https://www.googleapis.com/auth/drive.file` with `access_type=offline` and `prompt=consent`.
- This stores a refresh token per user so we can create files in their Drive without re‑prompting.

## 4) Database Migration

We store each user’s Google Drive refresh token in `Secrets`:

- New column: `googleDriveRefreshToken String?`

Run migrations locally:

```bash
pnpm prisma:migrate:dev -n add_google_drive_refresh_token
pnpm prisma:generate
```

For CI/production (depending on your flow):

```bash
pnpm prisma:migrate
```

## 5) Install Dependencies

```bash
pnpm install
```

Key packages:
- `@turbodocx/html-to-docx` (server DOCX conversion)
- `googleapis` (Drive API client)

## 6) Running Locally

```bash
pnpm dev
```

Ensure:
- MinIO/S3 is reachable via `STORAGE_URL` (previews/stats)
- Chrome WebSocket endpoint is running and reachable by the server (`CHROME_URL`/`CHROME_TOKEN`)

## 7) Features and Flows

### PDF Export (unchanged)

- Client pages: Builder toolbar / Export → PDF
- Server route: `GET /api/resume/print/:id` (streams PDF via stored URL)
- Uses Puppeteer to render each page and `pdf-lib` to merge pages

### Word (.docx) Export

- Client: Export → Word (.docx)
- Server route: `GET /api/resume/export/:id/docx` (streams a DOCX file)
- Implementation: render final HTML in Puppeteer (same as PDF) → convert to DOCX via `@turbodocx/html-to-docx` → stream to client (no storage needed)

Notes:
- DOCX is not a pixel‑perfect HTML clone, but structure and most styles carry over.
- Images are resolved by URL; ensure `STORAGE_URL` is reachable from server.

### Google Docs Export (Per‑User Drive)

- Client: Export → Google Docs
- First‑time flow:
  1. Opens a popup to `/api/integrations/google-drive/connect`
  2. User grants Drive access (`drive.file`)
  3. Refresh token is stored in `Secrets.googleDriveRefreshToken`
  4. Export retries and opens the created Google Doc in a new tab

- Server route: `GET /api/resume/export/:id/gdoc` (returns `{ url }` of the created doc)
- Only the resume owner can export to Google Docs (Two‑Factor guard is applied to the route).
- The export uploads the same final rendered HTML as a native Google Doc in the user’s Drive.

Quotas & Premium Checks:
- We reuse the same daily export quota and premium template checks as PDF export for the owner.

## 8) Production Notes

- Set `PUBLIC_URL` to your HTTPS domain; ensure the callback URL uses HTTPS and is whitelisted in the Google OAuth client.
- Pop‑up blockers: if Google Drive connect pop‑up is blocked, the UI will not be able to complete the flow; allow pop‑ups for your domain.
- If users don’t see a new refresh token on repeated consent: Google may only issue refresh tokens on the first consent. The strategy uses `prompt=consent` and `access_type=offline` to maximize issuance.

## 9) Troubleshooting

- `GoogleDriveNotConnected` error in client:
  - The user needs to connect Drive (Export → Google Docs will open the connect pop‑up automatically).
- `Only the owner can export this resume` error:
  - Google Docs export is restricted to the resume owner.
- Missing images in DOCX/Docs:
  - Verify that `STORAGE_URL` is reachable from the server; private endpoints won’t be fetchable.
- PDF export fails:
  - Ensure the `CHROME_URL`/`CHROME_TOKEN` are correct and reachable; check container networking if using Docker.

## 10) Optional Enhancements

- “Disconnect Google Drive” action: clear `googleDriveRefreshToken` for the current user in `Secrets`.
- “Anyone with link” sharing on created Docs (additional Drive API permission step) – currently not enabled by default.
- Dedicated Google OAuth client for Drive if you prefer isolating consent from login.

