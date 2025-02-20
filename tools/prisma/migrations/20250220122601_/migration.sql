-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('email', 'github', 'google', 'openid');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('public', 'private');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "picture" TEXT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'en-US',
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "provider" "Provider" NOT NULL,
    "profileResumeId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Secrets" (
    "id" TEXT NOT NULL,
    "password" TEXT,
    "lastSignedIn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verificationToken" TEXT,
    "twoFactorSecret" TEXT,
    "twoFactorBackupCodes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "refreshToken" TEXT,
    "resetToken" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Secrets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resume" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "data" JSONB NOT NULL DEFAULT '{}',
    "visibility" "Visibility" NOT NULL DEFAULT 'private',
    "locked" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Statistics" (
    "id" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "downloads" INTEGER NOT NULL DEFAULT 0,
    "resumeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Statistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "position" TEXT,
    "url" TEXT,
    "summary" TEXT,
    "date" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AwardItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT,
    "awarder" TEXT,
    "url" TEXT,
    "summary" TEXT,
    "date" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AwardItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "level" TEXT,
    "keywords" JSONB,
    "levelNum" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SkillItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "url" TEXT,
    "summary" TEXT,
    "description" TEXT,
    "keywords" JSONB,
    "date" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EducationItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "institution" TEXT,
    "area" TEXT,
    "degree" TEXT,
    "score" TEXT,
    "courses" JSONB,
    "summary" TEXT,
    "url" TEXT,
    "date" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EducationItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterestItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "keywords" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterestItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LanguageItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "level" TEXT,
    "levelNum" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LanguageItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VolunteerItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "organization" TEXT,
    "position" TEXT,
    "url" TEXT,
    "summary" TEXT,
    "date" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VolunteerItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferenceItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "summary" TEXT,
    "relationship" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReferenceItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublicationItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "publisher" TEXT,
    "url" TEXT,
    "summary" TEXT,
    "date" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PublicationItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CertificationItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "issuer" TEXT,
    "url" TEXT,
    "summary" TEXT,
    "date" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CertificationItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "network" TEXT,
    "url" TEXT,
    "username" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfileItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BasicsItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "headline" TEXT,
    "summary" JSONB,
    "birthdate" TEXT,
    "website" TEXT,
    "profiles" JSONB,
    "location" JSONB,
    "photo" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BasicsItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeProfileItemMapping" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "profileItemId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "ResumeProfileItemMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeBasicsItemMapping" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "basicsItemId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "ResumeBasicsItemMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeWorkItemMapping" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "workItemId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "ResumeWorkItemMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeAwardItemMapping" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "awardItemId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "ResumeAwardItemMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeSkillItemMapping" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "skillItemId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "ResumeSkillItemMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeProjectItemMapping" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "projectItemId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "ResumeProjectItemMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeEducationItemMapping" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "educationItemId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "ResumeEducationItemMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeInterestItemMapping" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "interestItemId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "ResumeInterestItemMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeLanguageItemMapping" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "languageItemId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "ResumeLanguageItemMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeVolunteerItemMapping" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "volunteerItemId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "ResumeVolunteerItemMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeReferenceItemMapping" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "referenceItemId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "ResumeReferenceItemMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumePublicationItemMapping" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "publicationItemId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "ResumePublicationItemMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeCertificationItemMapping" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "certificationItemId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "ResumeCertificationItemMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamsMapping" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "resumeId" TEXT,

    CONSTRAINT "TeamsMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyMapping" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "roleId" TEXT,

    CONSTRAINT "CompanyMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Secrets_resetToken_key" ON "Secrets"("resetToken");

-- CreateIndex
CREATE UNIQUE INDEX "Secrets_userId_key" ON "Secrets"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Secrets_userId_id_key" ON "Secrets"("userId", "id");

-- CreateIndex
CREATE INDEX "Resume_userId_idx" ON "Resume"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Resume_userId_id_key" ON "Resume"("userId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Resume_userId_slug_key" ON "Resume"("userId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Statistics_resumeId_key" ON "Statistics"("resumeId");

-- CreateIndex
CREATE UNIQUE INDEX "Statistics_resumeId_id_key" ON "Statistics"("resumeId", "id");

-- CreateIndex
CREATE INDEX "WorkItem_userId_idx" ON "WorkItem"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkItem_userId_id_key" ON "WorkItem"("userId", "id");

-- CreateIndex
CREATE INDEX "AwardItem_userId_idx" ON "AwardItem"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AwardItem_userId_id_key" ON "AwardItem"("userId", "id");

-- CreateIndex
CREATE INDEX "SkillItem_userId_idx" ON "SkillItem"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SkillItem_userId_id_key" ON "SkillItem"("userId", "id");

-- CreateIndex
CREATE INDEX "ProjectItem_userId_idx" ON "ProjectItem"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectItem_userId_id_key" ON "ProjectItem"("userId", "id");

-- CreateIndex
CREATE INDEX "EducationItem_userId_idx" ON "EducationItem"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "EducationItem_userId_id_key" ON "EducationItem"("userId", "id");

-- CreateIndex
CREATE INDEX "InterestItem_userId_idx" ON "InterestItem"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "InterestItem_userId_id_key" ON "InterestItem"("userId", "id");

-- CreateIndex
CREATE INDEX "LanguageItem_userId_idx" ON "LanguageItem"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "LanguageItem_userId_id_key" ON "LanguageItem"("userId", "id");

-- CreateIndex
CREATE INDEX "VolunteerItem_userId_idx" ON "VolunteerItem"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VolunteerItem_userId_id_key" ON "VolunteerItem"("userId", "id");

-- CreateIndex
CREATE INDEX "ReferenceItem_userId_idx" ON "ReferenceItem"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ReferenceItem_userId_id_key" ON "ReferenceItem"("userId", "id");

-- CreateIndex
CREATE INDEX "PublicationItem_userId_idx" ON "PublicationItem"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PublicationItem_userId_id_key" ON "PublicationItem"("userId", "id");

-- CreateIndex
CREATE INDEX "CertificationItem_userId_idx" ON "CertificationItem"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CertificationItem_userId_id_key" ON "CertificationItem"("userId", "id");

-- CreateIndex
CREATE INDEX "ProfileItem_userId_idx" ON "ProfileItem"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileItem_userId_id_key" ON "ProfileItem"("userId", "id");

-- CreateIndex
CREATE INDEX "BasicsItem_userId_idx" ON "BasicsItem"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BasicsItem_userId_id_key" ON "BasicsItem"("userId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "ResumeProfileItemMapping_resumeId_order_key" ON "ResumeProfileItemMapping"("resumeId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "ResumeBasicsItemMapping_resumeId_order_key" ON "ResumeBasicsItemMapping"("resumeId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "ResumeWorkItemMapping_resumeId_order_key" ON "ResumeWorkItemMapping"("resumeId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "ResumeAwardItemMapping_resumeId_order_key" ON "ResumeAwardItemMapping"("resumeId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "ResumeSkillItemMapping_resumeId_order_key" ON "ResumeSkillItemMapping"("resumeId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "ResumeProjectItemMapping_resumeId_order_key" ON "ResumeProjectItemMapping"("resumeId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "ResumeEducationItemMapping_resumeId_order_key" ON "ResumeEducationItemMapping"("resumeId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "ResumeInterestItemMapping_resumeId_order_key" ON "ResumeInterestItemMapping"("resumeId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "ResumeLanguageItemMapping_resumeId_order_key" ON "ResumeLanguageItemMapping"("resumeId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "ResumeVolunteerItemMapping_resumeId_order_key" ON "ResumeVolunteerItemMapping"("resumeId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "ResumeReferenceItemMapping_resumeId_order_key" ON "ResumeReferenceItemMapping"("resumeId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "ResumePublicationItemMapping_resumeId_order_key" ON "ResumePublicationItemMapping"("resumeId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "ResumeCertificationItemMapping_resumeId_order_key" ON "ResumeCertificationItemMapping"("resumeId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_userId_key" ON "Team"("name", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamsMapping_teamId_userId_key" ON "TeamsMapping"("teamId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyMapping_userId_companyId_key" ON "CompanyMapping"("userId", "companyId");

-- AddForeignKey
ALTER TABLE "Secrets" ADD CONSTRAINT "Secrets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statistics" ADD CONSTRAINT "Statistics_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkItem" ADD CONSTRAINT "WorkItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AwardItem" ADD CONSTRAINT "AwardItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillItem" ADD CONSTRAINT "SkillItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectItem" ADD CONSTRAINT "ProjectItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EducationItem" ADD CONSTRAINT "EducationItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterestItem" ADD CONSTRAINT "InterestItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LanguageItem" ADD CONSTRAINT "LanguageItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VolunteerItem" ADD CONSTRAINT "VolunteerItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferenceItem" ADD CONSTRAINT "ReferenceItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationItem" ADD CONSTRAINT "PublicationItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CertificationItem" ADD CONSTRAINT "CertificationItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileItem" ADD CONSTRAINT "ProfileItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BasicsItem" ADD CONSTRAINT "BasicsItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeProfileItemMapping" ADD CONSTRAINT "ResumeProfileItemMapping_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeProfileItemMapping" ADD CONSTRAINT "ResumeProfileItemMapping_profileItemId_fkey" FOREIGN KEY ("profileItemId") REFERENCES "ProfileItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeBasicsItemMapping" ADD CONSTRAINT "ResumeBasicsItemMapping_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeBasicsItemMapping" ADD CONSTRAINT "ResumeBasicsItemMapping_basicsItemId_fkey" FOREIGN KEY ("basicsItemId") REFERENCES "BasicsItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeWorkItemMapping" ADD CONSTRAINT "ResumeWorkItemMapping_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeWorkItemMapping" ADD CONSTRAINT "ResumeWorkItemMapping_workItemId_fkey" FOREIGN KEY ("workItemId") REFERENCES "WorkItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeAwardItemMapping" ADD CONSTRAINT "ResumeAwardItemMapping_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeAwardItemMapping" ADD CONSTRAINT "ResumeAwardItemMapping_awardItemId_fkey" FOREIGN KEY ("awardItemId") REFERENCES "AwardItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeSkillItemMapping" ADD CONSTRAINT "ResumeSkillItemMapping_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeSkillItemMapping" ADD CONSTRAINT "ResumeSkillItemMapping_skillItemId_fkey" FOREIGN KEY ("skillItemId") REFERENCES "SkillItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeProjectItemMapping" ADD CONSTRAINT "ResumeProjectItemMapping_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeProjectItemMapping" ADD CONSTRAINT "ResumeProjectItemMapping_projectItemId_fkey" FOREIGN KEY ("projectItemId") REFERENCES "ProjectItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeEducationItemMapping" ADD CONSTRAINT "ResumeEducationItemMapping_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeEducationItemMapping" ADD CONSTRAINT "ResumeEducationItemMapping_educationItemId_fkey" FOREIGN KEY ("educationItemId") REFERENCES "EducationItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeInterestItemMapping" ADD CONSTRAINT "ResumeInterestItemMapping_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeInterestItemMapping" ADD CONSTRAINT "ResumeInterestItemMapping_interestItemId_fkey" FOREIGN KEY ("interestItemId") REFERENCES "InterestItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeLanguageItemMapping" ADD CONSTRAINT "ResumeLanguageItemMapping_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeLanguageItemMapping" ADD CONSTRAINT "ResumeLanguageItemMapping_languageItemId_fkey" FOREIGN KEY ("languageItemId") REFERENCES "LanguageItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeVolunteerItemMapping" ADD CONSTRAINT "ResumeVolunteerItemMapping_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeVolunteerItemMapping" ADD CONSTRAINT "ResumeVolunteerItemMapping_volunteerItemId_fkey" FOREIGN KEY ("volunteerItemId") REFERENCES "VolunteerItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeReferenceItemMapping" ADD CONSTRAINT "ResumeReferenceItemMapping_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeReferenceItemMapping" ADD CONSTRAINT "ResumeReferenceItemMapping_referenceItemId_fkey" FOREIGN KEY ("referenceItemId") REFERENCES "ReferenceItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumePublicationItemMapping" ADD CONSTRAINT "ResumePublicationItemMapping_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumePublicationItemMapping" ADD CONSTRAINT "ResumePublicationItemMapping_publicationItemId_fkey" FOREIGN KEY ("publicationItemId") REFERENCES "PublicationItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeCertificationItemMapping" ADD CONSTRAINT "ResumeCertificationItemMapping_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeCertificationItemMapping" ADD CONSTRAINT "ResumeCertificationItemMapping_certificationItemId_fkey" FOREIGN KEY ("certificationItemId") REFERENCES "CertificationItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamsMapping" ADD CONSTRAINT "TeamsMapping_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamsMapping" ADD CONSTRAINT "TeamsMapping_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamsMapping" ADD CONSTRAINT "TeamsMapping_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyMapping" ADD CONSTRAINT "CompanyMapping_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyMapping" ADD CONSTRAINT "CompanyMapping_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyMapping" ADD CONSTRAINT "CompanyMapping_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
