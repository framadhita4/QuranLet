import { Timestamp } from "@/types/timestamps";
import { atom } from "jotai";

export const timestampAtom = atom<Timestamp | undefined>(undefined);
