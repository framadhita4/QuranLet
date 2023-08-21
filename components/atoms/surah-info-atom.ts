import { SurahInfo } from "@/types/surah-info-type";
import { atom } from "jotai";

export const surahInfoAtom = atom<SurahInfo | undefined>(undefined);
