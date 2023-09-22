import { SurahInfo } from "@/types/surah-info-type";
import { useAtom } from "jotai";
import { surahInfoAtom } from "@/components/atoms/surah-info-atom";
import Link from "next/link";

export default function SurahNav({ quran }: { quran: Array<SurahInfo> | undefined }) {
  const [surahInfo] = useAtom(surahInfoAtom);

  if (!quran || !surahInfo) return <></>;

  return <div className="w-36 max-h-80 overflow-scroll flex flex-col">
    {quran.map((e) => <Link
      key={e.surah_number}
      href={`/${e.surah_number}`}
      className={`p-2 rounded-md hover:bg-slate-100 dark:hover:bg-pri-color-dark cursor-pointer ${surahInfo.name == e.name ? "font-semibold bg-slate-100 dark:bg-pri-color-dark" : ""}`}
    >
      {e.name}
    </Link>)}
  </div>
}