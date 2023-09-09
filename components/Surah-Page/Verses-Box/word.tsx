/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useMemo, useEffect } from "react";
import { useAtom } from "jotai";
import { settingAtom } from "@/components/atoms/setting-atom";
import { Word } from "@/types/word-type";
import { audioStatusAtom, currentVerseKeyAtom, currentWordIndexAtom } from "@/components/atoms/audio-atoms";

export default function WordComponent({ verse, isLast, id }: { verse: Word, isLast: boolean, id: string }) {
  const [isHover, setHover] = useState(false);
  const [globalPlay, setGlobalPlay] = useAtom(audioStatusAtom);
  const [playing, setPlay] = useState(false);
  const [currentWordIndex] = useAtom(currentWordIndexAtom);
  const [currentVerseKey] = useAtom(currentVerseKeyAtom);
  const [setting] = useAtom(settingAtom);
  const audioRef = useRef<HTMLAudioElement>(null);

  const active = useMemo(() => {
    if (`${currentVerseKey}:${currentWordIndex}` == id) {
      return true;
    } else {
      return false;
    }
  }, [currentWordIndex])

  const togglePlay = () => {
    const audioElement = audioRef.current;
    if (playing) return;

    if (!playing) {
      audioElement?.play();
    }

    setPlay(true);
    setGlobalPlay(true);
  };

  return <div id={id}
    onClick={() => { if (!isLast) togglePlay() }}
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    className={
      `cursor-pointer flex flex-col items-center max-w-[130px] text-center ${(isHover || playing || active) && "text-sec-color-light"
      } ${(setting.wordByWord.translation || setting.wordByWord.transliteration) && setting.wordByWord.display.inline ? "p-2 ml-1 mb-2" : " ml-1 mb-5"}`
    }>
    <span dir="rtl" lang="ar" className={`${(isLast ? "font-uthmani font-bold" : "font-meQuran")} sm:text-2xl text-[5vw]`}>{verse.text}</span>
    {
      setting.wordByWord.transliteration && setting.wordByWord.display.inline &&
      <p className="mt-1 text-[0.85rem] leading-5 font-normal">{verse.transliteration}</p>
    }
    {
      setting.wordByWord.translation && setting.wordByWord.display.inline &&
      <p className="mt-1 text-[0.85rem] leading-5 font-normal">{verse.translation}</p>
    }
    <audio onEnded={() => { setPlay(false); setGlobalPlay(false) }} ref={audioRef} src={verse.audio_url} preload="none"></audio>
    {isHover && !isLast && setting.wordByWord.display.tooltip && (setting.wordByWord.transliteration || setting.wordByWord.translation) &&
      <div className="z-10 absolute flex flex-col justify-center items-center -translate-y-16 bg-gray-700 text-white p-2 rounded before:w-7 before:h-7 before:absolute before:-bottom-1 before:rotate-45 before:bg-gray-700 before:-z-[1] before:rounded">
        {
          setting.wordByWord.transliteration &&
          <p className="text-[0.85rem] leading-5 font-normal">{verse.transliteration}</p>
        }
        {
          setting.wordByWord.translation &&
          <p className="mt-1 text-[0.85rem] leading-5 font-normal">{verse.translation}</p>
        }
      </div>
    }
  </div>
}