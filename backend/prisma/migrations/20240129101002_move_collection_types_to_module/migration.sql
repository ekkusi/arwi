-- 1. Add the new moduleId column to the CollectionType table
ALTER TABLE "CollectionType"
ADD COLUMN "moduleId" TEXT;

-- 2. Populate moduleId based on the existing relation between Group and Module
UPDATE "CollectionType" ct
SET "moduleId" = m."id"
FROM "Group" g
JOIN "Module" m ON g."id" = m."groupId"
WHERE ct."groupId" = g."id";

-- Handle cases where there might not be a direct correspondence
-- Optional: You might want to handle cases where the groupId does not have a corresponding moduleId
-- This can involve setting a default moduleId, logging, or taking other actions depending on your business logic

-- 3. Drop the groupId column and the foreign key constraint associated with it
ALTER TABLE "CollectionType" DROP CONSTRAINT IF EXISTS "CollectionType_groupId_fkey";
ALTER TABLE "CollectionType" DROP COLUMN "groupId";

-- 4. Add the foreign key constraint to the moduleId column
ALTER TABLE "CollectionType"
ADD CONSTRAINT "CollectionType_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Convert moduleId column to NOT NULL now that all data is migrated
ALTER TABLE "CollectionType"
ALTER COLUMN "moduleId" SET NOT NULL;