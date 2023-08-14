import { Verses } from "@/types/verses-type";
import { SurahInfo } from "@/types/surah-info-type";
import { VersesPage } from "@/types/verses-page-type";
import Button from "./button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faXmark } from "@fortawesome/free-solid-svg-icons";
import Word from "./word";
import { useRef, useState, useEffect } from "react";
import VerseBoxSkeleton from "./verse-box-skeleton";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Verses({verses, id}: {verses: Verses, id: number}) {
  const textRef = useRef<HTMLDivElement>(null);
  const [ isActive, setActive ] = useState(false);
  const [ footNote, setFootNote ] = useState<{text: string}>();
  const regex = /(<sup foot_note_id="\d+">\d+<\/sup>)/g;
  const text = verses.translation.text;

  const supHandler = async (footNoteId: string | undefined) => {
    try {
      const data = await fetcher(`/api/footnote?id=${footNoteId}`);
      setFootNote(data);
      setActive(true);
    }catch (error) {
      console.error(error)
    }
  }

  const parseStringToElement = (text: string) => {
    const footNoteId = text.match(/"\d+"/g)?.[0].replace(/"/g, "");
    const footNoteNumber = text.match(/>\d/g)?.[0].replace(">", "");

    return <sup className="p-1 cursor-pointer hover:text-sec-color-light" onClick={() => {supHandler(footNoteId)}}>{footNoteNumber}</sup>
  }

  return <div id={`${id}`} className="border-b-2 mt-10 py-4 flex flex-wrap md:flex-nowrap">
    <div className="mr-10 mb-4 md:mb-0 flex md:flex-col items-center gap-1">
      <Button>
        <p className="text-sm">{verses.verse_key}</p>
      </Button>
      <Button>
        <FontAwesomeIcon className="" icon={faPlay}/>
      </Button>
    </div>
    <div className="w-full">
      <div className={`flex justify-start flex-row-reverse flex-wrap mb-8`}>
        {verses.words.map((e, i) => {
          return <Word key={e.id} verse={e} isLast={i == verses.words.length - 1}/>
        })}
      </div>
      <div ref={textRef} className="font-normal text-base mb-6 text-justify ">
        {text.split(regex).map((e) => {
          if (!e.match(regex)) return e;
          return parseStringToElement(e);
        })}
      </div>
      {isActive && 
        <div className="border-2 rounded-lg bg-slate-50 p-6 mb-6 text-gray-700">
          <div className="flex justify-between items-center mb-4 -mt-1">
            <h2>Footnote</h2>
            <Button onClick={() => {setActive(false)}}><FontAwesomeIcon className="text-gray-700" icon={faXmark}/></Button>
          </div>
          <p className="font-normal text-justify">{footNote?.text}</p>
        </div>
      }
    </div>
  </div>
}

export default function VerseBox({id, surahInfo}: {id: number, surahInfo: SurahInfo}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState(false);
  const [pages, setPages] = useState<VersesPage>();
  const requestRef = useRef<boolean>(false);
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;  

    if(id == 1) setScroll(true);
    
    const handleScroll = () => {
      if(scroll) setScroll(false);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if(!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        setScroll(!(rect.bottom < 0 || rect.top - viewHeight >= 0));
      }, 100);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll)
    };
  }, []);

  useEffect(() => {
    if(!scroll || !ref.current || requestRef.current) return;

    const  getPage = async (page: string | null, callBack: Function) => {
      if(!page) return;
      const data =  await fetcher(`/api/${surahInfo?.surah_number}?page=${id}`);
      callBack(data)
    }

    requestRef.current = true
    getPage(ref.current?.getAttribute("id"), (data: any) => {
      setPages(data);
      setScroll(false);
    })
  }, [scroll])

  if (!pages) {
    const numbers = Array.from({length: 6}, (_, i) => i + 1);
    return <div ref={ref} id={`${id}`}>{numbers.map((e) => <VerseBoxSkeleton id={e + ((id-1)*6)} key={e}/>)}</div>
  }

  return <div id={`${id}`}>{
    pages.verses.map((e, i) => <Verses id={i + 1 + ((id-1)*6)} key={id + (id*6)} verses={e} />)
  }</div>
}