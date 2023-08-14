import { SurahInfo } from "@/types/surah-info-type";
import { faBackward, faForward, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./button";

export let isPlaying = false;
export const setPlaying = (status: boolean) => isPlaying = status;

export default function AudioPlayer({ surahInfo }: { surahInfo: SurahInfo }) {
  const duration = 1000;

  return <div className="w-full fixed bottom-0 h-14 bg-white">
    <audio src={surahInfo.audio_file.audio_url} />
    <div className="audio-bar h-[3px] bg-slate-300 w-full bg-clip-border">
      <div className="relative h-full w-[10%] bg-sec-color-light">
        <div className="absolute w-4 h-4 bg-sec-color-light rounded-full right-0 -translate-y-[0.425rem] translate-x-2 active:bg-thr-color-light"/>
      </div>
    </div>
    <div className="w-fit flex m-auto gap-4 text-xl mt-2">
      <Button>
        <FontAwesomeIcon icon={faBackward} />
      </Button>
      <Button>
        <FontAwesomeIcon icon={faPlay} />
      </Button>
      <Button>
        <FontAwesomeIcon icon={faForward} />
      </Button>
    </div>
  </div>
}