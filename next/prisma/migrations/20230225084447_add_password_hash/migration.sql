/*
  Warnings:

  - You are about to drop the column `name` on the `Teacher` table. All the data in the column will be lost.
  - Added the required column `passwordHash` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "name",
ADD COLUMN     "passwordHash" TEXT NOT NULL;
