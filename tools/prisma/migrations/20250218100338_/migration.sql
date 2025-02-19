/*
  Warnings:

  - A unique constraint covering the columns `[profileResumeId,id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileResumeId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_profileResumeId_id_key" ON "User"("profileResumeId", "id");
