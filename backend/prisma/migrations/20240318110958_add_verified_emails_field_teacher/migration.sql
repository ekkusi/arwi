-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "verifiedEmails" TEXT[];

-- Add the "email" if not null of the exisiting "Teacher" to the "verifiedEmails" array
UPDATE "Teacher" SET "verifiedEmails" = ARRAY[email] WHERE email IS NOT NULL;

