/*
  Warnings:

  - You are about to drop the column `classId` on the `EvaluationCollection` table. All the data in the column will be lost.
  - You are about to drop the column `classId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `groupId` to the `EvaluationCollection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EvaluationCollection" DROP CONSTRAINT "EvaluationCollection_classId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_classId_fkey";

-- AlterTable
ALTER TABLE "EvaluationCollection"
RENAME COLUMN "classId" TO "groupId";

-- AlterTable
ALTER TABLE "Student"
RENAME COLUMN "classId" TO "groupId";

-- Rename Class to Group
ALTER TABLE "Class" RENAME TO "Group";
ALTER TABLE "Group" RENAME CONSTRAINT "Class_pkey" TO "Group_pkey";
ALTER TABLE "Group" RENAME CONSTRAINT "Class_teacherId_fkey" TO "Group_teacherId_fkey";

-- AddForeignKey
ALTER TABLE "EvaluationCollection" ADD CONSTRAINT "EvaluationCollection_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
