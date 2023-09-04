import type { SurahInfo } from "@/types/surah-info-type";
import Link from "next/link";

type AppProps = { surahInfo: SurahInfo };

export default function SurahCard({ surahInfo }: AppProps) {
  return <>
    <Link href={`/${surahInfo.surah_number}`} className={`${surahInfo.name.toLowerCase()} [&>div>div:nth-child(2)>p]:hover:text-sec-color-light [&>div>div:nth-child(1)>div:nth-child(2)>p]:hover:text-sec-color-light [&>div]:hover:border-sec-color-light [&>div>div:nth-child(1)>div:nth-child(1)]:hover:bg-sec-color-light [&>div>div:nth-child(1)>div:nth-child(1)]:hover:text-white transition-all duration-300 active:scale-95`}>
      <div className="flex justify-between bg-white p-3 border-2 rounded-lg  transition-all duration-300">
        <div className="flex justify-center items-center transition-all duration-300">
          <div className="flex items-center justify-center rounded rotate-45 w-10 h-10 bg-gray-200 ml-1 mr-4 transition-all duration-300">
            <span className="-rotate-45 m-2 transition-all duration-300">{surahInfo.surah_number}</span>
          </div>
          <div>
            <h2>{surahInfo.name}</h2>
            <p className="text-[12px] w-32 overflow-ellipsis whitespace-nowrap overflow-hidden text-gray-500 transition-all duration-300">{surahInfo.translation.id}</p>
          </div>
        </div>
        <div className="text-center w-20">
          <div className={`icon-${surahInfo.surah_number} text-2xl`}></div>
          <p className="text-[12px] text-gray-500 transition-all duration-300">{surahInfo.ayahs} Ayat</p>
        </div>
      </div>
    </Link>
  </>
}