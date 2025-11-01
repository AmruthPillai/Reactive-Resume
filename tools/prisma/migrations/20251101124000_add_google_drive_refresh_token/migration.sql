-- Add per-user Google Drive refresh token for Docs export
-- Idempotent for environments where the column already exists
ALTER TABLE "Secrets" ADD COLUMN IF NOT EXISTS "googleDriveRefreshToken" TEXT;

