-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "hasSeenFirstMonthlyTokenWarning" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasSeenSecondMonthlyTokenWarning" BOOLEAN NOT NULL DEFAULT false;
