-- AlterTable
ALTER TABLE "Evaluation" ADD COLUMN     "generalRating" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "EvaluationCollection" ALTER COLUMN "environmentCode" DROP NOT NULL;
