/* eslint-disable react-hooks/exhaustive-deps */
import { SurahInfo } from "@/types/surah-info-type";
import { useAtom } from "jotai";
import { surahInfoAtom } from "@/components/atoms/surah-info-atom";
import Link from "next/link";
import { useState, useEffect } from "react";
import SearchBar from "./search-bar";
import { search } from "@/utils/search";

export default function SurahNav({ quran }: { quran: Array<SurahInfo> | undefined }) {
  const [surahInfo] = useAtom(surahInfoAtom);
  const [searchResult, setResult] = useState<SurahInfo[]>([]);
  const [searchQuery, setQuery] = useState("");

  useEffect(() => {
    if (!quran) return;
    setResult(quran?.filter((e) => search(`${e.surah_number}. ${e.name}`.toLowerCase(), searchQuery.toLowerCase())))
  }, [searchQuery])

  if (!quran || !surahInfo) return <></>;

  return <div className="w-44">
    <SearchBar inputHandler={(e) => setQuery(e.currentTarget.value)} placeholder="Cari Surah" />
    <div className="max-h-80 overflow-y-scroll flex flex-col">
      {searchQuery === "" ? quran.map((e) => <Link
        key={e.surah_number}
        href={`/${e.surah_number}`}
        className={`p-2 rounded-md hover:bg-slate-100 dark:hover:bg-pri-color-dark cursor-pointer ${surahInfo.name == e.name ? "font-semibold bg-slate-100 dark:bg-pri-color-dark" : ""}`}
      >
        {e.surah_number}. {e.name}
      </Link>) :
        searchResult.map((e) => <Link
          key={e.surah_number}
          href={`/${e.surah_number}`}
          className={`p-2 rounded-md hover:bg-slate-100 dark:hover:bg-pri-color-dark cursor-pointer ${surahInfo.name == e.name ? "font-semibold bg-slate-100 dark:bg-pri-color-dark" : ""}`}
        >
          {e.surah_number}. {e.name}
        </Link>)}
    </div>
  </div>
}