import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';

export default function SurahDetailButton() {
  const [ isActive, setActive ] = useState(false);
  let infoRef = useRef<HTMLDivElement>(null); 
  useEffect(() => {
    const clickHandler = (e:MouseEvent) => {
      if (isActive && infoRef.current && !infoRef.current.contains(e.target as Node) && !infoRef.current.parentNode?.contains(e.target as Node)) setActive(!isActive);
    }

    document.addEventListener("mousedown", clickHandler)
    return () => {
      document.removeEventListener("mousedown", clickHandler)
    }
  });

  return <>
    <button onClick={() => setActive(!isActive)} className='flex items-center h-7 hover:bg-slate-200 px-2 pr-4 rounded transition-all'>
      <p className={`text-sec-color-light font-semibold`}>Detail Surah</p>
      <FontAwesomeIcon icon={faInfo} size='sm' className={`z-[2] ml-1 -mr-[9px] text-white py-1 px-2 rounded-full transition-all}`}></FontAwesomeIcon>
    </button>
    <div ref={infoRef} className={`z-[1] absolute rounded-xl left-0 right-0 h-60 bg-gradient-to-br from-pri-color-light to-thr-color-light transition-all duration-1000 ease-in-out ${isActive? "info-on" : "info-off"}`}></div>
  </>
}