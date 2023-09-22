/* eslint-disable react-hooks/exhaustive-deps */
import fetcher from "@/utils/fetcher";
import { Segments, Timestamp, VerseTiming } from "@/types/timestamps";
import { useCallback, useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { surahInfoAtom } from "../atoms/surah-info-atom";
import { timestampAtom } from "../atoms/timestamp-atom";
import Audio from "./audio";
import { audioStatusAtom, currentTimeAtom, highlightAtom } from "../atoms/audio-atom";
import AudioBar from "./audio-bar";
import { useImmerAtom } from "jotai-immer";
import calcTime from "@/utils/calcTime";
import AudioController from "./audio-controller";

export default function AudioPlayer() {
  const [audioPlay, setAudioPlay] = useAtom(audioStatusAtom);
  const [currentTime, setCurrentTime] = useAtom(currentTimeAtom);
  const [highlight, setHighlight] = useAtom(highlightAtom);
  const [surahInfo] = useAtom(surahInfoAtom);
  const [timestamp, setTimestampAtom] = useImmerAtom(timestampAtom);

  const getTimestamp = async () => {
    if (!surahInfo) return;
    try {
      fetcher(`/api/timestamp?surah=${surahInfo.surah_number}`).then((data: Timestamp) => setTimestampAtom(() => data));
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getTimestamp();

    setAudioPlay(false);
    setCurrentTime(0);
    setHighlight("init");
  }, [surahInfo]);

  const playToggle = useCallback(() => {
    const audio = document.querySelector<HTMLAudioElement>(".audio");
    if (!audio || audioPlay) return;

    if (audio.paused && !audioPlay) {
      audio.play();
      setAudioPlay(true);
      return;
    }

    audio.pause();
    setAudioPlay(false);
  }, [])

  const GetHighlight = () => {
    if (!currentTime || !timestamp) return;
    let newHighlight: string = "";

    const verseTiming = timestamp.verse_timings.find((e) => (e.timestamp_from <= currentTime && e.timestamp_to > currentTime) && audioPlay);
    if (!verseTiming) return;

    const wordIndex = verseTiming.segments.find((e) => e[1] <= currentTime && e[2] > currentTime);
    if (!wordIndex) return;

    newHighlight = `${verseTiming.verse_key}:${wordIndex[0]}`;

    if (newHighlight == highlight) return;
    setHighlight(newHighlight);
  }

  return <div className="w-full z-10 flex flex-col fixed bottom-0 h-14 bg-white dark:bg-pri-color-dark">
    {timestamp && surahInfo && <>
      <Audio playHandler={() => { GetHighlight() }} timestamp={timestamp} playToggle={playToggle} />
      <AudioBar playHandler={() => { GetHighlight() }} timestamp={timestamp} />

      <div className="flex justify-between items-center px-4 text-md font-medium mt-1">
        <p className="w-20 text-left">{calcTime(currentTime * 0.001)}</p>
        <AudioController timestamp={timestamp} playToggle={playToggle} />
        <p className="w-20 text-right">{calcTime(timestamp.duration * 0.001)}</p>
      </div>
    </>}
  </div>
}