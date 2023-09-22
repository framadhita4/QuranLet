/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import Search from './search';
import { SurahInfo } from '@/types/surah-info-type';
import { useAtom } from 'jotai';
import { settingAtom } from './atoms/setting-atom';

export default function Header({ data }: { data: SurahInfo[] }) {
  const [settings] = useAtom(settingAtom);

  return (
    <header className=' bg-gradient-to-br dark:from-sec-color-dark dark:to-pri-color-dark from-pri-color-light to-thr-color-light flex-col p-2 pt-14 pb-8'>
      <div className='p-2 md:px-8'>
        <div className='text-center'>
          <div className='m-auto my-6 w-36 p-8 bg-white rounded-full'>
            <Image src={`${settings.theme ? "/quran-dark.svg" : "/quran.svg"}`} alt="qur'an logo" width={1000} height={1000} />
          </div>
        </div>
      </div>
      <Search quranList={data} />
      {/* <Link href={"/about"} className='my-2 m-auto py-1 px-3 bg-white rounded-full text-gray-700 text-sm hover:text-gray-500'>Apa Itu Al-Qur'an</Link> */}
    </header>
  )
}