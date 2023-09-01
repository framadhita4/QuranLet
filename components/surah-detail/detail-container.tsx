import { useAtom } from "jotai";
import { surahInfoAtom } from "../atoms/surah-info-atom";
import { surahDetailAtom } from "../atoms/surah-detail-atom";
import { ReactElement } from "react";

export default function DetailContainer({ children }: { children?: ReactElement }) {
  const [surahInfo] = useAtom(surahInfoAtom);
  const [surahDetail] = useAtom(surahDetailAtom);

  if (!surahDetail || !surahInfo) return <></>;

  return <>
    <div className="flex justify-between font-bold text-base">
      <div>
        <h1 className="text-2xl">
          {surahInfo?.name} <span className="text-base">({surahInfo?.translation.id})</span>
        </h1>
        <p>
          {surahInfo?.type} - {surahInfo?.ayahs} Ayat
        </p>
      </div>
      {children}
    </div>
    <div className="w-full h-[1px] bg-gray-300 my-4"></div>
    <div dangerouslySetInnerHTML={{ __html: surahDetail?.text }} className="font-normal text-justify flex flex-col gap-3 [&>h2]:font-bold [&>h3]:font-bold" />
  </>
}