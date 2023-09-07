import Header from '@/components/header';
import SurahCard from '@/components/surah-card/surah-card';
import Navbar from '@/components/navbar/navbar';
import SurahCardSkeleton from '@/components/surah-card/surah-card-sekeleton';
import type { SurahInfo } from '@/types/surah-info-type';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import NextSeoWrapper from '@/components/NextSeoWrapper';
import { useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';

export const getStaticProps: GetStaticProps = async () => {
  const data = await import(`@/quran/quran.json`).then((data) => data.default);

  return {
    props: { data }
  }
}

export default function Page({ data }: { data: Array<SurahInfo> }) {
  const [sort, setSort] = useState<boolean>(true);
  const numbers = Array.from({ length: 114 }, (_, index) => index + 1);

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
    <Header data={data?.map(e => e.name.toLowerCase())} />
    <div className='p-2 m-auto text-gray-700 md:w-11/12 md:mt-4'>
      <div className='px-2 border-b-2'>
        <p>Surah</p>
      </div>
      <div className='flex px-2 text-sm justify-end'>
        <p>Sort By : </p>
        <div onClick={() => {
          data = data.reverse();
          setSort(!sort)
        }}
          className='sort-type hover:text-sec-color-light hover:cursor-pointer'>
          <span className='mx-1'>{(sort) ? "Ascending" : "Descending"}</span>
          <FontAwesomeIcon icon={(sort) ? faChevronUp : faChevronDown} size='sm' />
        </div>
      </div>
      <div className='grid gap-2 mt-2 grid-cols-1 lg:grid-cols-3 md:grid-cols-2'>
        {data ? data.map((e) => <SurahCard key={e.surah_number} surahInfo={e} />) : numbers.map((e) => <SurahCardSkeleton key={e} />)}
      </div>
    </div>
  </>
}
