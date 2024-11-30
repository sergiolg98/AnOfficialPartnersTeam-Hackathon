import { db } from "~/server/db";
import { MeetingNote, TranscriptEntry } from "../types";

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
      transcript_encoded: meeting.transcript_encoded,
      transcript_vtt: meeting.transcript_vtt ?? '',
      recording_id: meeting.recording_id,
      recording_url: meeting.recording_url,
    }
  });
  await processTranscripts(JSON.parse(meeting.transcript_encoded) as TranscriptEntry[]);
  return Response.json(response);
}


async function processSummary(summary: string, participants: string): Promise<void> {
  const participantNames = participants.split(',').map(name => name.trim());

  for (const name of participantNames) {
    const regex = new RegExp(`${name.replace(/ /g, '\\s*')}.*?(\\.|$)`, 'gi');
    const match = summary.match(regex);

    if (!match) {
      await db.developerExperienceBasedDaily.create({
        data: {
          name: name,
          short_description: 'No statement found in the summary.',
        },
      });
    } else {
      const statement = match[0].replace(new RegExp(`^${name.replace(/ /g, '\\s*')}\\s*`, 'i'), '').trim();
      await db.developerExperienceBasedDaily.create({
        data: {
          name: name,
          short_description: statement,
        },
      });
    }
  }
}

async function processTranscripts(transcripts: TranscriptEntry[]): Promise<void> {  
  const speakerMap = new Map<string, string[]>();
  for (const entry of transcripts) {
    const { speaker, text } = entry;

    if (speakerMap.has(speaker)) {
      speakerMap.get(speaker)?.push(text);
    } else {
      speakerMap.set(speaker, [text]);
    }
  }
  for (const [speaker, conversations] of speakerMap.entries()) {
    await db.developerExperienceBasedDaily.create({
      data: {
        name: speaker,
        short_description: JSON.stringify(conversations),
      },
    });
  }
}
