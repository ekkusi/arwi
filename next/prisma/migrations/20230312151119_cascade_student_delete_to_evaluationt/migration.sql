-- DropForeignKey
ALTER TABLE "Evaluation" DROP CONSTRAINT "Evaluation_studentId_fkey";

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
