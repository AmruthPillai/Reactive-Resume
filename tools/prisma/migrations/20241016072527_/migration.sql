/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Locations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Locations_name_key" ON "Locations"("name");
