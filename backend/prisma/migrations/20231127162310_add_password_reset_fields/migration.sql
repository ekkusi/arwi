-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "passwordResetStartedAt" TIMESTAMP(3),
ADD COLUMN     "passwordResetTries" INTEGER NOT NULL DEFAULT 0;
