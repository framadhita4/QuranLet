/* eslint-disable react-hooks/exhaustive-deps */
import { currentVerseAtom, navigationVerseAtom } from "@/components/atoms/nav-atom";
import { surahInfoAtom } from "@/components/atoms/surah-info-atom"
import scrollToElement from "@/utils/scrollToElement";
import { useAtom } from "jotai"
import SearchBar from "./search-bar";
import { useEffect, useState } from "react";
import { search } from "@/utils/search";

export default function VerseNav() {
  const [surahInfo] = useAtom(surahInfoAtom);
  const [, setNavigationVerse] = useAtom(navigationVerseAtom);
  const [currentVerse] = useAtom(currentVerseAtom);
  const [searchResult, setResult] = useState<number[]>([]);
  const [searchQuery, setQuery] = useState("");
  const numbers = Array.from({ length: surahInfo ? surahInfo.ayahs : 0 }, (_, i) => i + 1);

  useEffect(() => {
    setResult(numbers.filter((e) => search(e.toString(), searchQuery)))
  }, [searchQuery])

  const clickHandler = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, i: number) => {
    event.preventDefault();
    window.history.pushState({}, "", `/${surahInfo?.surah_number}?verse=${i}`);

    const verse = document.getElementById(`${surahInfo?.surah_number}:${i}`);
    if (!verse) return;
    setNavigationVerse(`${i}`);
    scrollToElement(verse);
  }

  return <div className="w-16">
    <SearchBar inputHandler={(e) => setQuery(e.currentTarget.value)} placeholder="Ayat" />
    <div className="max-h-80 overflow-y-scroll flex flex-col">
      {searchQuery === "" ? numbers.map((e) => <a
        onClick={(event) => { clickHandler(event, e) }}
        key={e}
        href={``}
        className={`p-2 rounded-md hover:bg-slate-100 dark:hover:bg-pri-color-dark cursor-pointer ${(currentVerse == `${e}`) ? "font-semibold bg-slate-100 dark:bg-pri-color-dark" : ""}`}
      >
        {e}
      </a>) :
        searchResult.map((e) => <a
          onClick={(event) => { clickHandler(event, e) }}
          key={e}
          href={``}
          className={`p-2 rounded-md hover:bg-slate-100 dark:hover:bg-pri-color-dark cursor-pointer ${(currentVerse == `${e}`) ? "font-semibold bg-slate-100 dark:bg-pri-color-dark" : ""}`}
        >
          {e}
        </a>)}
    </div>
  </div>
}