/*
  Warnings:

  - You are about to drop the column `groupId` on the `EvaluationCollection` table. All the data in the column will be lost.
  - Added the required column `classYearId` to the `EvaluationCollection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentYearCode` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- Create uuid extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateEnum
CREATE TYPE "ClassYearCode" AS ENUM ('PRIMARY_FIRST', 'PRIMARY_SECOND', 'PRIMARY_THIRD', 'PRIMARY_FOURTH', 'PRIMARY_FIFTH', 'PRIMARY_SIXTH', 'PRIMARY_SEVENTH', 'PRIMARY_EIGHT', 'PRIMARY_NINTH', 'HIGH_SCHOOL_FIRST', 'HIGH_SCHOOL_SECOND', 'HIGH_SCHOOL_THIRD', 'VOCATIONAL_FIRST', 'VOCATIONAL_SECOND', 'VOCATIONAL_THIRD', 'VOCATIONAL_FOURTH');

-- CreateTable
CREATE TABLE "ClassYear" (
    "id" TEXT NOT NULL,
    "code" "ClassYearCode" NOT NULL,
    "groupId" TEXT NOT NULL,
    CONSTRAINT "ClassYear_pkey" PRIMARY KEY ("id")
);

-- Create ClassYear records
INSERT INTO "ClassYear" ("id", "code", "groupId")
SELECT uuid_generate_v4(), 'PRIMARY_FIRST', g.id
FROM "Group" g;

-- AlterTable add classYearId-column to EvaluationCollection
ALTER TABLE "EvaluationCollection" ADD COLUMN "classYearId" TEXT;

-- AlterTable update classYearId-column in EvaluationCollection
UPDATE "EvaluationCollection" e
SET "classYearId" = c.id
FROM "ClassYear" c
WHERE e."groupId" = c."groupId";

-- AlterTable add NOT NULL constraint to classYearId
ALTER TABLE "EvaluationCollection" ALTER COLUMN "classYearId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Group" ADD COLUMN "currentYearCode" "ClassYearCode" NOT NULL DEFAULT('PRIMARY_FIRST');

-- CreateTable
CREATE TABLE "_ClassYearToStudent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClassYearToStudent_AB_unique" ON "_ClassYearToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassYearToStudent_B_index" ON "_ClassYearToStudent"("B");

-- AddForeignKey
ALTER TABLE "ClassYear" ADD CONSTRAINT "ClassYear_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluationCollection" ADD CONSTRAINT "EvaluationCollection_classYearId_fkey" FOREIGN KEY ("classYearId") REFERENCES "ClassYear"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassYearToStudent" ADD CONSTRAINT "_ClassYearToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "ClassYear"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassYearToStudent" ADD CONSTRAINT "_ClassYearToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Insert new relations to _ClassYearToStudent 
INSERT INTO "_ClassYearToStudent" ("A", "B")
SELECT c.id, s.id
FROM "ClassYear" c
INNER JOIN "Student" s ON s."groupId" = c."groupId";
