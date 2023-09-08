/*
  Warnings:

  - The `skillsRating` column on the `Evaluation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `behaviourRating` column on the `Evaluation` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- Alter ratings type to integers
ALTER TABLE "Evaluation" ALTER COLUMN "skillsRating" TYPE integer USING CASE
WHEN "skillsRating" = 'FAILED' THEN 4
WHEN "skillsRating" = 'PASSABLE' THEN 5
WHEN "skillsRating" = 'POOR' THEN 6
WHEN "skillsRating" = 'FAIR' THEN 7
WHEN "skillsRating" = 'GOOD' THEN 8
WHEN "skillsRating" = 'GREAT' THEN 9
WHEN "skillsRating" = 'GOOD' THEN 10
END;

ALTER TABLE "Evaluation" ALTER COLUMN "behaviourRating" TYPE integer USING CASE
WHEN "behaviourRating" = 'FAILED' THEN 4
WHEN "behaviourRating" = 'PASSABLE' THEN 5
WHEN "behaviourRating" = 'POOR' THEN 6
WHEN "behaviourRating" = 'FAIR' THEN 7
WHEN "behaviourRating" = 'GOOD' THEN 8
WHEN "behaviourRating" = 'GREAT' THEN 9
WHEN "behaviourRating" = 'GOOD' THEN 10
END;

-- Add rating 4-10 constraints
ALTER TABLE "Evaluation" ADD CONSTRAINT "skillsRating_between_4-10_constraint" CHECK ("skillsRating" >= 4 AND "skillsRating" <= 10);
ALTER TABLE "Evaluation" ADD CONSTRAINT "behaviourRating_between_4-10_constraint" CHECK ("behaviourRating" >= 4 AND "behaviourRating" <= 10);


-- DropEnum
DROP TYPE "Rating";
