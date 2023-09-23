import { useAtom } from "jotai";
import { surahInfoAtom } from "../atoms/surah-info-atom";
import Link from "next/link";

export default function SurahNavigator() {
  const [surahInfo] = useAtom(surahInfoAtom);
  const className = "border-[1.5px] p-2 rounded hover:glow hover:border-sec-color-light hover:text-sec-color-light"

  const clickHandler = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }

  return <>{surahInfo &&
    <div className="flex flex-wrap items-center gap-2 justify-center mt-6 mb-16 text-sm sm:text-base">
      {surahInfo.surah_number > 1 &&
        <Link className={className} href={`/${surahInfo.surah_number - 1}`}>
          {"< Surah sebelumnya"}
        </Link>
      }
      <div onClick={clickHandler} className={"cursor-pointer " + className}>Ke awal surah</div>
      {surahInfo.surah_number < 114 &&
        <Link className={className} href={`/${surahInfo.surah_number + 1}`}>
          {"Surah selanjutnya >"}
        </Link>
      }
    </div>
  }</>
}