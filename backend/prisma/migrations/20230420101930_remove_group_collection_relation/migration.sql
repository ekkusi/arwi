/*
  Warnings:

  - You are about to drop the column `groupId` on the `EvaluationCollection` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "EvaluationCollection" DROP CONSTRAINT "EvaluationCollection_groupId_fkey";

-- AlterTable
ALTER TABLE "EvaluationCollection" DROP COLUMN "groupId";
