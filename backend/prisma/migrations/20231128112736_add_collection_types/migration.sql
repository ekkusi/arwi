-- CreateEnum
CREATE TYPE "CollectionTypeCategory" AS ENUM ('CLASS_PARTICIPATION', 'EXAM', 'WRITTEN_WORK', 'GROUP_WOR', 'OTHER');

-- CreateTable CollectionType
CREATE TABLE "CollectionType" (
    "id" TEXT NOT NULL,
    "category" "CollectionTypeCategory" NOT NULL,
    "name" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "groupId" TEXT NOT NULL,
    CONSTRAINT "CollectionType_pkey" PRIMARY KEY ("id")
);

-- AlterTable EvaluationCollection - Add typeId without NOT NULL constraint initially
ALTER TABLE "EvaluationCollection" ADD COLUMN "typeId" TEXT;

-- AddForeignKey for EvaluationCollection
ALTER TABLE "EvaluationCollection" ADD CONSTRAINT "EvaluationCollection_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "CollectionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey for CollectionType
ALTER TABLE "CollectionType" ADD CONSTRAINT "CollectionType_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Insert a new row in CollectionType for each row in Group
INSERT INTO "CollectionType" ("id", "category", "name", "weight", "groupId")
SELECT uuid_generate_v4(), 'CLASS_PARTICIPATION', 'Tuntityöskentely', 100, "id" FROM "Group";

-- Update EvaluationCollection with the new typeId
UPDATE "EvaluationCollection" EC
SET "typeId" = CT."id"
FROM "CollectionType" CT
WHERE EC."moduleId" IN (
    SELECT M."id" FROM "Module" M
    WHERE M."groupId" = CT."groupId"
);

-- AlterTable EvaluationCollection - Add NOT NULL constraint to typeId after it has been populated
ALTER TABLE "EvaluationCollection" ALTER COLUMN "typeId" SET NOT NULL;
