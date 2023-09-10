import { atom } from "jotai";

export const audioStatusAtom = atom(false);
export const currentTimeAtom = atom(0);
export const currentVerseKeyAtom = atom<string>("");
export const currentWordIndexAtom = atom<number>(0);
