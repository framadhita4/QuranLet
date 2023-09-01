import { surahDetail } from "@/types/surah-detail";
import { atom } from "jotai";

export const detailCanvasAtom = atom(false);
export const surahDetailAtom = atom<surahDetail | undefined>(undefined);
