/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import Link from 'next/link';
import Search from './search';

type AppProps = { data: string[] | undefined };

export default function Header({ data }: AppProps) {
  return (
    <header className='flex bg-gradient-to-br from-pri-color-light to-thr-color-light flex-col p-2 pt-14'>
      <div className='p-2 md:px-8'>
        <div className='text-center'>
          <div className='m-auto my-6 w-36 p-8 bg-white rounded-full'>
            <Image src="/quran.svg" alt="qur'an logo" width={1000} height={1000} />
          </div>
        </div>
      </div>
      <Search quranList={data} />
      <Link href={"/about"} className='my-2 m-auto py-1 px-3 bg-white rounded-full text-gray-700 text-sm hover:text-gray-500'>Apa Itu Al-Qur'an</Link>
    </header>
  )
}