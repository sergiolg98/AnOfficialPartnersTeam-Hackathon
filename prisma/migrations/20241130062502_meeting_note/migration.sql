-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeetingNote" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "participants_email" TEXT NOT NULL,
    "participants_name" TEXT NOT NULL,
    "recording_end_time" TEXT NOT NULL,
    "recording_start_time" TEXT NOT NULL,
    "recording_summary" TEXT NOT NULL,

    CONSTRAINT "MeetingNote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Post_name_idx" ON "Post"("name");
