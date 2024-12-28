/*
  Warnings:

  - Changed the type of `tId` on the `Driver` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Driver" DROP COLUMN "tId",
ADD COLUMN     "tId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Driver_tId_key" ON "Driver"("tId");
