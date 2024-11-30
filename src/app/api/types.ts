/** Meeting Note Entity */
export type MeetingNote = {
  title: string,
  transcript_encoded: string,
  transcript_vtt: string,
  participants_email: string,
  participants_name: string,
  recording_end_time: string,
  recording_start_time: string,
  recording_summary: string,
  recording_id: string,
  recording_url: string,
};

/** Trascript Entity */
export type TranscriptEntry = {
  start: number,
  text: string,
  end: number,
  speaker: string,
}

/** Developer Experience based on Dailys Entity */
export type DeveloperExperienceDailyEntity = {
  id?: number,
  name: string, //@todo change by email beacuse we are currently saving an email
  short_description: string,
}
