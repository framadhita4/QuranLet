import { RecentlyRead } from "@/types/recently-type";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const createStorage = <T>(key: string, initValue: T) => {
  const storage = createJSONStorage<T>(() => localStorage);

  const getItem = (key: string, initValue: T) => {
    let value: any = localStorage.getItem(key);
    value = JSON.parse(value);

    if (!value) {
      return initValue;
    }

    return value as T;
  };

  return { ...storage, getItem };
};

export const recentlyReadAtom = atomWithStorage<RecentlyRead[]>(
  "recentlyRead",
  [],
  createStorage<RecentlyRead[]>("recentlyRead", [])
);
