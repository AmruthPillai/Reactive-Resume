-- Migrate the `Secrets` table to make the `lastSignedIn` column non-nullable
UPDATE "Secrets"
SET "lastSignedIn" = CURRENT_TIMESTAMP
WHERE "lastSignedIn" IS NULL;

-- AlterTable
ALTER TABLE "Secrets" ALTER COLUMN "lastSignedIn" SET NOT NULL,
ALTER COLUMN "lastSignedIn" SET DEFAULT CURRENT_TIMESTAMP;
