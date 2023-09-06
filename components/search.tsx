import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { CSSTransition } from "react-transition-group";

type AppProps = { quranList: string[] | undefined };

export default function Search({ quranList }: AppProps) {
  const data: string[] | undefined = quranList?.map((e: string) => e.toLowerCase());
  const [searchQuery, setQuery] = useState("");
  const [isFocus, setFocus] = useState(false);
  const [isHover, setHover] = useState(false);

  const searchable = () => data?.some((e) => e == searchQuery?.toLowerCase());
  const searchHandler = () => {
    if (searchable()) {
      document.querySelector(`.${searchQuery.replace(" ", ".")}`)?.scrollIntoView();
    }
  }

  return (<>
    <div className='flex relative items-center w-full m-auto mb-2 text-gray-700 sm:w-[600px] p-2 sm:p-0'>
      <input autoComplete="off"
        placeholder="Cari Nama Surah"
        type="search"
        name="search"
        id="search"
        className='relative search-query rounded-l-full p-2 pl-4 h-14 w-11/12 outline-none'
        onBlur={() => { setFocus(false) }} onFocus={() => { setFocus(true) }}
        onChange={(e) => { setQuery(e.target.value) }}
        value={searchQuery} />
      <CSSTransition
        in={searchQuery !== "" && isFocus && !searchable()}
        unmountOnExit
        timeout={100}
        classNames={"search-suggest"}>
        <div className="z-[5] absolute top-[70px] sm:top-16 drop-shadow-[0_0_3px_rgba(0,0,0,0.5)] w-[95%] max-h-[15rem] overflow-hidden bg-white rounded-lg flex flex-col sm:w-[87%]">
          {data?.filter((e: string) => e.match(searchQuery?.toLowerCase() || "")).map((e: string) => <li className="list-none p-2 rounded cursor-pointer hover:bg-gray-200" key={e} onMouseDown={() => setQuery(e)}>{e}</li>)}
        </div>
      </CSSTransition>
      <button onMouseEnter={() => { setHover(true) }} onMouseLeave={() => { setHover(false) }} className={`z-[1] overflow-hidden text-white border-[3px] border-white hover:cursor-pointer w-20 h-14 rounded-r-full duration-500 ease-in-out transition-all search ring-0 focus:outline-none search bg-clip-border ${(isHover) ? "search-100" : "search-0"}`} onClick={searchHandler}>
        <FontAwesomeIcon className={`duration-300 delay ease-in-out ${(isHover) ? "text-white" : "text-sec-color-light"}`} icon={faSearch} size={"lg"} />
      </button>
    </div>
  </>);
}