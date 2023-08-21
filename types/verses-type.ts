export type VersesType = {
  id: number;
  chapter_id: number;
  verse_key: string;
  hizb_number: number;
  rub_el_hizb_number: number;
  ruku_number: number;
  manzil_number: number;
  page_number: number;
  juz_number: number;
  text_uthmani: string;
  audio_url: string;
  words: [
    {
      id: number;
      line_number: number;
      audio_url: string;
      text: string;
      translation: string;
      transliteration: string;
    }
  ];
  translation: {
    text: string;
    resource_name: string;
  };
  timestamps: {
    timestamp_from: number;
    timestamp_to: number;
    duration: number;
    segments: [[number, number, number]];
  };
};
