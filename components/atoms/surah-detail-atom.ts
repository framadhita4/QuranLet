import { SurahDetail } from "@/types/surah-detail";
import { atom } from "jotai";

export const detailCanvasAtom = atom(false);
export const surahDetailAtom = atom<SurahDetail | undefined>(undefined);
