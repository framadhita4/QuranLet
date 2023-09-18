/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from '@/components/navbar/navbar';
import type { SurahInfo } from '@/types/surah-info-type';
import SurahDetailButton from '@/components/Surah-Page/surah-detail';
import VersesContainer from '@/components/Surah-Page/Verses-Box/verses-container';
import AudioPlayer from '@/components/audio-player/audio-player';
import { surahInfoAtom } from '@/components/atoms/surah-info-atom';
import Blocker from '@/components/blocker';
import SurahDetailCard from '@/components/surah-detail/surah-detail-card';
import { GetStaticPaths, GetStaticProps } from 'next';
import { surahIconFont } from '../_app';
import NextSeoWrapper from '@/components/NextSeoWrapper';
import { useHydrateAtoms } from 'jotai/utils';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import scrollToElement from '@/utils/scrollToElement';
import { useImmerAtom } from 'jotai-immer';
import SurahNavigator from '@/components/Surah-Page/surah-navigator';

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const surahId = String(ctx.params?.surah);

  if (surahId.match(/[0-9]/i) && (parseInt(surahId) < 115 && parseInt(surahId) > 0)) {
    const data = await import(`@/quran/surah/surah_${surahId}/surah_info.json`).then((data) => data.default);

    return {
      props: { data }
    }
  }

  return { notFound: true }
}

const Page = ({ data }: { data: SurahInfo }) => {
  const router = useRouter();
  useHydrateAtoms([[surahInfoAtom, data]]);
  const [surahInfo, setSurahInfo] = useImmerAtom(surahInfoAtom);

  useEffect(() => {
    if (!router.query.verse) return;

    const verse = document.getElementById(`${data.surah_number}:${router.query.verse}`);
    if (!verse) return;

    scrollToElement(verse);
  }, [surahInfo])

  useEffect(() => {
    setSurahInfo(() => data);
  }, [data])

  return <>
    {data && <>
      <NextSeoWrapper
        title={`Surah ${data.name} Bahasa Indonesia`}
        description={`Baca dan dengarkan mp3 dari surah ${data.name}. Surah ini termasuk surah ${data.type}, nama surah ini dalam bahasa Indonesia berarti ${data.translation.id}, dan juga memiliki ${data.ayahs} ayat.`}
        url={`quranlet.vercel.app/${data.surah_number}`}
      />
      <Navbar surahInfo={data} />
      <div className='mt-28'>
        <div className='mx-6 lg:mx-40 sm:mx-20'>
          <div className={`m-auto text-[10vw] sm:text-5xl leading-4 w-fit sm:mb-3 mt-5 ${surahIconFont.className}`}>
            <span className={`icon-${data?.surah_number} ml-2`}></span>
            <span className='icon-0 -ml-2'></span>
          </div>
          {data?.surah_number != 1 &&
            <div className={`icon-115 text-[10vw] sm:text-5xl w-fit m-auto ${surahIconFont.className}`} />
          }
          <div className='relative flex justify-between text-sm font-medium mt-14'>
            <div className='sticky right-0'>
              <p className='text-gray-500'>Terjemahan Oleh</p>
              <p>King Fahad Quran Complex</p>
            </div>
            <SurahDetailButton />
          </div>
          {data && <>
            <VersesContainer />
            <SurahNavigator />
          </>}
        </div>
        {data &&
          <AudioPlayer />
        }
      </div>
      <Blocker />
      <SurahDetailCard />
    </>
    }
  </>
}

export default Page;