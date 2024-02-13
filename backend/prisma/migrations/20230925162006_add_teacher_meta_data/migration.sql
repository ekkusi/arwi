-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "consentsAnalytics" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "languagePrefence" TEXT NOT NULL DEFAULT 'fi_FI';
