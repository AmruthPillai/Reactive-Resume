/*
  Warnings:

  - A unique constraint covering the columns `[userId,id]` on the table `Section` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Section_userId_id_key" ON "Section"("userId", "id");
