export type timestamp = {
  id: number;
  chapter_id: number;
  file_size: number;
  format: string;
  audio_url: string;
  duration: number;
  verse_timings: verseTiming[];
};

export type verseTiming = {
  verse_key: string;
  timestamp_from: number;
  timestamp_to: number;
  duration: number;
  segments: [[number, number, number]];
};
