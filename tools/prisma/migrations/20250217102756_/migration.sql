/*
  Warnings:

  - You are about to drop the `Section` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SectionCVMapping` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_userId_fkey";

-- DropForeignKey
ALTER TABLE "SectionCVMapping" DROP CONSTRAINT "SectionCVMapping_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "SectionCVMapping" DROP CONSTRAINT "SectionCVMapping_sectionId_fkey";

-- DropTable
DROP TABLE "Section";

-- DropTable
DROP TABLE "SectionCVMapping";

-- CreateTable
CREATE TABLE "SectionItem" (
    "id" TEXT NOT NULL,
    "format" "SectionFormat" NOT NULL,
    "userId" TEXT NOT NULL,
    "data" JSONB NOT NULL DEFAULT '{}',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SectionItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionItemCVMapping" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "SectionItemCVMapping_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SectionItem_userId_idx" ON "SectionItem"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SectionItemCVMapping_resumeId_order_key" ON "SectionItemCVMapping"("resumeId", "order");

-- AddForeignKey
ALTER TABLE "SectionItem" ADD CONSTRAINT "SectionItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionItemCVMapping" ADD CONSTRAINT "SectionItemCVMapping_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "SectionItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionItemCVMapping" ADD CONSTRAINT "SectionItemCVMapping_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
