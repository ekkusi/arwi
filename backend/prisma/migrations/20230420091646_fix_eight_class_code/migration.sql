/*
  Warnings:

  - The values [PRIMARY_EIGHT] on the enum `ClassYearCode` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ClassYearCode_new" AS ENUM ('PRIMARY_FIRST', 'PRIMARY_SECOND', 'PRIMARY_THIRD', 'PRIMARY_FOURTH', 'PRIMARY_FIFTH', 'PRIMARY_SIXTH', 'PRIMARY_SEVENTH', 'PRIMARY_EIGHTH', 'PRIMARY_NINTH', 'HIGH_SCHOOL_FIRST', 'HIGH_SCHOOL_SECOND', 'HIGH_SCHOOL_THIRD', 'VOCATIONAL_FIRST', 'VOCATIONAL_SECOND', 'VOCATIONAL_THIRD', 'VOCATIONAL_FOURTH');
ALTER TABLE "Group" ALTER COLUMN "currentYearCode" TYPE "ClassYearCode_new" USING ("currentYearCode"::text::"ClassYearCode_new");
ALTER TABLE "ClassYear" ALTER COLUMN "code" TYPE "ClassYearCode_new" USING ("code"::text::"ClassYearCode_new");
ALTER TYPE "ClassYearCode" RENAME TO "ClassYearCode_old";
ALTER TYPE "ClassYearCode_new" RENAME TO "ClassYearCode";
DROP TYPE "ClassYearCode_old";
COMMIT;
