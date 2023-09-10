import { SurahDetail } from "@/types/surah-detail";
import { atom } from "jotai";
import { atomWithImmer } from "jotai-immer";

export const detailCanvasAtom = atom(false);
export const surahDetailAtom = atomWithImmer<SurahDetail | undefined>(
  undefined
);
