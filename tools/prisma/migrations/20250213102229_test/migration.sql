-- CreateEnum
CREATE TYPE "SectionFormat" AS ENUM ('Basics', 'Profiles', 'Experience', 'Education', 'Skills', 'Languages', 'Awards', 'Certifications', 'Interests', 'Projects', 'Publications', 'Volunteering', 'References', 'Custom');

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL,
    "format" "SectionFormat" NOT NULL,
    "userId" TEXT NOT NULL,
    "data" JSONB NOT NULL DEFAULT '{}',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionCVMapping" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "SectionCVMapping_pkey" PRIMARY KEY ("id")
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
CREATE INDEX "Section_userId_idx" ON "Section"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SectionCVMapping_sectionId_key" ON "SectionCVMapping"("sectionId");

-- CreateIndex
CREATE UNIQUE INDEX "SectionCVMapping_resumeId_key" ON "SectionCVMapping"("resumeId");

-- CreateIndex
CREATE UNIQUE INDEX "SectionCVMapping_resumeId_order_key" ON "SectionCVMapping"("resumeId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_userId_key" ON "Team"("name", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamsMapping_teamId_userId_key" ON "TeamsMapping"("teamId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyMapping_userId_companyId_key" ON "CompanyMapping"("userId", "companyId");

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionCVMapping" ADD CONSTRAINT "SectionCVMapping_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionCVMapping" ADD CONSTRAINT "SectionCVMapping_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
