import { SurahInfo } from "@/types/surah-info-type";
import { atomWithImmer } from "jotai-immer";

export const surahInfoAtom = atomWithImmer<SurahInfo | undefined>(undefined);
