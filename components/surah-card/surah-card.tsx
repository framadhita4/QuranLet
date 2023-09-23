import { surahIconFont } from "@/pages/_app";
import type { SurahInfo } from "@/types/surah-info-type";
import Link from "next/link";

type AppProps = { surahInfo: SurahInfo };

export default function SurahCard({ surahInfo }: AppProps) {
  return <>
    <Link href={`/${surahInfo.surah_number}`} className={`${surahInfo.name.toLowerCase()} active:scale-95 group`}>
      <div className="flex justify-between p-3 group-hover:glow dark:border-zinc-300 border-2 rounded-lg dark:group-hover:border-sec-color-light group-hover:border-sec-color-light">
        <div className="flex justify-center items-center">
          <div className="flex items-center justify-center rounded rotate-45 w-10 h-10 bg-gray-200 dark:bg-sec-color-dark ml-1 mr-4 group-hover:bg-sec-color-light">
            <span className="-rotate-45 m-2 group-hover:text-white">{surahInfo.surah_number}</span>
          </div>
          <div>
            <h2>{surahInfo.name}</h2>
            <p className="text-[12px] w-32 overflow-ellipsis whitespace-nowrap overflow-hidden text-gray-500 group-hover:text-sec-color-light">{surahInfo.translation.id}</p>
          </div>
        </div>
        <div className="text-center w-20">
          <div className={`icon-${surahInfo.surah_number} text-2xl ${surahIconFont.className}`}></div>
          <p className="text-[12px] text-gray-500 group-hover:text-sec-color-light">{surahInfo.ayahs} Ayat</p>
        </div>
      </div>
    </Link>
  </>
}