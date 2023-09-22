import { currentVerseAtom, navigationVerseAtom } from "@/components/atoms/nav-atom";
import { surahInfoAtom } from "@/components/atoms/surah-info-atom"
import scrollToElement from "@/utils/scrollToElement";
import { useAtom } from "jotai"

export default function VerseNav() {
  const [surahInfo] = useAtom(surahInfoAtom);
  const [, setNavigationVerse] = useAtom(navigationVerseAtom);
  const [currentVerse] = useAtom(currentVerseAtom);
  if (!surahInfo) return <></>

  const numbers = Array.from({ length: surahInfo.ayahs }, (_, i) => i + 1);

  const clickHandler = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, i: number) => {
    event.preventDefault();
    window.history.pushState({}, "", `/${surahInfo.surah_number}?verse=${i}`);

    const verse = document.getElementById(`${surahInfo.surah_number}:${i}`);
    if (!verse) return;
    setNavigationVerse(`${i}`);
    scrollToElement(verse);
  }

  return <div className="w-12 max-h-80 overflow-scroll flex flex-col">
    {numbers.map((e) => <a
      onClick={(event) => { clickHandler(event, e) }}
      key={e}
      href={``}
      className={`p-2 rounded-md hover:bg-slate-100 dark:hover:bg-pri-color-dark cursor-pointer ${(currentVerse == `${e}`) ? "font-semibold bg-slate-100 dark:bg-pri-color-dark" : ""}`}
    >
      {e}
    </a>)}
  </div>
}