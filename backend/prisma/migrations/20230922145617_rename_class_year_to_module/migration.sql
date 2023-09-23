/*
  Warnings:

  - You are about to drop the column `classYearId` on the `EvaluationCollection` table. All the data in the column will be lost.
  - You are about to drop the column `currentClassYearId` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the `ClassYear` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ClassYearToStudent` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `moduleId` to the `EvaluationCollection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentModuleId` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- Rename Table
ALTER TABLE "ClassYear" RENAME TO "Module";

-- Rename Table
ALTER TABLE "_ClassYearToStudent" RENAME TO "_ModuleToStudent";

-- Rename ForeignKey Constraints
-- Note: The renaming of constraints is DBMS-specific. The following assumes PostgreSQL:
-- (If you're using a different DBMS, you may need a different approach.)

-- Rename Column and its constraints for EvaluationCollection
ALTER TABLE "EvaluationCollection" RENAME COLUMN "classYearId" TO "moduleId";

-- Rename Column and its constraints for Group
ALTER TABLE "Group" RENAME COLUMN "currentClassYearId" TO "currentModuleId";

-- Drop & Recreate ForeignKey for EvaluationCollection
ALTER TABLE "EvaluationCollection" DROP CONSTRAINT "EvaluationCollection_classYearId_fkey";
ALTER TABLE "EvaluationCollection" ADD CONSTRAINT "EvaluationCollection_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Drop & Recreate ForeignKey for Group
ALTER TABLE "Group" DROP CONSTRAINT "Group_currentClassYearId_fkey";
ALTER TABLE "Group" ADD CONSTRAINT "Group_currentModuleId_fkey" FOREIGN KEY ("currentModuleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Drop & Recreate ForeignKeys for _ModuleToStudent (previously _ClassYearToStudent)
ALTER TABLE "_ModuleToStudent" DROP CONSTRAINT "_ClassYearToStudent_A_fkey";
ALTER TABLE "_ModuleToStudent" ADD CONSTRAINT "_ModuleToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "_ModuleToStudent" DROP CONSTRAINT "_ClassYearToStudent_B_fkey";
ALTER TABLE "_ModuleToStudent" ADD CONSTRAINT "_ModuleToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "Module" RENAME CONSTRAINT "ClassYear_pkey" TO "Module_pkey";

-- RenameForeignKey
ALTER TABLE "Module" RENAME CONSTRAINT "ClassYear_groupId_fkey" TO "Module_groupId_fkey";

-- RenameIndex
ALTER INDEX "_ClassYearToStudent_AB_unique" RENAME TO "_ModuleToStudent_AB_unique";

-- RenameIndex
ALTER INDEX "_ClassYearToStudent_B_index" RENAME TO "_ModuleToStudent_B_index";