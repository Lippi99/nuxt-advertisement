-- CreateTable
CREATE TABLE "AdvertisementImage" (
    "id" SERIAL NOT NULL,
    "advertisementId" INTEGER NOT NULL,

    CONSTRAINT "AdvertisementImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AdvertisementImage" ADD CONSTRAINT "AdvertisementImage_advertisementId_fkey" FOREIGN KEY ("advertisementId") REFERENCES "Advertisement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
