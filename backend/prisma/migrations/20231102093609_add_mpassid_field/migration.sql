/*
  Warnings:

  - A unique constraint covering the columns `[mPassID]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "mPassID" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_mPassID_key" ON "Teacher"("mPassID");
