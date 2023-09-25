/*
  Warnings:

  - You are about to drop the column `code` on the `ClassYear` table. All the data in the column will be lost.
  - Added the required column `educationLevel` to the `ClassYear` table without a default value. This is not possible if the table is not empty.
  - Added the required column `learningObjectiveGroupKey` to the `ClassYear` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EducationLevel" AS ENUM ('PRIMARY_FIRST', 'PRIMARY_SECOND', 'PRIMARY_THIRD', 'PRIMARY_FOURTH', 'PRIMARY_FIFTH', 'PRIMARY_SIXTH', 'PRIMARY_SEVENTH', 'PRIMARY_EIGHTH', 'PRIMARY_NINTH', 'HIGH_SCHOOL', 'VOCATIONAL');

-- AlterTable
ALTER TABLE "ClassYear" 
ADD COLUMN     "educationLevel" "EducationLevel",
ADD COLUMN     "learningObjectiveGroupKey" TEXT;

UPDATE "ClassYear" SET "educationLevel" = CASE
  WHEN "code" = 'PRIMARY_FIRST' THEN 'PRIMARY_FIRST'::"EducationLevel"
  WHEN "code" = 'PRIMARY_SECOND' THEN 'PRIMARY_SECOND'::"EducationLevel"
  WHEN "code" = 'PRIMARY_THIRD' THEN 'PRIMARY_THIRD'::"EducationLevel"
  WHEN "code" = 'PRIMARY_FOURTH' THEN 'PRIMARY_FOURTH'::"EducationLevel"
  WHEN "code" = 'PRIMARY_FIFTH' THEN 'PRIMARY_FIFTH'::"EducationLevel"
  WHEN "code" = 'PRIMARY_SIXTH' THEN 'PRIMARY_SIXTH'::"EducationLevel"
  WHEN "code" = 'PRIMARY_SEVENTH' THEN 'PRIMARY_SEVENTH'::"EducationLevel"
  WHEN "code" = 'PRIMARY_EIGHTH' THEN 'PRIMARY_EIGHTH'::"EducationLevel"
  WHEN "code" = 'PRIMARY_NINTH' THEN 'PRIMARY_NINTH'::"EducationLevel"
  WHEN "code" = 'HIGH_SCHOOL_FIRST' THEN 'HIGH_SCHOOL'::"EducationLevel"
  WHEN "code" = 'HIGH_SCHOOL_SECOND' THEN 'HIGH_SCHOOL'::"EducationLevel"
  WHEN "code" = 'HIGH_SCHOOL_THIRD' THEN 'HIGH_SCHOOL'::"EducationLevel"
  WHEN "code" = 'HIGH_SCHOOL_FOURTH' THEN 'HIGH_SCHOOL'::"EducationLevel"
  WHEN "code" = 'HIGH_SCHOOL_FIFTH' THEN 'HIGH_SCHOOL'::"EducationLevel"
  WHEN "code" = 'HIGH_SCHOOL_OTHER' THEN 'HIGH_SCHOOL'::"EducationLevel"
  WHEN "code" = 'VOCATIONAL_VOLUNTARY' THEN 'VOCATIONAL'::"EducationLevel"
  WHEN "code" = 'VOCATIONAL_OBLIGATORY' THEN 'VOCATIONAL'::"EducationLevel"
END,
"learningObjectiveGroupKey" = CASE
  WHEN "code" = 'PRIMARY_FIRST' THEN 'one_to_two_years'
  WHEN "code" = 'PRIMARY_SECOND' THEN 'one_to_two_years'
  WHEN "code" = 'PRIMARY_THIRD' THEN 'three_to_six_years'
  WHEN "code" = 'PRIMARY_FOURTH' THEN 'three_to_six_years'
  WHEN "code" = 'PRIMARY_FIFTH' THEN 'three_to_six_years'
  WHEN "code" = 'PRIMARY_SIXTH' THEN 'three_to_six_years'
  WHEN "code" = 'PRIMARY_SEVENTH' THEN 'seven_to_nine_years'
  WHEN "code" = 'PRIMARY_EIGHTH' THEN 'seven_to_nine_years'
  WHEN "code" = 'PRIMARY_NINTH' THEN 'seven_to_nine_years'
  WHEN "code" = 'HIGH_SCHOOL_FIRST' THEN 'LI_HS_MODULE_LI1'
  WHEN "code" = 'HIGH_SCHOOL_SECOND' THEN 'LI_HS_MODULE_LI2'
  WHEN "code" = 'HIGH_SCHOOL_THIRD' THEN 'LI_HS_MODULE_LI3'
  WHEN "code" = 'HIGH_SCHOOL_FOURTH' THEN 'LI_HS_MODULE_LI4'
  WHEN "code" = 'HIGH_SCHOOL_FIFTH' THEN 'LI_HS_MODULE_LI5'
  WHEN "code" = 'HIGH_SCHOOL_OTHER' THEN 'LI_HS_MODULE_LUK'
  WHEN "code" = 'VOCATIONAL_VOLUNTARY' THEN 'LI_VOC_MODULE_AMM'
  WHEN "code" = 'VOCATIONAL_OBLIGATORY' THEN 'LI_VOC_MODULE_AMM_1'
END;

ALTER TABLE "ClassYear" 
ALTER COLUMN "educationLevel" SET NOT NULL,
ALTER COLUMN "learningObjectiveGroupKey" SET NOT NULL,
DROP COLUMN "code";

-- DropEnum
DROP TYPE "ClassYearCode";
