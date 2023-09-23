import { surahIconFont } from "@/pages/_app";
import { RecentlyRead } from "@/types/recently-type";
import Link from "next/link";

export default function RecentlyReadCard({ recentlyRead }: { recentlyRead: RecentlyRead | undefined }) {
  return <>{recentlyRead && <Link href={`/${recentlyRead.surahInfo?.surah_number}?verse=${recentlyRead.ayah}`} className="w-40 p-3 rounded-lg border-2 dark:border-zinc-300 group hover:glow hover:border-sec-color-light dark:hover:border-sec-color-light">
    <div>
      <div className="flex justify-between font-semibold leading-5">
        <p>Surah <br /> {recentlyRead.surahInfo?.name}</p>
        <p>{recentlyRead.surahInfo?.surah_number}</p>
      </div>
      <p className="text-[12px] w-32 overflow-ellipsis whitespace-nowrap overflow-hidden text-gray-500 group-hover:text-sec-color-light">{recentlyRead.surahInfo?.translation.id}</p>
    </div>
    <div className="rounded-lg w-full py-4 bg-gray-200 dark:bg-sec-color-dark mt-3">
      <div className="m-auto w-fit text-center">
        <div className={`icon-${recentlyRead.surahInfo?.surah_number} ${surahIconFont.className} text-2xl`} />
        <p className="font-semibold text-gray-700 dark:text-gray-500 text-xs group-hover:text-sec-color-light">Ayat {recentlyRead.ayah}</p>
      </div>
    </div>
  </Link>
  }</>
} 