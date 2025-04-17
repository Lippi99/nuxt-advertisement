-- CreateTable
CREATE TABLE "UnpairedMonitor" (
    "id" SERIAL NOT NULL,
    "code" UUID NOT NULL,
    "advertisementId" INTEGER,
    "paired" BOOLEAN NOT NULL,

    CONSTRAINT "UnpairedMonitor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UnpairedMonitor" ADD CONSTRAINT "UnpairedMonitor_advertisementId_fkey" FOREIGN KEY ("advertisementId") REFERENCES "Advertisement"("id") ON DELETE SET NULL ON UPDATE CASCADE;
