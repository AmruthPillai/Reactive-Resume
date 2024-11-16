-- AlterEnum
ALTER TYPE "Provider" ADD VALUE 'linkedin';

-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "lockedPremium" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "nextBillingDate" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "OnboardingLinkedin" (
    "id" TEXT NOT NULL,
    "linkedinUrl" TEXT NOT NULL,
    "jobDescription" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OnboardingLinkedin_pkey" PRIMARY KEY ("id")
);
