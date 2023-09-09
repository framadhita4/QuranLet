/* eslint-disable react-hooks/exhaustive-deps */
import { faBackward, faForward, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fetcher from "@/utils/fetcher";
import { Timestamp } from "@/types/timestamps";
import Button from "../Surah-Page/button";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { surahInfoAtom } from "../atoms/surah-info-atom";
import { timestampAtom } from "../atoms/timestamp-atom";
import Audio from "./audio";
import { audioStatusAtom, currentTimeAtom, currentVerseKeyAtom, currentWordIndexAtom } from "../atoms/audio-atoms";
import AudioBar from "./audio-bar";
import { useImmerAtom } from "jotai-immer";
import calcTime from "@/utils/calcTime";

export default function AudioPlayer() {
  const [audioPlay, setAudioPlay] = useAtom(audioStatusAtom);
  const [currentTime, setCurrentTime] = useAtom(currentTimeAtom);
  const [currentVerseKey, setCurrentVerseKey] = useAtom(currentVerseKeyAtom);
  const [currentWordIndex, setCurrentWordIndex] = useAtom(currentWordIndexAtom);
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
    setCurrentVerseKey(``);
    setCurrentWordIndex(0);
  }, []);

  useEffect(() => {
  }, [currentWordIndex])

  const playToggle = () => {
    const audio = document.querySelector<HTMLAudioElement>(".audio");
    if (!audio) return;

    if (audio.paused && !audioPlay) {
      audio.play();
      setAudioPlay(true);
      return;
    }

    audio.pause();
    setAudioPlay(false);
  }

  const wardHandler = (maxVerses: number, operator: number) => {
    let verseIndex = parseInt(currentVerseKey.split(":")[1]);
    if (verseIndex == maxVerses || !timestamp) return;

    const audio = document.querySelector<HTMLAudioElement>(".audio");
    if (!audio) return;

    audio.currentTime = timestamp?.verse_timings[(verseIndex + operator) - 1].timestamp_from * 0.001;  // divide 1000
  }


  const getCurrentVerse = () => {
    if (!currentTime || !timestamp) return;

    timestamp.verse_timings.every((e) => {
      if (e.timestamp_from <= currentTime && e.timestamp_to > currentTime) {
        if (currentVerseKey === e.verse_key) return false;

        setCurrentVerseKey(e.verse_key);
        return false;
      }
      return true;
    })
  }

  const getCurrentWord = () => {
    if (!currentVerseKey || !currentTime || !timestamp) return;

    const versesIndex = parseInt(currentVerseKey.split(":")[1]);
    timestamp.verse_timings[versesIndex - 1].segments.every((e) => {
      if (e[1] <= currentTime && e[2] > currentTime) {
        if (currentWordIndex === e[0]) return false;

        setCurrentWordIndex(e[0]);
        return false;
      }
      return true;
    })
  }

  return <div className="w-full z-10 flex flex-col fixed bottom-0 h-14 bg-white">
    {timestamp && surahInfo && <>
      <Audio playHandler={() => { getCurrentVerse(); getCurrentWord() }} timestamp={timestamp} playToggle={playToggle} />
      <AudioBar playHandler={() => { getCurrentVerse(); getCurrentWord() }} timestamp={timestamp} />

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