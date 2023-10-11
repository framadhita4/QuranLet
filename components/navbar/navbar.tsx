/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import Setting from '../Setting/setting-button';
import type { SurahInfo } from '@/types/surah-info-type';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import SurahNav from './surah-navigation/surah-navigation';
import { CSSTransition } from 'react-transition-group';
import fetcher from '@/utils/fetcher';
import VerseNav from './surah-navigation/verse-navigation';

export default function Navbar({ surahInfo }: { surahInfo?: SurahInfo | undefined }) {
  const [isActive, setActive] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(Number);
  const [surahNav, setSurahNav] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [quran, setQuran] = useState<Array<SurahInfo> | undefined>(undefined)


  useEffect(() => {
    fetcher("/api/quran").then((data) => setQuran(data));
  }, [])

  useEffect(() => {
    const scrollHandler = () => {
      const currentScrollPos = window.scrollY;
      const scrollDelta = prevScrollPos - currentScrollPos;

      setActive(scrollDelta >= 0);
      setPrevScrollPos(currentScrollPos);
    }


    const clickHandler = (e: MouseEvent) => {
      if (surahNav && ref.current && !ref.current.contains(e.target as Node) && !ref.current.parentNode?.contains(e.target as Node)) {
        setSurahNav(false);
      }
    }

    document.addEventListener("mousedown", clickHandler);
    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("mousedown", clickHandler);
      document.removeEventListener("scroll", scrollHandler);
    }
  })

  useEffect(() => {
    const progressBar = document.querySelector<HTMLDivElement>(".progress-bar");
    if (!progressBar) return;

    progressBar.style.width = ((window.scrollY) / ((document.body.scrollHeight - document.documentElement.clientHeight) / 100)) + "vw"
  })

  return (
    <div className={`fixed w-full z-40 transition-all duration-100 ${(isActive) ? "top-0" : "-top-12"} ${!surahInfo && "dark:drop-shadow-md"}`}>
      <div className='flex justify-between items-center px-5 sm:px-8 h-12 bg-white dark:bg-pri-color-dark'>
        <Link href={"/"}>
          <h1 className="text-xl font-bold">Qur'anLet</h1>
        </Link>
        <Setting active={isActive} />
      </div>
      {surahInfo && <>
        <div className='overflow-x-hidden w-screen'>
          <div className='px-5 sm:px-8 py-1 bg-white dark:bg-pri-color-dark drop-shadow-[0_3px_0px_rgba(0,0,0,0.1)]'>
            <div className='w-fit flex items-center gap-1 cursor-pointer font-semibold' onClick={() => setSurahNav(!surahNav)}>
              <span>{surahInfo.name}</span>
              <FontAwesomeIcon icon={faChevronDown} size='sm' className={`${surahNav && "rotate-180"} transition-transform duration-200`} />
            </div>
          </div>
          <CSSTransition
            nodeRef={ref}
            in={surahNav}
            timeout={300}
            unmountOnExit
            classNames={"surah-nav"}
          >
            <div ref={ref} className="z-[-1] absolute rounded-md p-2 w-fit flex bg-white translate-y-2 left-4 right-4 sm:left-8 dark:bg-sec-color-dark drop-shadow-md" >
              <div className="flex gap-1 font-normal">
                <SurahNav quran={quran} />
                <VerseNav />
              </div>
            </div>
          </CSSTransition>
          <div className='progress-bar h-[3px] bg-sec-color-light' />
        </div>
      </>}
    </div >
  )
}