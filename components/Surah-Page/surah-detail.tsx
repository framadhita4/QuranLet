/* eslint-disable react-hooks/exhaustive-deps */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { surahInfoAtom } from '../atoms/surah-info-atom';
import { detailCanvasAtom, surahDetailAtom } from '../atoms/surah-detail-atom';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SurahDetailButton() {
  const [isActive, setActive] = useState(false);
  const [surahInfo] = useAtom(surahInfoAtom);
  const [detailCanvas, setDetailCanvas] = useAtom(detailCanvasAtom);
  const [surahDetail, setSurahDetail] = useAtom(surahDetailAtom);
  let infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetcher(`/api/detail/${surahInfo?.surah_number}`).then((data) => setSurahDetail(data));
  }, [])

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (isActive && infoRef.current && !infoRef.current.contains(e.target as Node) && !infoRef.current.parentNode?.contains(e.target as Node)) {
        setActive(!isActive);
      }
    }

    document.addEventListener("mousedown", clickHandler)
    return () => {
      document.removeEventListener("mousedown", clickHandler)
    }
  });

  const showMoreHandler = () => {
    window.history.pushState({}, "", `/detail/${surahInfo?.surah_number}`);
    setDetailCanvas(!detailCanvas);

    document.body.style.overflow = "hidden";
  }

  if (!surahDetail) return <></>;

  return <>
    <button onClick={() => setActive(!isActive)} className='flex items-center h-7 hover:bg-slate-200 px-2 pr-4 rounded transition-all'>
      <p className={`text-sec-color-light font-semibold`}>Detail Surah</p>
      <FontAwesomeIcon icon={faInfo} size='sm' className={`z-[2] ml-1 -mr-[9px] text-white py-1 px-2 rounded-full transition-all}`}></FontAwesomeIcon>
    </button>
    <div ref={infoRef} className={`text-white p-8 z-[1] absolute rounded-xl left-0 right-0 text-justify bg-gradient-to-br from-sec-color-light to-thr-color-light transition-all duration-1000 ease-in-out text-base ${isActive ? "info-on" : "info-off"}`}>
      <h1 className='text-lg font-bold mb-2'>{surahInfo?.name}</h1>
      <p className='mb-2'>{surahDetail?.shortText}</p>
      <p className='underline mt-2 cursor-pointer' onClick={showMoreHandler}>Selengkapnya...</p>
    </div >
  </>
}