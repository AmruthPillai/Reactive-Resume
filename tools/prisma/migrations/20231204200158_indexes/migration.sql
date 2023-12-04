-- DropIndex
DROP INDEX "Customer_id_idx";

-- CreateIndex
CREATE INDEX "Customer_stripeCustomerId_idx" ON "Customer"("stripeCustomerId");

-- CreateIndex
CREATE INDEX "Subscription_userId_idx" ON "Subscription"("userId");
