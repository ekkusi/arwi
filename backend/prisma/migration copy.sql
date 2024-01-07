/*
  Warnings:

  - You are about to drop the column `environmentCode` on the `EvaluationCollection` table. All the data in the column will be lost.
  - You are about to drop the column `learningObjectiveCodes` on the `EvaluationCollection` table. All the data in the column will be lost.
  - Added the required column `collectionDataId` to the `EvaluationCollection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collectionDataType` to the `EvaluationCollection` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CollectionDataType" AS ENUM ('CLASS_PARTICIPATION', 'DEFAULT');

-- CreateEnum
CREATE TYPE "RatingScaleType" AS ENUM ('FOUR_TO_TEN_REGULAR');

-- AlterTable
ALTER TABLE "EvaluationCollection"
ADD COLUMN     "collectionDataId" TEXT,
ADD COLUMN     "collectionDataType" "CollectionDataType";

-- CreateTable
CREATE TABLE "ClassParticipationCollectionData" (
    "id" TEXT NOT NULL,
    "learningObjectiveCodes" TEXT[],
    "environmentCode" TEXT NOT NULL,
    "tempEvalCollectionId" TEXT NOT NULL, -- This is a temporary column that will be removed after the data has been migrated to the new table "EvaluationCollectionData

    CONSTRAINT "ClassParticipationCollectionData_pkey" PRIMARY KEY ("id")
);

-- Insert data into ClassParticipationCollectionData with a reference to EvaluationCollection
INSERT INTO "ClassParticipationCollectionData" ("id", "learningObjectiveCodes", "environmentCode", "tempEvalCollectionId")
SELECT uuid_generate_v4(), "learningObjectiveCodes", "environmentCode", "id" FROM "EvaluationCollection";

-- Update EvaluationCollection to set the new collectionDataId and collectionDataType
UPDATE "EvaluationCollection"
SET "collectionDataId" = cpd."id",
    "collectionDataType" = 'CLASS_PARTICIPATION'
FROM "ClassParticipationCollectionData" cpd
WHERE "EvaluationCollection"."id" = cpd."tempEvalCollectionId";

-- CreateTable
CREATE TABLE "DefaultCollectionData" (
    "id" TEXT NOT NULL,
    "ratingScaleType" "RatingScaleType" NOT NULL,

    CONSTRAINT "DefaultCollectionData_pkey" PRIMARY KEY ("id")
);

-- Remove the temporary ID field from ClassParticipationCollectionData
ALTER TABLE "ClassParticipationCollectionData"
DROP COLUMN "tempEvalCollectionId";

-- Add NOT NULL constraints to EvaluationCollection and remove the old columns
ALTER TABLE "EvaluationCollection"
ALTER COLUMN "collectionDataId" SET NOT NULL,
ALTER COLUMN "collectionDataType" SET NOT NULL,
DROP COLUMN "learningObjectiveCodes",
DROP COLUMN "environmentCode";
