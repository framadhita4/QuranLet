import { memo } from "react"
import Button from "../Surah-Page/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faForward, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { Timestamp } from "@/types/timestamps";
import { useAtom } from "jotai";
import { surahInfoAtom } from "../atoms/surah-info-atom";
import { audioStatusAtom, highlightAtom } from "../atoms/audio-atom";

function AudioControllerWithoutMemo({ playToggle, timestamp }: { playToggle: () => void, timestamp: Timestamp }) {
  const [surahInfo] = useAtom(surahInfoAtom);
  const [highlight] = useAtom(highlightAtom);
  const [audioPlay] = useAtom(audioStatusAtom)

  const wardHandler = (maxVerses: number, operator: number) => {
    let verseIndex = parseInt(highlight.split(":")[1]);
    if (verseIndex == maxVerses || !timestamp) return;

    const audio = document.querySelector<HTMLAudioElement>(".audio");
    if (!audio) return;

    audio.currentTime = timestamp?.verse_timings[(verseIndex + operator) - 1].timestamp_from * 0.001;  // divide 1000
  }

  return <div className="w-fit flex gap-4 text-xl">
    {surahInfo && <><Button onClick={() => wardHandler(1, -1)} >
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
      </Button></>}
  </div>
}

const AudioController = memo(AudioControllerWithoutMemo);
export default AudioController;