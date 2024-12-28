-- CreateTable
CREATE TABLE "Driver" (
    "id" SERIAL NOT NULL,
    "tId" TEXT NOT NULL,
    "state" TEXT,
    "citizenship" TEXT,
    "licenseRF" TEXT,
    "gender" TEXT,
    "age" TEXT,
    "experience" TEXT,
    "address" TEXT,
    "carModel" TEXT,
    "yearAuto" TEXT,
    "numberAuto" TEXT,
    "phone" TEXT,
    "nameFull" TEXT,
    "bornDate" TEXT,
    "autoImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Driver_tId_key" ON "Driver"("tId");
