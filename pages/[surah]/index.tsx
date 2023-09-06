import { useEffect } from 'react';
import { useAtom } from 'jotai';
import Navbar from '@/components/navbar';
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

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const surahId = String(ctx.params?.surah)

  if (surahId.match(/[0-9]/i) && (parseInt(surahId) < 115 && parseInt(surahId) > 0)) {
    const data = await import(`@/quran/surah/surah_${surahId}/surah_info.json`).then((data) => data.default)

    return {
      props: { data }
    }
  }

  return { notFound: true }
}

const Page = ({ data }: { data: SurahInfo }) => {
  const [surahInfo, setSurahInfo] = useAtom(surahInfoAtom);

  useEffect(() => {
    if (data) {
      setSurahInfo(undefined);
      setSurahInfo(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <>
    {surahInfo && <>
      <NextSeoWrapper
        title={`Surah ${surahInfo.name} Bahasa Indonesia`}
        description={`Baca dan dengarkan mp3 dari surah ${surahInfo.name}. Surah ini termasuk surah ${surahInfo.type}, nama surah ini dalam bahasa Indonesia berarti ${surahInfo.translation.id}, dan juga memiliki ${surahInfo.ayahs} ayat.`}
        url={`quranlet.vercel.app/${surahInfo.surah_number}`}
      />
      <Navbar surahInfo={surahInfo} />
      <div className='mt-10'>
        <div className='mx-6 lg:mx-40 md:mx-20'>
          <div className={`m-auto text-[10vw] md:text-5xl leading-4 w-fit md:mb-3 mt-5 ${surahIconFont.className}`}>
            <span className={`icon-${surahInfo?.surah_number} ml-2`}></span>
            <span className='icon-0 -ml-2'></span>
          </div>
          {surahInfo?.surah_number != 1 && <div className={`icon-115 text-[10vw] md:text-5xl w-fit m-auto ${surahIconFont.className}`} />}
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
      </div>
      <Blocker />
      <SurahDetailCard />
    </>
    }
  </>
}

export default Page;