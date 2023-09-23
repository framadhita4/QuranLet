/* eslint-disable react-hooks/exhaustive-deps */
import Header from '@/components/header';
import SurahCard from '@/components/surah-card/surah-card';
import Navbar from '@/components/navbar/navbar';
import SurahCardSkeleton from '@/components/surah-card/surah-card-sekeleton';
import type { SurahInfo } from '@/types/surah-info-type';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import NextSeoWrapper from '@/components/NextSeoWrapper';
import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useAtom } from 'jotai';
import { recentlyReadAtom } from '@/components/atoms/recently-read-atom';
import RecentlyReadCard from '@/components/recently-read-card';

export const getStaticProps: GetStaticProps = async () => {
  const data = await import(`@/quran/quran.json`).then((data) => data.default);

  return {
    props: { data }
  }
}

export default function Page({ data }: { data: Array<SurahInfo> }) {
  const [sort, setSort] = useState<boolean>(true);
  const numbers = Array.from({ length: 114 }, (_, index) => index + 1);
  const [recentlyRead] = useAtom(recentlyReadAtom);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, [])

  return <>
    <Head>
      <link rel="preload" href="/quran.svg" as="image" type="image/svg+xml" />
    </Head>
    <NextSeoWrapper
      title="AL-Quran Bahasa Indonesia"
      description="Al-Quran dengan terjamahan dan tafsir bahasa Indonesia"
      url="quranlet.vercel.app"
    />
    <Navbar />
    <Header data={data} />
    <div className='p-5 m-auto md:w-10/12 md:mt-4'>
      {isClient && recentlyRead && recentlyRead?.length > 0 &&
        <div>
          <div className='px-2 border-b-2'>
            <p>Baru Saja Dibaca</p>
          </div>
          <div className='flex gap-4 my-4 w-full overflow-x-scroll pb-2'>
            {recentlyRead.map((e, i) => <RecentlyReadCard key={i} recentlyRead={e} />)}
          </div>
        </div>
      }
      <div>
        <div className='px-2 border-b-2 dark:border-zinc-300'>
          <p>Surah</p>
        </div>
        <div className='flex px-2 text-sm justify-end'>
          <p>Sort By : </p>
          <div onClick={() => {
            data = data.reverse();
            setSort(!sort);
          }}
            className='sort-type hover:text-glow hover:text-sec-color-light hover:cursor-pointer flex'>
            <span className='mx-1'>{(sort) ? "Ascending" : "Descending"}</span>
            <div className={`${!sort ? "rotate-180" : ""} transition-transform duration-200`}>
              <FontAwesomeIcon icon={faChevronUp} size='sm' />
            </div>
          </div>
        </div>
        <div className='grid gap-4 mt-2 grid-cols-1 lg:grid-cols-3 md:grid-cols-2'>
          {data ? data.map((e) => <SurahCard key={e.surah_number} surahInfo={e} />) : numbers.map((e) => <SurahCardSkeleton key={e} />)}
        </div>
      </div>
    </div>
  </>
}
