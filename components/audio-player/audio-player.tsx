import { faBackward, faForward, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Surah-Page/button";
import { FormEvent, SyntheticEvent, useEffect, useRef, useState } from "react";
import { Timestamp } from "@/types/timestamps";
import { useAtom } from "jotai";
import { surahInfoAtom } from "../atoms/surah-info-atom";
import { timestampAtom } from "../atoms/timestamp-atom";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export let isPlaying = false;
export const setPlaying = (status: boolean) => isPlaying = status;

export default function AudioPlayer() {
  const [audioPlay, setAudioPlay] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [currentVerseKey, setCurrentVerseKey] = useState<string | undefined>();
  const [currentWordIndex, setCurrentWordIndex] = useState<number>();
  const [surahInfo] = useAtom(surahInfoAtom);
  const [timestamp, setTimestampAtom] = useAtom(timestampAtom);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioBarRef = useRef<HTMLInputElement>(null);

  const getTimestamp = async () => {
    if (!surahInfo) return;
    try {
      fetcher(`/api/timestamp?surah=${surahInfo.surah_number}`).then((data: Timestamp) => setTimestampAtom(data));
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getTimestamp();
  }, []);

  useEffect(() => {
    if (!timestamp || !currentTime) return;
    const percentage = currentTime * 100 / timestamp.duration;

    const audioBar = document.querySelector<HTMLInputElement>(".audio-bar");
    if (!audioBar) return;

    audioBar.style.backgroundSize = `${percentage}% 100%`;

    getCurrentVerse();
    getCurrentWord();
  }, [currentTime])

  // highlight playing verse-box
  useEffect(() => {
    if (!currentVerseKey) return;


    const versesBox = document.getElementById(`${currentVerseKey}`);
    if (!versesBox) return;

    versesBox.style.backgroundColor = "#f8fafc";

    const y = versesBox.getBoundingClientRect().top + window.scrollY - 70;
    window.scroll({
      top: y,
      behavior: 'smooth'
    });
  }, [currentVerseKey])

  // highlight playing word
  useEffect(() => {
    if (currentWordIndex == undefined) return;

    const versesBox = document.getElementById(`${currentVerseKey}`);
    if (!versesBox) return;
    const wordsContainer = versesBox.querySelector<HTMLDivElement>(".words-container");

    const word = wordsContainer?.children[currentWordIndex] as HTMLDivElement;
    if (word) {
      if (word.className.includes("text-sec-color-light")) return;
      word.classList.add("text-sec-color-light");
    }
  }, [currentWordIndex])

  const inputHandler = (e: FormEvent<HTMLInputElement>) => {
    if (!timestamp) return;

    const target = e.currentTarget;
    const value = parseInt(target.value);
    const percentage = value * 100 / timestamp.duration;

    target.style.backgroundSize = `${percentage}% 100%`
    setCurrentTime(value);

    const audio = document.querySelector<HTMLAudioElement>(".audio");
    if (!audio) return;

    audio.currentTime = value * 0.001;  // divide 1000
  }

  const playToggle = () => {
    if (!audioRef) return;

    if (audioRef.current?.paused && !isPlaying) {
      audioRef.current?.play();
      setPlay(true);
      return;
    }

    audioRef.current?.pause();
    setPlay(false);
  }

  const playingHandler = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
    if (!audioBarRef.current || !audioRef.current) return;

    const audioBar = document.querySelector<HTMLInputElement>(".audio-bar");
    if (!audioBar) return;

    const value = audioRef.current?.currentTime * 1000;
    audioBar.value = value.toString();
    setCurrentTime(value);
  }

  const getCurrentVerse = () => {
    if (!currentTime || !timestamp) return;

    timestamp.verse_timings.every((e) => {
      if (e.timestamp_from <= currentTime && e.timestamp_to > currentTime) {
        if (currentVerseKey === e.verse_key) return false;

        if (currentVerseKey) {
          const versesBox = document.getElementById(`${currentVerseKey}`);
          if (versesBox) {
            versesBox.style.backgroundColor = "#fff";

            const wordsContainer = versesBox.querySelector(".words-container");

            const lastWord = wordsContainer?.children[wordsContainer.childElementCount - 2] as HTMLDivElement;

            lastWord.classList.remove("text-sec-color-light");
          }
        }

        setCurrentVerseKey(e.verse_key);
        return false;
      }

      return true;
    })
  }

  const getCurrentWord = () => {
    if (!currentVerseKey || !currentTime || !timestamp) return;

    const versesBox = document.getElementById(`${currentVerseKey}`);
    if (!versesBox) return;
    const wordsContainer = versesBox.querySelector<HTMLDivElement>(".words-container");

    const versesIndex = parseInt(currentVerseKey.split(":")[1]) - 1;

    timestamp.verse_timings[versesIndex].segments.every((e) => {
      if (e[1] <= currentTime && e[2] > currentTime) {
        if (currentWordIndex === e[0] - 1) return false;

        if (currentWordIndex != undefined) {
          const word = wordsContainer?.children[currentWordIndex] as HTMLDivElement;
          if (word) {
            word.classList.remove("text-sec-color-light");
          }
        }

        setCurrentWordIndex(e[0] - 1);
        return false;
      }
      return true;
    })
  }

  const wardHandler = (maxVerses: number, operator: number) => {
    if (!currentVerseKey || !timestamp) return;

    let verseIndex = parseInt(currentVerseKey.split(":")[1]);
    if (verseIndex == maxVerses) return;

    const audio = document.querySelector<HTMLAudioElement>(".audio");
    if (!audio) return;

    audio.currentTime = timestamp?.verse_timings[(verseIndex + operator) - 1].timestamp_from * 0.001;  // divide 1000
  }

  const calcTime = (time: number): string => {
    let minute = Math.floor(time / 60);
    const second = Math.floor(time % 60);
    const hour = Math.floor(minute / 60);
    if (hour > 0) minute -= hour * 60;

    return `${hour < 1 ? "" : "0" + hour + ":"}${minute < 10 ? "0" : ""}${minute}:${second < 10 ? "0" : ""}${second}`;
  }

  const setPlay = (value: boolean) => {
    setAudioPlay(value);
    setPlaying(value);
  }

  return <div className="w-full z-10 flex flex-col fixed bottom-0 h-14 bg-white">
    {timestamp && surahInfo && <>
      <audio
        className="audio"
        onPlay={() => setPlay(true)}
        onPause={() => setPlay(false)}
        onEnded={playToggle}
        onTimeUpdate={playingHandler}
        src={timestamp.audio_url}
        ref={audioRef}
      />
      <input
        value={currentTime}
        onChange={inputHandler}
        type="range"
        className="audio-bar"
        min={0}
        max={timestamp.duration}
        ref={audioBarRef}
      />
      <div className="flex justify-between items-center px-4 text-md font-medium mt-1">
        <p className="w-20 text-left">{calcTime(currentTime * 0.001)}</p>
        <div className="w-fit flex gap-4 text-xl">
          <Button onClick={() => wardHandler(1, -1)} >
            <FontAwesomeIcon icon={faBackward} />
          </Button>
          <Button onClick={playToggle}>
            {audioPlay ?
              <FontAwesomeIcon icon={faPause} /> :
              <FontAwesomeIcon icon={faPlay} />
            }
          </Button>
          <Button onClick={() => wardHandler(surahInfo?.ayahs, 1)} >
            <FontAwesomeIcon icon={faForward} />
          </Button>
        </div>
        <p className="w-20 text-right">{calcTime(timestamp.duration * 0.001)}</p>
      </div>
    </>}
  </div>
}