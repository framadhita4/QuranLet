export type SurahInfo = {
  surah_number: number;
  name: string;
  translation: {
    en: string;
    ar: string;
    id: string;
  };
  ayahs: number;
  type: string;
  audio_file: {
    id: number;
    chapter: number;
    file_size: number;
    format: string;
    audio_url: string;
  };
};
