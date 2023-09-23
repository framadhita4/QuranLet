/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import Search from './search';
import { SurahInfo } from '@/types/surah-info-type';
import { useAtom } from 'jotai';
import { settingAtom } from './atoms/setting-atom';
import Link from 'next/link';

const NewLink = ({ children, href }: { children: React.ReactNode, href: string }) => {
  return <Link href={href} className='w-fit py-2 px-3 bg-white rounded-full text-gray-700 text-sm hover:text-gray-500'>{children}</Link>
}

export const recommendations = [
  {
    name: "Ayat Kursi",
    href: "/2?verse=255"
  },
  {
    name: "Surah Yasin",
    href: "/36"
  },
  {
    name: "Surah Al-Mulk",
    href: "/67"
  },
  {
    name: "Surah Al-Kahf",
    href: "/18"
  },
]

export default function Header({ data }: { data: SurahInfo[] }) {
  const [settings] = useAtom(settingAtom);

  return (
    <header className=' bg-gradient-to-br dark:from-sec-color-dark dark:to-pri-color-dark from-pri-color-light to-thr-color-light flex-col p-2 pt-14 pb-8 flex'>
      <div className='p-2 md:px-8'>
        <div className='text-center'>
          <div className='m-auto my-6 w-36 p-8 bg-white rounded-full'>
            <Image src={`${settings.theme ? "/quran-dark.svg" : "/quran.svg"}`} alt="qur'an logo" width={1000} height={1000} />
          </div>
        </div>
      </div>
      <Search quranList={data} />
      <div className='flex flex-wrap justify-center gap-3 w-full sm:w-4/6 md:w-3/6 pt-6 m-auto'>
        <NewLink href={"/tentang-alquran"} >Apa Itu Al-Quran</NewLink>
        {
          recommendations.map(({ name, href }, i) => <NewLink key={i} href={href}>{name}</NewLink>)
        }
      </div>
    </header>
  )
}