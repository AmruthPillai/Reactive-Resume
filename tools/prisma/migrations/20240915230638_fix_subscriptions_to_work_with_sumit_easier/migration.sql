/*
  Warnings:

  - You are about to drop the column `currentPeriodEnd` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionId` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `variantId` on the `Subscription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "currentPeriodEnd",
DROP COLUMN "subscriptionId",
DROP COLUMN "variantId",
ADD COLUMN     "isCanceled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPro" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "paymentId" TEXT;
