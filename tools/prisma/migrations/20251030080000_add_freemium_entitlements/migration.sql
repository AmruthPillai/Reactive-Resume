-- Add freemium entitlement fields to User
ALTER TABLE "User"
  ADD COLUMN IF NOT EXISTS "plan" TEXT NOT NULL DEFAULT 'free',
  ADD COLUMN IF NOT EXISTS "hasAI" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS "templatesCap" INTEGER NOT NULL DEFAULT 3;

-- Create Payment table
CREATE TABLE IF NOT EXISTS "Payment" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "reference" TEXT NOT NULL,
  "sku" TEXT NOT NULL,
  "amountKES" INTEGER NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'KES',
  "status" TEXT NOT NULL,
  "rawEvent" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Uniqueness for reference
DO $$ BEGIN
  ALTER TABLE "Payment" ADD CONSTRAINT "Payment_reference_key" UNIQUE ("reference");
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Foreign key to User
DO $$ BEGIN
  ALTER TABLE "Payment"
    ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Update trigger to keep updatedAt current (optional; Prisma usually handles this at app level)
-- Not adding a DB trigger; Prisma @updatedAt will update via application.

