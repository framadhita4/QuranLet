import { Bookmark } from "@/types/bookmark-type";
import { atomWithStorage } from "jotai/utils";

export const settingAtom = atomWithStorage<Array<Bookmark>>("bookmark", []);
export const recentlyReadAtom = atomWithStorage<Array<Bookmark>>(
  "recentlyRead",
  []
);
