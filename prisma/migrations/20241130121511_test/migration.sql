/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Developer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Developer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Developer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Developer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'PENDING', 'INACTIVE');

-- AlterTable
ALTER TABLE "Developer" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "ProjectTechnicalSkill" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "technicalSkillId" INTEGER NOT NULL,

    CONSTRAINT "ProjectTechnicalSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "projectDescription" TEXT NOT NULL,
    "positionId" INTEGER,
    "clientId" INTEGER,
    "status" "Status" NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Position" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectTechnicalSkill_projectId_technicalSkillId_key" ON "ProjectTechnicalSkill"("projectId", "technicalSkillId");

-- CreateIndex
CREATE UNIQUE INDEX "Developer_email_key" ON "Developer"("email");

-- AddForeignKey
ALTER TABLE "ProjectTechnicalSkill" ADD CONSTRAINT "ProjectTechnicalSkill_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTechnicalSkill" ADD CONSTRAINT "ProjectTechnicalSkill_technicalSkillId_fkey" FOREIGN KEY ("technicalSkillId") REFERENCES "TechnicalSkill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
