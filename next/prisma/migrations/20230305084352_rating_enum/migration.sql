/*
  Warnings:

  - The `skillsRating` column on the `Evaluation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `behaviourRating` column on the `Evaluation` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Rating" AS ENUM ('POOR', 'FAIR', 'GOOD', 'EXCELLENT');

-- AlterTable
ALTER TABLE "Evaluation" DROP COLUMN "skillsRating",
ADD COLUMN     "skillsRating" "Rating",
DROP COLUMN "behaviourRating",
ADD COLUMN     "behaviourRating" "Rating";
