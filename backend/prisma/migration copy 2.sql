/*
  Warnings:

  - Added the required column `dataType` to the `EvaluationCollection` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CollectionDataType" AS ENUM ('CLASS_PARTICIPATION', 'DEFAULT');

-- AlterTable
ALTER TABLE "Evaluation" ADD COLUMN     "generalRating" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "EvaluationCollection" ADD COLUMN     "dataType" "CollectionDataType",
ALTER COLUMN "environmentCode" DROP NOT NULL;

-- Update "dataType" to CLASS_PARTICIPATION of existing records
UPDATE "EvaluationCollection" SET "dataType" = 'CLASS_PARTICIPATION' WHERE "dataType" IS NULL;

-- Set NOT NULL on "dataType"
ALTER TABLE "EvaluationCollection" ALTER COLUMN "dataType" SET NOT NULL;
