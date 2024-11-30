import { db } from "~/server/db";
import { MeetingNote } from "../types";

export async function POST(request: Request) {
  const meeting: MeetingNote = await request.json() as MeetingNote;
  const response: MeetingNote = await db.meetingNote.create({
    data: {
      title: meeting.title,
      participants_name: meeting.participants_name,
      participants_email: meeting.participants_email,
      recording_start_time: meeting.recording_start_time,
      recording_end_time: meeting.recording_end_time,
      recording_summary: meeting.recording_summary,
    }
  });
  return Response.json(response);
}
