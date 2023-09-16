/* eslint-disable react-hooks/exhaustive-deps */
import { VersesPage } from "@/types/verses-page-type";
import { useRef, useState, useEffect, memo } from "react";
import VerseBoxSkeleton from "./verse-box-skeleton";
import { useAtom } from "jotai";
import { surahInfoAtom } from "@/components/atoms/surah-info-atom";
import Verses from "./verses";
import fetcher from "@/utils/fetcher";
import { highlightAtom } from "@/components/atoms/audio-atom";

export default function VerseBox({ id }: { id: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState(false);
  const [pages, setPages] = useState<VersesPage>();
  const [surahInfo] = useAtom(surahInfoAtom);
  const [highlight] = useAtom(highlightAtom);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (id == 1) setScroll(true);

    const handleScroll = () => {
      if (scroll) setScroll(false);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        setScroll(!(rect.bottom < -200 || rect.top - viewHeight >= 500));
      }, 100);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll)
    };
  }, []);

  useEffect(() => {
    if (!scroll || !ref.current) return;

    const getPage = async (page: string | null, callBack: Function) => {
      if (!page) return;
      const data = await fetcher(`/api/${surahInfo?.surah_number}?page=${id}`);
      callBack(data);
    }

    getPage(ref.current?.getAttribute("id"), (data: any) => {
      setPages(data);
      setScroll(false);
    })
  }, [scroll, surahInfo])

  useEffect(() => {
    setPages(undefined);
    if (id == 1) setScroll(true);
  }, [surahInfo])

  if (!pages) {
    const numbers = Array.from({ length: 6 }, (_, i) => i + 1);
    return <div ref={ref} id={`${id}`}>{
      numbers.map((e) => < VerseBoxSkeleton id={`${surahInfo?.surah_number}:${e + ((id - 1) * 6)}`} key={e} />)
    }</div>
  }

  return <>
    <div id={`${id}`}>{
      pages.verses.map((e) => {
        return <Verses highlight={highlight.match(`${e.verse_key}:`) ? highlight : null} id={e.verse_key} key={e.verse_key} verses={e} />
      })
    }</div>
  </>
}