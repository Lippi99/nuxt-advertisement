-- DropForeignKey
ALTER TABLE "AdvertisementImage" DROP CONSTRAINT "AdvertisementImage_advertisementId_fkey";

-- AddForeignKey
ALTER TABLE "AdvertisementImage" ADD CONSTRAINT "AdvertisementImage_advertisementId_fkey" FOREIGN KEY ("advertisementId") REFERENCES "Advertisement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
