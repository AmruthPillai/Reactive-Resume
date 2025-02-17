/*
  Warnings:

  - The values [Basics,Profiles,Experience,Education,Skills,Languages,Awards,Certifications,Interests,Projects,Publications,Volunteering,References,Custom] on the enum `SectionFormat` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SectionFormat_new" AS ENUM ('basics', 'profiles', 'experience', 'education', 'skills', 'languages', 'awards', 'certifications', 'interests', 'projects', 'publications', 'volunteering', 'references', 'custom');
ALTER TABLE "Section" ALTER COLUMN "format" TYPE "SectionFormat_new" USING ("format"::text::"SectionFormat_new");
ALTER TYPE "SectionFormat" RENAME TO "SectionFormat_old";
ALTER TYPE "SectionFormat_new" RENAME TO "SectionFormat";
DROP TYPE "SectionFormat_old";
COMMIT;
