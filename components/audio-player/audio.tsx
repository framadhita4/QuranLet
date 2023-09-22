import { Timestamp } from "@/types/timestamps";
import { useRef } from "react";
import { audioStatusAtom, currentTimeAtom, highlightAtom } from "../atoms/audio-atom";
import { useAtom } from "jotai";

export default function Audio({ timestamp, playToggle, playHandler }: { timestamp: Timestamp, playToggle: () => void, playHandler: () => void }) {
  const [audioPlay, setAudioPlay] = useAtom(audioStatusAtom);
  const [, setCurrentTime] = useAtom(currentTimeAtom);
  const [, setHighlight] = useAtom(highlightAtom);
  const ref = useRef<HTMLAudioElement>(null);

  const playingHandler = () => {
    if (!ref.current) return;

    const audioBar = document.querySelector<HTMLInputElement>(".audio-bar");
    if (!audioBar) return;

    const value = ref.current?.currentTime * 1000;
    audioBar.value = value.toString();

    if (!audioPlay) return;
    setCurrentTime(value);

    playHandler();
  }

  return <audio
    className="audio"
    onPlay={() => setAudioPlay(true)}
    onPause={() => { setAudioPlay(false); setHighlight("init") }}
    onEnded={playToggle}
    onTimeUpdate={playingHandler}
    src={timestamp.audio_url}
    ref={ref}
  />
}