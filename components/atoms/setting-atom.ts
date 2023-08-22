import { settingInitValue } from "@/types/setting-type";
import { atomWithStorage } from "jotai/utils";

export const settingAtom = atomWithStorage("setting", settingInitValue);
