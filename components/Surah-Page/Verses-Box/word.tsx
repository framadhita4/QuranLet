import { Scheherazade_New } from "next/font/google";
import { useState, useRef } from "react";
import { isPlaying, setPlaying } from "../../audio-player/audio-player";
import { useAtom } from "jotai";
import { settingAtom } from "@/components/atoms/setting-atom";
import { Word } from "@/types/word-type";

const scheherazade = Scheherazade_New({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"]
})

export default function WordComponent({ verse, isLast }: { verse: Word, isLast: boolean }) {
  const [isHover, setHover] = useState(false);
  const [playing, setPlay] = useState(false);
  const [setting] = useAtom(settingAtom);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    const audioElement = audioRef.current;
    if (isPlaying) return;

    if (!isPlaying) {
      audioElement?.play();
    }

    setPlay(true);
    setPlaying(true);
  };

  return <div
    onClick={() => { if (!isLast) togglePlay() }}
    onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className={
      `cursor-pointer flex flex-col items-center max-w-[130px] text-center ${(isHover || playing) && "text-sec-color-light"}${(setting.wordByWord.translation || setting.wordByWord.transliteration) && setting.wordByWord.display.inline ? " p-2 ml-1 mb-2" : " ml-2 mb-5"
      }`}>
    <span dir="rtl" lang="ar" className={`${(isLast) ? "font-uthmani font-bold" : scheherazade.className + " font-thin"} text-[6vw] sm:text-3xl`}>{verse.text}</span>
    {
      setting.wordByWord.transliteration && setting.wordByWord.display.inline &&
      <p className="mt-1 text-[0.85rem] leading-5 font-normal">{verse.transliteration}</p>
    }
    {
      setting.wordByWord.translation && setting.wordByWord.display.inline &&
      <p className="mt-1 text-[0.85rem] leading-5 font-normal">{verse.translation}</p>
    }
    <audio onEnded={() => { setPlaying(false); setPlay(false) }} ref={audioRef} src={verse.audio_url} preload="none"></audio>
    {isHover && !isLast && setting.wordByWord.display.tooltip && (setting.wordByWord.transliteration || setting.wordByWord.translation) &&
      <div className="z-10 absolute flex flex-col justify-center items-center -translate-y-[90px] bg-gray-700 text-white p-2 rounded before:w-7 before:h-7 before:absolute before:-bottom-1 before:rotate-45 before:bg-gray-700 before:-z-[1] before:rounded">
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