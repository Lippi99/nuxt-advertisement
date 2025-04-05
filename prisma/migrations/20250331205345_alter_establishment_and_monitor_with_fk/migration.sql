/*
  Warnings:

  - Added the required column `establishmentId` to the `Monitor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Monitor" ADD COLUMN     "establishmentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Monitor" ADD CONSTRAINT "Monitor_establishmentId_fkey" FOREIGN KEY ("establishmentId") REFERENCES "Establishment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
