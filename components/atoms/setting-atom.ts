import { settingInitValue } from "@/types/setting-type";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const createStorage = <T>(key: string, initValue: T) => {
  const storage = createJSONStorage<T>(() => localStorage);

  const getItem = (key: string, initValue: T) => {
    let value: any = localStorage.getItem(key);
    value = JSON.parse(value);

    if (!value || JSON.stringify(value) == JSON.stringify(initValue)) {
      localStorage.setItem(key, JSON.stringify(initValue));
      return initValue;
    }

    return value as T;
  };

  return { ...storage, getItem };
};

export const settingAtom = atomWithStorage("setting", settingInitValue);
