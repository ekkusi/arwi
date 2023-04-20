/*
  Warnings:

  - Added the required column `environmentCode` to the `EvaluationCollection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectCode` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EvaluationCollection" ADD COLUMN     "environmentCode" TEXT NOT NULL DEFAULT('LI_TALVI');

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "subjectCode" TEXT NOT NULL DEFAULT('LI');
