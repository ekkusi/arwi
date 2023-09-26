/*
  Warnings:

  - You are about to drop the column `languagePrefence` on the `Teacher` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "languagePrefence",
ADD COLUMN     "languagePreference" TEXT NOT NULL DEFAULT 'fi_FI';
