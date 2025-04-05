/*
  Warnings:

  - You are about to drop the column `type` on the `Advertisement` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Advertisement` table. All the data in the column will be lost.
  - Added the required column `url` to the `AdvertisementImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Advertisement" DROP COLUMN "type",
DROP COLUMN "url";

-- AlterTable
ALTER TABLE "AdvertisementImage" ADD COLUMN     "url" TEXT NOT NULL;
