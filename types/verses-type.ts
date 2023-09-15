import { Word } from "./word-type";

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
  words: [Word];
  translation: {
    text: string;
    resource_name: string;
  };
  transliteration: string;
};
