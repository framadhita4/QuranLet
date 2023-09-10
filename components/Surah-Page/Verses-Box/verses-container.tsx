/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import VerseBox from "./verse-box";
import { useAtom } from "jotai";
import { surahInfoAtom } from "@/components/atoms/surah-info-atom";
import { recentlyReadAtom } from "@/components/atoms/bookmark-atom";
import { currentVerseAtom } from "@/components/atoms/nav-atom";

export default function VersesContainer() {
  const [pages, setPages] = useState<undefined[]>();
  const [surahInfo] = useAtom(surahInfoAtom);

  useEffect(() => {
    if (!surahInfo) return;
    setPages(Array.from({ length: (Math.ceil(surahInfo?.ayahs / 6)) }, (_, i) => undefined))
  }, [surahInfo]);

  return <div className="mb-20">{
    pages &&
    pages.map((e, i) => <VerseBox id={i + 1} key={i} />)
  }
  </div>
}