/*
  Warnings:

  - You are about to drop the column `advertisementId` on the `Playlist` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Playlist" DROP CONSTRAINT "Playlist_advertisementId_fkey";

-- AlterTable
ALTER TABLE "Advertisement" ADD COLUMN     "playlistId" INTEGER;

-- AlterTable
ALTER TABLE "Playlist" DROP COLUMN "advertisementId";

-- AddForeignKey
ALTER TABLE "Advertisement" ADD CONSTRAINT "Advertisement_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE SET NULL ON UPDATE CASCADE;
