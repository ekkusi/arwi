/*
  Warnings:

  - You are about to drop the column `hasStar` on the `Evaluation` table. All the data in the column will be lost.
  - You are about to drop the column `someTestField` on the `Evaluation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Evaluation" DROP COLUMN "hasStar",
DROP COLUMN "someTestField";
