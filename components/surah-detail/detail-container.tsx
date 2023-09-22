import { useAtom } from "jotai";
import { surahInfoAtom } from "../atoms/surah-info-atom";
import { surahDetailAtom } from "../atoms/surah-detail-atom";
import { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function DetailContainer({ children }: { children?: ReactElement }) {
  const [surahInfo] = useAtom(surahInfoAtom);
  const [surahDetail] = useAtom(surahDetailAtom);

  if (!surahDetail || !surahInfo) return <></>;

  return <>
    <div className="flex justify-between font-bold text-base items-center">
      <div>
        <h1 className="text-xl">
          {surahInfo?.name} <span className="text-base">({surahInfo?.translation.id})</span>
        </h1>
        <p>
          {surahInfo?.type} - {surahInfo?.ayahs} Ayat
        </p>
      </div>
      {children ? children :
        <Link href={`/${surahInfo.surah_number}`} className="font-semibold p-2 rounded-full dark:hover:bg-sec-color-dark hover:bg-slate-100 md:rounded md:after:content-['Lihat\a0Surah'] flex items-center gap-1" >
          <FontAwesomeIcon icon={faArrowLeft} className="w-6 h-6 md:w-4 md:h-4" />
        </Link>
      }
    </div>
    <div className="w-full h-[1px] bg-gray-300 dark:bg-zinc-300 my-4"></div>
    <div dangerouslySetInnerHTML={{ __html: surahDetail?.text }} className="font-normal text-justify text-sm sm:text-base flex flex-col gap-3 [&>h2]:font-bold [&>h3]:font-bold" />
  </>
}