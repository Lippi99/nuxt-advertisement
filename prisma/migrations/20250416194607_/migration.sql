/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `UnpairedMonitor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UnpairedMonitor_code_key" ON "UnpairedMonitor"("code");
