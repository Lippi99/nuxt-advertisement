/*
  Warnings:

  - You are about to drop the column `monitorId` on the `Advertisement` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Advertisement" DROP CONSTRAINT "Advertisement_monitorId_fkey";

-- AlterTable
ALTER TABLE "Advertisement" DROP COLUMN "monitorId";

-- AlterTable
ALTER TABLE "Monitor" ADD COLUMN     "playlistId" INTEGER;

-- AddForeignKey
ALTER TABLE "Monitor" ADD CONSTRAINT "Monitor_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE SET NULL ON UPDATE CASCADE;
