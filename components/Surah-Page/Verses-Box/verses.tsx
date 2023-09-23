/* eslint-disable react-hooks/exhaustive-deps */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faXmark } from "@fortawesome/free-solid-svg-icons";
import Word from "@/components/Surah-Page/Verses-Box/word";
import { timestampAtom } from "@/components/atoms/timestamp-atom";
import fetcher from "@/utils/fetcher";
import scrollToElement from "@/utils/scrollToElement";
import { memo, useEffect, useRef, useState } from "react";
import Button from "../button";
import { VersesType } from "@/types/verses-type";
import { useAtom, useSetAtom } from "jotai";
import { currentVerseAtom, navigationVerseAtom } from "@/components/atoms/nav-atom";
import { surahInfoAtom } from "@/components/atoms/surah-info-atom";
import { useRouter } from "next/router";
import { settingAtom } from "@/components/atoms/setting-atom";
import Translation from "./translation";

let highlightPrev = "s";
function Verses({ verses, id, highlight }: { verses: VersesType, id: string, highlight: string | null }) {
  const router = useRouter();
  const [isActive, setActive] = useState(false);
  const [footNote, setFootNote] = useState<{ text: string } | undefined>(undefined);
  const [settings] = useAtom(settingAtom);
  const setCurrentVerse = useSetAtom(currentVerseAtom);
  const [surahInfo] = useAtom(surahInfoAtom);
  const [timestamp] = useAtom(timestampAtom);
  const [navigationVerse] = useAtom(navigationVerseAtom);
  const regex = /(<sup foot_note_id="\d+">\d+<\/sup>)/g;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || highlight?.split(":")[1] === highlightPrev) {
      return;
    };

    if (highlight) {
      scrollToElement(ref.current);
      highlightPrev = highlight.split(":")[1];
    }
  }, [highlight])

  useEffect(() => {
    window.addEventListener("scroll", () => scrollHandler());
    return () => {
      window.removeEventListener("scroll", () => scrollHandler())
    };
  }, [])

  useEffect(() => {
    const verseNumber = verses.verse_key.split(":")[1];
    if (navigationVerse == verseNumber || router.query.verse == verseNumber) {
      if (!ref.current) return;
      scrollToElement(ref.current);
      setCurrentVerse(verses.verse_key.split(":")[1]);
    }
  }, [surahInfo])

  const scrollHandler = () => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    if (rect.top >= 130 && rect.top <= 250) {
      setCurrentVerse(verses.verse_key.split(":")[1]);
    }
  }

  const supHandler = async (footNoteId: string | undefined) => {
    try {
      setActive(true);
      setFootNote(undefined);
      const data = await fetcher(`/api/footnote?id=${footNoteId}`);
      setFootNote(data);
    } catch (error) {
      console.error(error);
    }
  }

  const parseStringToElement = (text: string) => {
    const footNoteId = text.match(/"\d+"/g)?.[0].replace(/"/g, "");
    const footNoteNumber = text.match(/>\d+/g)?.[0].replace(">", "");

    return <sup className="p-1 cursor-pointer hover:underline" onClick={() => { supHandler(footNoteId) }}>{footNoteNumber}</sup>
  }

  const playHandler = async () => {
    if (!timestamp) return;

    const verseIndex = parseInt(verses.verse_key.split(":")[1]) - 1;

    const audio = document.querySelector<HTMLAudioElement>(".audio");
    if (!audio) return;

    audio.currentTime = timestamp?.verse_timings[verseIndex].timestamp_from * 0.001;
    audio.play();
  }

  return <div id={`${id}`} ref={ref} className={`rounded-sm border-b-2 dark:border-zinc-300 mt-8 p-4 flex flex-wrap md:flex-nowrap ${!!highlight && "bg-slate-50 dark:bg-sec-color-dark"}`}>
    <div className="mr-10 mb-4 md:mb-0 flex md:flex-col items-center gap-1 text-gray-400 dark:text-zinc-300">
      <a href={`#${id}`}>
        <Button>
          <p className="text-sm">{verses.verse_key}</p>
        </Button>
      </a>
      <Button onClick={playHandler}>
        <FontAwesomeIcon icon={faPlay} />
      </Button>
    </div>
    <div className="w-full">
      <div className={`words-container flex justify-start flex-row-reverse flex-wrap mb-4`}>
        {verses.words.map((e, i) => {
          return <Word highlight={(highlight === `${verses.verse_key}:${i + 1}`)} key={e.id} verse={e} isLast={i == verses.words.length - 1} />
        })}
      </div>
      {settings.translation.latin &&
        <Translation settings={settings} resourceName="Latin">
          {verses.transliteration}
        </Translation>
      }
      {settings.translation.id &&
        <Translation settings={settings} resourceName={verses.translation.resource_name}>
          {verses.translation.text.split(regex).map((e) => {
            if (!e.match(regex)) return e;
            return parseStringToElement(e);
          })}
        </Translation>
      }
      {isActive && settings.translation.id &&
        <div className="border-2 rounded-lg bg-slate-50 dark:border-zinc-300 dark:bg-sec-color-dark p-6 mb-6">
          <div className="flex justify-between items-center mb-4 -mt-1">
            <h2>Footnote</h2>
            <Button onClick={() => { setActive(false) }}><FontAwesomeIcon icon={faXmark} /></Button>
          </div>
          {(footNote && footNote?.text != "") ?
            <h2 className="font-normal text-justify text-sm sm:text-base">{footNote?.text}</h2> :
            <div className="animate-pulse">
              <div className="bg-slate-300 w-full h-4 rounded mb-2" />
              <div className="bg-slate-300 w-full h-4 rounded" />
            </div>}
        </div>
      }
    </div>
  </div >
}

const VersesMemo = memo(Verses);
export default VersesMemo;