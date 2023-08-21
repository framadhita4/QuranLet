import Header from '@/components/header';
import SurahCard from '@/components/surah-card/surah-card';
import Navbar from '@/components/navbar';
import SurahCardSkeleton from '@/components/surah-card/surah-card-sekeleton';
import type { SurahInfo } from '@/types/surah-info-type';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import useSWR from "swr";
import { useState, useEffect } from 'react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR<Array<SurahInfo>>("/api/quran", fetcher);
  const [surahList, setSurahList] = useState<Array<SurahInfo>>();
  const [sort, setSort] = useState<boolean>(true);
  const numbers = Array.from({ length: 114 }, (_, index) => index + 1);
  useEffect(() => setSurahList(data), [data]);

  if (error) return <div>Failed to load</div>;

  return <>
    <Navbar surahInfo={undefined} />
    <Header data={data?.map(e => e.name.toLowerCase())} />
    <div className='p-2 m-auto text-gray-700 md:w-11/12 md:mt-4'>
      <div className='px-2 border-b-2'>
        <p>Surah</p>
      </div>
      <div className='flex px-2 text-sm justify-end'>
        <p>Sort By : </p>
        <div onClick={() => {
          setSurahList(surahList?.reverse());
          setSort(!sort)
        }}
          className='sort-type hover:text-sec-color-light hover:cursor-pointer'>
          <span className='mx-1'>{(sort) ? "Ascending" : "Descending"}</span>
          <span className='-mt-1 text-[12px]'>
            <FontAwesomeIcon icon={(sort) ? faChevronUp : faChevronDown} className="-mt-1" />
          </span>
        </div>
      </div>
      <div className='grid gap-2 mt-2 grid-cols-1 lg:grid-cols-3 md:grid-cols-2'>
        {surahList ? surahList.map((e) => <SurahCard key={e.surah_number} surahInfo={e} />) : numbers.map((e) => <SurahCardSkeleton key={e} />)}
      </div>
    </div>
  </>
}