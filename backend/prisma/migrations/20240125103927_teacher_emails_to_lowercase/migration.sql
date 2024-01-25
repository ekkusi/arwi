-- Change Teacher emails to lowercase
UPDATE "Teacher" SET "email" = LOWER("email");

-- Add constraint to ensure emails are lowercase
ALTER TABLE "Teacher"
ADD CONSTRAINT "Teacher_email_lowercase_chk"
CHECK ("email" = LOWER("email"));
