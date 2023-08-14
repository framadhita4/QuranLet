import { useEffect, useState } from "react";
import type { SurahInfo } from "@/types/surah-info-type";
import VerseBox from "./verse-box";

export default function VersesContainer({surahInfo} : {surahInfo: SurahInfo | undefined}) {
  const [ pages, setPages ] = useState<undefined[]>();
  
  useEffect(() => {
    if(!surahInfo) return;
    setPages(Array.from({length: (Math.ceil(surahInfo?.ayahs / 6))}, (_, i) => undefined))
  }, [surahInfo]);

  if(!pages || !surahInfo) return <></>

  return <div>
    {pages.map((e, i) => <VerseBox id={i+1} key={i} surahInfo={surahInfo}/>)}
  </div>
}