import { surahIconFont } from "@/pages/_app";
import { RecentlyRead } from "@/types/recently-type";
import Link from "next/link";

export default function RecentlyReadCard({ recentlyRead }: { recentlyRead: RecentlyRead | undefined }) {
  return <>{recentlyRead && <Link href={`/${recentlyRead.surahInfo?.surah_number}?verse=${recentlyRead.ayah}`} className="w-40 p-3 rounded-lg border-2 group hover:border-sec-color-light transition-all duration-150">
    <div>
      <div className="flex justify-between font-semibold leading-5">
        <p>Surah <br /> {recentlyRead.surahInfo?.name}</p>
        <p>{recentlyRead.surahInfo?.surah_number}</p>
      </div>
      <p className="text-[12px] w-32 overflow-ellipsis whitespace-nowrap overflow-hidden text-gray-500 transition-all duration-150 group-hover:text-sec-color-light">{recentlyRead.surahInfo?.translation.id}</p>
    </div>
    <div className="rounded-lg w-full py-4 bg-gray-200 mt-3">
      <div className="m-auto w-fit text-center">
        <div className={`icon-${recentlyRead.surahInfo?.surah_number} ${surahIconFont.className} text-2xl`} />
        <p className="font-semibold text-gray-700 text-xs group-hover:text-sec-color-light transition-all duration-150">Ayat {recentlyRead.ayah}</p>
      </div>
    </div>
  </Link>
  }</>
} 