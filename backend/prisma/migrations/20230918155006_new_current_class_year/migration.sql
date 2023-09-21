/*
  Warnings:

  - Added the required column `currentClassYearId` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group" ADD COLUMN "currentClassYearId" TEXT;

UPDATE "Group" g
SET "currentClassYearId" = cy."id"
FROM "ClassYear" cy
WHERE cy."groupId" = g."id"
AND cy."code" = g."currentYearCode";

ALTER TABLE "Group" ALTER COLUMN "currentClassYearId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_currentClassYearId_fkey" FOREIGN KEY ("currentClassYearId") REFERENCES "ClassYear"("id") ON DELETE CASCADE ON UPDATE CASCADE;
