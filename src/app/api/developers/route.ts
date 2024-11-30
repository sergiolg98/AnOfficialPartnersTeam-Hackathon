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

  const nameToEmailMap = generateNameToEmailMap(meeting.participants_name, meeting.participants_email);

  await processTranscriptsWithEmail(JSON.parse(meeting.transcript_encoded) as TranscriptEntry[], nameToEmailMap);
  return Response.json(response);
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

async function processTranscriptsWithEmail(
  transcripts: TranscriptEntry[],
  nameToEmailMap: Record<string, string>,
): Promise<void> {
  const speakerMap = new Map<string, string[]>();

  for (const entry of transcripts) {
    const { speaker, text } = entry;

    const email = nameToEmailMap[speaker];

    if (!email) {
      console.warn(`No email found for speaker: ${speaker}`);
      continue; // Saltar si no hay correo asociado
    }

    // Agregar la conversación al email correspondiente
    if (speakerMap.has(email)) {
      speakerMap.get(email)?.push(text);
    } else {
      speakerMap.set(email, [text]);
    }
  }

  // Guardar los datos en la base de datos
  for (const [email, conversations] of speakerMap.entries()) {
    await db.developerExperienceBasedDaily.create({
      data: {
        name: email, // Usar el correo como identificador
        short_description: JSON.stringify(conversations), // Guardar como JSON
      },
    });
  }
}

function generateNameToEmailMap(participantsName: string, participantsEmail: string): Record<string, string> {
  const nameArray = participantsName.split(',').map(name => name.trim());
  const emailArray = participantsEmail.split(',').map(email => email.trim());

  const minLength = Math.min(nameArray.length, emailArray.length);
  const trimmedNames = nameArray.slice(0, minLength);
  const trimmedEmails = emailArray.slice(0, minLength);

  const nameToEmailMap: Record<string, string> = {};

  for (let i = 0; i < minLength; i++) {
    const name = trimmedNames[i];
    const email = trimmedEmails[i];

    if (name && email) {
      nameToEmailMap[name] = email;
    }
  }

  return nameToEmailMap;
}

