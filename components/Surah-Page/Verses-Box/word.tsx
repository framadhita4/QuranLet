import { Scheherazade_New } from "next/font/google";
import { useState, useRef } from "react";
import { isPlaying, setPlaying } from "../../audio-player/audio-player";

const scheherazade = Scheherazade_New({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"]
})

type WordProps = {
  id: number;
  line_number: number;
  audio_url: string;
  text: string;
  translation: string;
  transliteration: string;
}

export default function Word({ verse, isLast }: { verse: WordProps, isLast: boolean }) {
  const [isHover, setHover] = useState(false);
  const [playing, setPlay] = useState(false);
  const isTrue = true;
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

  return <div onClick={() => { if (!isLast) togglePlay() }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className={`ml-1 mb-2 cursor-pointer flex flex-col items-center max-w-[130px] text-center ${(isHover || playing) && "text-sec-color-light"} ${isTrue && "p-2"}`}>
    <span dir="rtl" lang="ar" className={`${(isLast) ? "font-uthmani font-bold" : scheherazade.className + " font-thin"} text-[6vw] sm:text-3xl`}>{verse.text}</span>
    {isTrue && <>
      <p className="mt-1 text-[0.85rem] leading-5 font-normal">{verse.transliteration}</p>
      <p className="mt-1 text-[0.85rem] leading-5 font-normal">{verse.translation}</p>
      <audio onEnded={() => { setPlaying(false); setPlay(false) }} ref={audioRef} src={verse.audio_url}></audio>
    </>}
    {isHover && !isLast &&
      <div className="z-10 absolute flex flex-col justify-center items-center -translate-y-[90px] bg-gray-700 text-white p-2 rounded before:w-7 before:h-7 before:absolute before:translate-y-5 before:rotate-45 before:bg-gray-700 before:-z-[1] before:rounded">
        <p className="text-[0.85rem] leading-5 font-normal">{verse.transliteration}</p>
        <p className="mt-1 text-[0.85rem] leading-5 font-normal">{verse.translation}</p>
      </div>
    }
  </div>
}