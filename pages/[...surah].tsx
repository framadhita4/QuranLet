/* eslint-disable react/no-unescaped-entities */
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '@/components/navbar';
import type { SurahInfo } from '@/types/surah-info-type';
import { useEffect } from 'react';
import SurahDetailButton from '@/components/Surah-Page/surah-detail';
import VersesContainer from '@/components/Surah-Page/Verses-Box/verses-container';
import AudioPlayer from '@/components/audio-player/audio-player';
import { surahInfoAtom } from '@/components/atoms/surah-info-atom';
import { useAtom } from 'jotai';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const router = useRouter();
  const { surah } = router.query;
  const [surahInfo, setSurahInfo] = useAtom(surahInfoAtom);


  const GetSurahInfo = async () => {
    try {
      fetcher(`/api/${surah}`).then((data: SurahInfo) => setSurahInfo(data));
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      setSurahInfo(undefined);
      GetSurahInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return <>
    {surahInfo && <>
      <Head>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
        <title>{surahInfo && `Surah ${surahInfo?.name}`} - Qur'anlet</title>
      </Head>
      <Navbar surahInfo={surahInfo} />
      <div className='mt-10'>
        <div className='mx-6 lg:mx-40 md:mx-20'>
          <div className='m-auto text-[2.5rem] leading-4 w-fit mb-5 mt-5'>
            <span className={`icon-${surahInfo?.surah_number} ml-2`}></span>
            <span className='icon-0 -ml-2'></span>
          </div>
          {surahInfo?.surah_number != 1 && <div className='icon-115 text-5xl w-fit m-auto'></div>}
          <div className='relative flex justify-between text-sm font-medium mt-14'>
            <div className='sticky right-0'>
              <p className='text-gray-500'>Terjemahan Oleh</p>
              <p>King Fahad Quran Complex</p>
            </div>
            <SurahDetailButton />
          </div>
          {surahInfo &&
            <VersesContainer />
          }
        </div>
        {surahInfo &&
          <AudioPlayer />
        }
      </div></>}
  </>
}