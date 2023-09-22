-- Alter the foreign key constraints to be deferrable

ALTER TABLE "Group" ALTER CONSTRAINT "Group_currentModuleId_fkey" DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE "Module" ALTER CONSTRAINT "Module_groupId_fkey" DEFERRABLE INITIALLY DEFERRED;