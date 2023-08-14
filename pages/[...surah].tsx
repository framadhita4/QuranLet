/* eslint-disable react/no-unescaped-entities */
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '@/components/navbar';
import type { SurahInfo } from '@/types/surah-info-type';
import { useEffect, useState } from 'react';
import SurahInfoButton from '@/components/surah-info';
import VersesContainer from '@/components/verses-container';
import AudioPlayer from '@/components/audio-player';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const router = useRouter();
  const { surah } = router.query;
  const [data, setData] = useState<SurahInfo | undefined>();

  const  GetSurahInfo = async () => {
    try {
      setData(await fetcher(`/api/${surah}`));
    }catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      GetSurahInfo();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);
  

  return <>
    <Head>
      <meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
      <title>{data && `Surah ${data?.name}`} - Qur'anlet</title>
    </Head>
    <Navbar surahInfo={data}></Navbar>
    <div className='mt-10'>
      <div className='mx-6 lg:mx-40 md:mx-20'>
        <div className='m-auto text-[2.5rem] leading-4 w-fit mb-5 mt-5'>
          <span className={`icon-${data?.surah_number} ml-2`}></span>
          <span className='icon-0 -ml-2'></span>
        </div>
        {data?.surah_number != 1 && <div className='icon-115 text-5xl w-fit m-auto'></div>}
        <div className='relative flex justify-between text-sm font-medium mt-14'>
          <div className='sticky right-0'>
            <p className='text-gray-500'>Terjemahan Oleh</p>
            <p>King Fahad Quran Complex</p>
          </div>
          <SurahInfoButton/>
        </div>
        {data && 
          <VersesContainer surahInfo={data}/>
        }
      </div>
      {data &&
        <AudioPlayer surahInfo={data} />
      }
    </div>
  </>
}