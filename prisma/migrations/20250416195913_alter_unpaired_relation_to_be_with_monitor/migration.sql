/*
  Warnings:

  - You are about to drop the column `advertisementId` on the `UnpairedMonitor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UnpairedMonitor" DROP CONSTRAINT "UnpairedMonitor_advertisementId_fkey";

-- AlterTable
ALTER TABLE "UnpairedMonitor" DROP COLUMN "advertisementId",
ADD COLUMN     "monitorId" INTEGER;

-- AddForeignKey
ALTER TABLE "UnpairedMonitor" ADD CONSTRAINT "UnpairedMonitor_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "Monitor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
