/*
  Warnings:

  - The values [VOCATIONAL_FIRST,VOCATIONAL_SECOND,VOCATIONAL_THIRD,VOCATIONAL_FOURTH] on the enum `ClassYearCode` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ClassYearCode_new" AS ENUM ('PRIMARY_FIRST', 'PRIMARY_SECOND', 'PRIMARY_THIRD', 'PRIMARY_FOURTH', 'PRIMARY_FIFTH', 'PRIMARY_SIXTH', 'PRIMARY_SEVENTH', 'PRIMARY_EIGHTH', 'PRIMARY_NINTH', 'HIGH_SCHOOL_FIRST', 'HIGH_SCHOOL_SECOND', 'HIGH_SCHOOL_THIRD', 'HIGH_SCHOOL_FOURTH', 'HIGH_SCHOOL_FIFTH', 'HIGH_SCHOOL_OTHER', 'VOCATIONAL_OBLIGATORY', 'VOCATIONAL_VOLUNTARY');
ALTER TABLE "Group" ALTER COLUMN "currentYearCode" TYPE "ClassYearCode_new" USING CASE 
  WHEN "currentYearCode" = 'PRIMARY_FIRST' THEN 'PRIMARY_FIRST'::"ClassYearCode_new"
  When "currentYearCode" = 'PRIMARY_SECOND' THEN 'PRIMARY_SECOND'::"ClassYearCode_new"
  When "currentYearCode" = 'PRIMARY_THIRD' THEN 'PRIMARY_THIRD'::"ClassYearCode_new"
  When "currentYearCode" = 'PRIMARY_FOURTH' THEN 'PRIMARY_FOURTH'::"ClassYearCode_new"
  When "currentYearCode" = 'PRIMARY_FIFTH' THEN 'PRIMARY_FIFTH'::"ClassYearCode_new"
  When "currentYearCode" = 'PRIMARY_SIXTH' THEN 'PRIMARY_SIXTH'::"ClassYearCode_new"
  When "currentYearCode" = 'PRIMARY_SEVENTH' THEN 'PRIMARY_SEVENTH'::"ClassYearCode_new"
  When "currentYearCode" = 'PRIMARY_EIGHTH' THEN 'PRIMARY_EIGHTH'::"ClassYearCode_new"
  When "currentYearCode" = 'PRIMARY_NINTH' THEN 'PRIMARY_NINTH'::"ClassYearCode_new"
  When "currentYearCode" = 'HIGH_SCHOOL_FIRST' THEN 'HIGH_SCHOOL_FIRST'::"ClassYearCode_new"
  When "currentYearCode" = 'HIGH_SCHOOL_SECOND' THEN 'HIGH_SCHOOL_SECOND'::"ClassYearCode_new"
  When "currentYearCode" = 'HIGH_SCHOOL_THIRD' THEN 'HIGH_SCHOOL_THIRD'::"ClassYearCode_new"
  When "currentYearCode" = 'VOCATIONAL_FIRST' THEN 'VOCATIONAL_OBLIGATORY'::"ClassYearCode_new"
  When "currentYearCode" = 'VOCATIONAL_SECOND' THEN 'VOCATIONAL_OBLIGATORY'::"ClassYearCode_new"
  When "currentYearCode" = 'VOCATIONAL_THIRD' THEN 'VOCATIONAL_OBLIGATORY'::"ClassYearCode_new"
  When "currentYearCode" = 'VOCATIONAL_FOURTH' THEN 'VOCATIONAL_OBLIGATORY'::"ClassYearCode_new"
END;
ALTER TABLE "ClassYear" ALTER COLUMN "code" TYPE "ClassYearCode_new" USING CASE
  WHEN "code" = 'PRIMARY_FIRST' THEN 'PRIMARY_FIRST'::"ClassYearCode_new"
  When "code" = 'PRIMARY_SECOND' THEN 'PRIMARY_SECOND'::"ClassYearCode_new"
  When "code" = 'PRIMARY_THIRD' THEN 'PRIMARY_THIRD'::"ClassYearCode_new"
  When "code" = 'PRIMARY_FOURTH' THEN 'PRIMARY_FOURTH'::"ClassYearCode_new"
  When "code" = 'PRIMARY_FIFTH' THEN 'PRIMARY_FIFTH'::"ClassYearCode_new"
  When "code" = 'PRIMARY_SIXTH' THEN 'PRIMARY_SIXTH'::"ClassYearCode_new"
  When "code" = 'PRIMARY_SEVENTH' THEN 'PRIMARY_SEVENTH'::"ClassYearCode_new"
  When "code" = 'PRIMARY_EIGHTH' THEN 'PRIMARY_EIGHTH'::"ClassYearCode_new"
  When "code" = 'PRIMARY_NINTH' THEN 'PRIMARY_NINTH'::"ClassYearCode_new"
  When "code" = 'HIGH_SCHOOL_FIRST' THEN 'HIGH_SCHOOL_FIRST'::"ClassYearCode_new"
  When "code" = 'HIGH_SCHOOL_SECOND' THEN 'HIGH_SCHOOL_SECOND'::"ClassYearCode_new"
  When "code" = 'HIGH_SCHOOL_THIRD' THEN 'HIGH_SCHOOL_THIRD'::"ClassYearCode_new"
  When "code" = 'VOCATIONAL_FIRST' THEN 'VOCATIONAL_OBLIGATORY'::"ClassYearCode_new"
  When "code" = 'VOCATIONAL_SECOND' THEN 'VOCATIONAL_OBLIGATORY'::"ClassYearCode_new"
  When "code" = 'VOCATIONAL_THIRD' THEN 'VOCATIONAL_OBLIGATORY'::"ClassYearCode_new"
  When "code" = 'VOCATIONAL_FOURTH' THEN 'VOCATIONAL_OBLIGATORY'::"ClassYearCode_new"
END;
ALTER TYPE "ClassYearCode" RENAME TO "ClassYearCode_old";
ALTER TYPE "ClassYearCode_new" RENAME TO "ClassYearCode";
DROP TYPE "ClassYearCode_old";
COMMIT;
