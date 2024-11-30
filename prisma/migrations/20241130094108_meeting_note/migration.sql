-- CreateEnum
CREATE TYPE "Level" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateTable
CREATE TABLE "Developer" (
    "id" SERIAL NOT NULL,
    "seniority" "Level" NOT NULL,
    "languageSkills" "Level" NOT NULL,
    "position" TEXT NOT NULL,
    "availability" INTEGER NOT NULL,

    CONSTRAINT "Developer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SoftSkill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rangeLevel" INTEGER NOT NULL,

    CONSTRAINT "SoftSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeveloperSoftSkill" (
    "developerId" INTEGER NOT NULL,
    "softSkillId" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "DeveloperSoftSkill_pkey" PRIMARY KEY ("developerId","softSkillId")
);

-- CreateTable
CREATE TABLE "TechnicalSkill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TechnicalSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeveloperTechnicalSkill" (
    "developerId" INTEGER NOT NULL,
    "technicalSkillId" INTEGER NOT NULL,
    "level" "Level" NOT NULL,

    CONSTRAINT "DeveloperTechnicalSkill_pkey" PRIMARY KEY ("developerId","technicalSkillId")
);

-- AddForeignKey
ALTER TABLE "DeveloperSoftSkill" ADD CONSTRAINT "DeveloperSoftSkill_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeveloperSoftSkill" ADD CONSTRAINT "DeveloperSoftSkill_softSkillId_fkey" FOREIGN KEY ("softSkillId") REFERENCES "SoftSkill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeveloperTechnicalSkill" ADD CONSTRAINT "DeveloperTechnicalSkill_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeveloperTechnicalSkill" ADD CONSTRAINT "DeveloperTechnicalSkill_technicalSkillId_fkey" FOREIGN KEY ("technicalSkillId") REFERENCES "TechnicalSkill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
