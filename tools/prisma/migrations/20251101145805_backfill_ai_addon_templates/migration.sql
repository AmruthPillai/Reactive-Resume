-- Backfill templatesCap for users who purchased ai_addon package
-- These users should have both hasAI=true AND templatesCap=10

-- Update users who have purchased ai_addon (KES 500 package)
-- and currently have hasAI=true but templatesCap < 10
UPDATE "User"
SET "templatesCap" = 10
WHERE "id" IN (
  SELECT DISTINCT "userId"
  FROM "Payment"
  WHERE "sku" = 'ai_addon'
    AND "status" = 'success'
)
AND "hasAI" = true
AND "templatesCap" < 10;
