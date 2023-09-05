import { useRef, useState } from "react";
import Button from "../button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faXmark } from "@fortawesome/free-solid-svg-icons";
import Word from "@/components/Surah-Page/Verses-Box/word";
import { VersesType } from "@/types/verses-type";
import { useAtom } from "jotai";
import { timestampAtom } from "@/components/atoms/timestamp-atom";

export default function Verses({ verses, id }: { verses: VersesType, id: string }) {
  const textRef = useRef<HTMLDivElement>(null);
  const [isActive, setActive] = useState(false);
  const [footNote, setFootNote] = useState<{ text: string }>();
  const [timestamp] = useAtom(timestampAtom);
  const regex = /(<sup foot_note_id="\d+">\d+<\/sup>)/g;
  const text = verses.translation.text;

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const supHandler = async (footNoteId: string | undefined) => {
    try {
      const data = await fetcher(`/api/footnote?id=${footNoteId}`);
      setFootNote(data);
      setActive(true);
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

  return <div id={`${id}`} className="rounded-sm border-b-2 mt-8 p-4 flex flex-wrap md:flex-nowrap">
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
          return <Word key={e.id} verse={e} isLast={i == verses.words.length - 1} />
        })}
      </div>
      <div ref={textRef} className="font-normal mb-4">
        {text.split(regex).map((e) => {
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
          <p className="font-normal text-justify">{footNote?.text}</p>
        </div>
      }
    </div>
  </div>
}