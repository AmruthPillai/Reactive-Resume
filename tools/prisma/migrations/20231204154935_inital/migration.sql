-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('email', 'github', 'google', 'linkedin');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('public', 'private');

-- CreateEnum
CREATE TYPE "PricingType" AS ENUM ('one_time', 'recurring');

-- CreateEnum
CREATE TYPE "Interval" AS ENUM ('day', 'week', 'month', 'year');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('trialing', 'active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'unpaid', 'paused');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "picture" TEXT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'en-US',
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "billingAddress" JSONB,
    "paymentMethod" JSONB,
    "provider" "Provider" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Secrets" (
    "id" TEXT NOT NULL,
    "password" TEXT,
    "lastSignedIn" TIMESTAMP(3),
    "verificationToken" TEXT,
    "twoFactorSecret" TEXT,
    "twoFactorBackupCodes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "refreshToken" TEXT,
    "resetToken" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Secrets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resume" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "data" JSONB NOT NULL DEFAULT '{}',
    "visibility" "Visibility" NOT NULL DEFAULT 'private',
    "locked" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stripeCustomerId" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "metadata" JSONB DEFAULT '{}',

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Price" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "unitAmount" INTEGER,
    "currency" VARCHAR(3) NOT NULL DEFAULT 'INR',
    "pricingType" "PricingType" NOT NULL,
    "interval" "Interval",
    "intervalCount" INTEGER DEFAULT 0,
    "trialPeriodDays" INTEGER DEFAULT 0,
    "metadata" JSONB DEFAULT '{}',

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "PaymentStatus" NOT NULL,
    "metadata" JSONB DEFAULT '{}',
    "priceId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "cancelAtPeriodEnd" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "currentPeriodStart" TIMESTAMP(3) NOT NULL,
    "currentPeriodEnd" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3),
    "cancelAt" TIMESTAMP(3),
    "canceledAt" TIMESTAMP(3),
    "trialStart" TIMESTAMP(3),
    "trialEnd" TIMESTAMP(3),

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Secrets_resetToken_key" ON "Secrets"("resetToken");

-- CreateIndex
CREATE UNIQUE INDEX "Secrets_userId_key" ON "Secrets"("userId");

-- CreateIndex
CREATE INDEX "Resume_userId_idx" ON "Resume"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Resume_userId_id_key" ON "Resume"("userId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Resume_userId_slug_key" ON "Resume"("userId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_userId_key" ON "Customer"("userId");

-- CreateIndex
CREATE INDEX "Customer_userId_idx" ON "Customer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_userId_id_key" ON "Customer"("userId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_key" ON "Subscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_priceId_key" ON "Subscription"("priceId");

-- AddForeignKey
ALTER TABLE "Secrets" ADD CONSTRAINT "Secrets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "Price"("id") ON DELETE CASCADE ON UPDATE CASCADE;
