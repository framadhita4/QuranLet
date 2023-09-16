export type Timestamp = {
  id: number;
  chapter_id: number;
  file_size: number;
  format: string;
  audio_url: string;
  duration: number;
  verse_timings: VerseTiming[];
};

export type VerseTiming = {
  verse_key: string;
  timestamp_from: number;
  timestamp_to: number;
  duration: number;
  segments: Segments[];
};

export type Segments = [number, number, number];
