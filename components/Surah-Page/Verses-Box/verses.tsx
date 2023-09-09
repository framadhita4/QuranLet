/* eslint-disable react-hooks/exhaustive-deps */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faXmark } from "@fortawesome/free-solid-svg-icons";
import Word from "@/components/Surah-Page/Verses-Box/word";
import { currentVerseKeyAtom } from "@/components/atoms/audio-atoms";
import { timestampAtom } from "@/components/atoms/timestamp-atom";
import fetcher from "@/utils/fetcher";
import scrollToElement from "@/utils/scrollToElement";
import { useEffect, useMemo, useRef, useState } from "react";
import Button from "../button";
import { VersesType } from "@/types/verses-type";
import { useAtom } from "jotai";
import { navigationVerseAtom } from "@/components/atoms/nav-atoms";
import { useRouter } from "next/router";

export default function Verses({ verses, id }: { verses: VersesType, id: string }) {
  const router = useRouter();
  const [isActive, setActive] = useState(false);
  const [footNote, setFootNote] = useState<{ text: string }>();
  const [currentVerseKey] = useAtom(currentVerseKeyAtom);
  const [timestamp] = useAtom(timestampAtom);
  const [navigationVerse] = useAtom(navigationVerseAtom);
  const regex = /(<sup foot_note_id="\d+">\d+<\/sup>)/g;
  const textRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  const active = useMemo(() => {
    if (!ref.current) return false;

    if (currentVerseKey == verses.verse_key) {
      scrollToElement(ref.current);
      return true;
    } else {
      return false;
    }
  }, [currentVerseKey])

  useEffect(() => {
    const verseNumber = verses.verse_key.split(":")[1];
    if (navigationVerse == verseNumber || router.query.verse == verseNumber) {
      if (!ref.current) return;
      scrollToElement(ref.current);
    }
  }, [])

  const supHandler = async (footNoteId: string | undefined) => {
    try {
      setActive(true);
      setFootNote({ text: "" });
      const data = await fetcher(`/api/footnote?id=${footNoteId}`);
      setFootNote(data);
    } catch (error) {
      console.error(error);
    }
  }

  const parseStringToElement = (text: string) => {
    const footNoteId = text.match(/"\d+"/g)?.[0].replace(/"/g, "");
    const footNoteNumber = text.match(/>\d/g)?.[0].replace(">", "");

    return <sup className="p-1 cursor-pointer hover:text-sec-color-light " onClick={() => { supHandler(footNoteId) }}>{footNoteNumber}</sup>
  }


  const playHandler = async () => {
    if (!timestamp) return;

    const verseIndex = parseInt(verses.verse_key.split(":")[1]) - 1;

    const audio = document.querySelector<HTMLAudioElement>(".audio");
    if (!audio) return;

    audio.currentTime = timestamp?.verse_timings[verseIndex].timestamp_from * 0.001;
    audio.play();
  }

  return <div id={`${id}`} ref={ref} className={`rounded-sm border-b-2 mt-8 p-4 flex flex-wrap md:flex-nowrap ${active && "bg-slate-50"}`}>
    <div className="mr-10 mb-4 md:mb-0 flex md:flex-col items-center gap-1 text-gray-400">
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
          return <Word key={e.id} id={`${verses.verse_key}:${i + 1}`} verse={e} isLast={i == verses.words.length - 1} />
        })}
      </div>
      <div ref={textRef} className="text-sm sm:text-base mb-4">
        {verses.translation.text.split(regex).map((e) => {
          if (!e.match(regex)) return e;
          return parseStringToElement(e);
        })}
      </div>
      {isActive &&
        <div className="border-2 rounded-lg bg-slate-50 p-6 mb-6 text-gray-700">
          <div className="flex justify-between items-center mb-4 -mt-1">
            <h2>Footnote</h2>
            <Button onClick={() => { setActive(false) }}><FontAwesomeIcon className="text-gray-700" icon={faXmark} /></Button>
          </div>
          {footNote &&
            <p className="font-normal text-justify">{footNote?.text}</p>}
        </div>
      }
    </div>
  </div>
}