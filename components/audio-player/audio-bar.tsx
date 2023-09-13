/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from "jotai"
import { currentTimeAtom } from "../atoms/audio-atom"
import { Timestamp } from "@/types/timestamps";
import { FormEvent, useEffect } from "react";

export default function AudioBar({ timestamp, playHandler }: { timestamp: Timestamp, playHandler: () => void }) {
  const [currentTime, setCurrentTime] = useAtom(currentTimeAtom);

  useEffect(() => {
    if (!timestamp) return;
    const percentage = currentTime * 100 / timestamp.duration;

    const audioBar = document.querySelector<HTMLInputElement>(".audio-bar");
    if (!audioBar) return;

    audioBar.style.backgroundSize = `${percentage}% 100%`;
  }, [currentTime])

  const inputHandler = (e: FormEvent<HTMLInputElement>) => {
    if (!timestamp) return;

    const target = e.currentTarget;
    const value = parseInt(target.value);
    const percentage = value * 100 / timestamp.duration;

    target.style.backgroundSize = `${percentage}% 100%`;
    setCurrentTime(value);

    const audio = document.querySelector<HTMLAudioElement>(".audio");
    if (!audio) return;

    audio.currentTime = value * 0.001;  // divide 1000
    playHandler();
  }

  return <input
    value={currentTime}
    onChange={inputHandler}
    type="range"
    className="audio-bar"
    min={0}
    max={timestamp.duration}
  />
}