-- Daily Usage table for per-user quotas
CREATE TABLE IF NOT EXISTS "Usage" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "date" TIMESTAMP(3) NOT NULL,
  "prints" INTEGER NOT NULL DEFAULT 0,
  "aiCalls" INTEGER NOT NULL DEFAULT 0
);

DO $$ BEGIN
  ALTER TABLE "Usage" ADD CONSTRAINT "Usage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE UNIQUE INDEX "Usage_userId_date_key" ON "Usage" ("userId", "date");
EXCEPTION WHEN duplicate_table THEN NULL; END $$;

