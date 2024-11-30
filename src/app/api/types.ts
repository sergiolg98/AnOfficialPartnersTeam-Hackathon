export type MeetingNote = {
  title: string,
  transcript_encoded: string,
  transcript_vtt?: string,
  participants_email: string,
  participants_name: string,
  recording_end_time: string,
  recording_start_time: string,
  recording_summary: string,
  recording_id: string,
  recording_url: string,
};
