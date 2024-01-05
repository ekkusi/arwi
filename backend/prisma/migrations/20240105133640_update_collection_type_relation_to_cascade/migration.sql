-- DropForeignKey
ALTER TABLE "EvaluationCollection" DROP CONSTRAINT "EvaluationCollection_typeId_fkey";

-- AddForeignKey
ALTER TABLE "EvaluationCollection" ADD CONSTRAINT "EvaluationCollection_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "CollectionType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
