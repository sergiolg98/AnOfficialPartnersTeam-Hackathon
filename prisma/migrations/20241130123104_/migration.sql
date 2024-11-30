/*
  Warnings:

  - Added the required column `recording_id` to the `MeetingNote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recording_url` to the `MeetingNote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transcript_encoded` to the `MeetingNote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transcript_vtt` to the `MeetingNote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MeetingNote" ADD COLUMN     "recording_id" TEXT NOT NULL,
ADD COLUMN     "recording_url" TEXT NOT NULL,
ADD COLUMN     "transcript_encoded" TEXT NOT NULL,
ADD COLUMN     "transcript_vtt" TEXT NOT NULL;
