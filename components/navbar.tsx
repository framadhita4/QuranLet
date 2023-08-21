/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import Setting from './settingButton';
import type { SurahInfo } from '@/types/surah-info-type';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { surahInfoAtom } from './atoms/surah-info-atom';

export default function Navbar({ surahInfo }: { surahInfo: SurahInfo | undefined }) {
  const [isActive, setActive] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(Number);

  useEffect(() => {
    const scrollHandler = (e: Event) => {
      const currentScrollPos = window.scrollY;
      const scrollDelta = prevScrollPos - currentScrollPos;

      setActive(scrollDelta >= 0);
      setPrevScrollPos(currentScrollPos);
    }

    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    }
  })

  return (
    <div className={`text-gray-700 sticky z-40 transform duration-700 ${(isActive) ? "top-0" : "-top-12"}`}>
      <div className='flex justify-between items-center px-8 h-12 bg-white'>
        <Link className="text-lg md:text-xl font-bold" href={"/"}>Qur'anLet</Link>
        <Setting active={isActive} />
      </div>
      {surahInfo &&
        <div className='overflow-hidden'>
          <div className='px-8 py-1 bg-white w-screen drop-shadow-[0_2px_1px_rgba(0,0,0,0.1)]'>{surahInfo.name}</div>
          <div className='h-[3px] bg-sec-color-light' style={{ width: ((window.scrollY + document.documentElement.clientHeight) / (document.body.scrollHeight / 100)) + "vw" }} />
        </div>
      }
    </div>
  )
}