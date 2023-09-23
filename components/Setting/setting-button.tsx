import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import SettingContainer from "./setting-container";
import { useAtom } from "jotai";
import { settingAtom } from "../atoms/setting-atom";

type AppProps = { active: boolean | undefined }

export default function Setting({ active }: AppProps) {
  const [offCanvas, setCanvas] = useState(false);
  const [isHover, setHover] = useState(false);
  let ref = useRef<HTMLDivElement>(null);
  const [setting] = useAtom(settingAtom);

  useEffect(() => {
    document.documentElement.className = setting.theme ? "dark" : "";
  }, [setting.theme])

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node) && !ref.current.parentNode?.contains(e.target as Node)) {
        setCanvas(!offCanvas)
      };
    }

    document.addEventListener("mousedown", clickHandler)
    return () => {
      document.removeEventListener("mousedown", clickHandler)
    }
  });

  return <>
    <div onClick={() => { setCanvas(!offCanvas); setHover(false) }} onMouseEnter={() => { setHover(true) }} onMouseLeave={() => { setHover(false) }}
      className={`hover:cursor-pointer overflow-hidden p-2 rounded-full transition duration-200 active:scale-90`}>
      <div className={`z-10 overflow-hidden bg-gray-700 dark:bg-zinc-300 p-2 w-[40px] h-[40px] -translate-x-2 -translate-y-2 rounded-full absolute transition-all duration-300 ease-in-out ${(isHover || offCanvas) ? "mask-hover" : "mask"}`} >
        <div className="absolute">
          <FontAwesomeIcon className="translate-x-[1px] px-[2px] text-center text-white dark:text-pri-color-dark" icon={faGear} size={"lg"} />
        </div>
      </div>
      <FontAwesomeIcon className="translate-x-[1px] px-[2px] text-center text-gray-700 dark:text-zinc-300" icon={faGear} size={"lg"} />
    </div>
    <CSSTransition
      nodeRef={ref}
      in={offCanvas && active}
      unmountOnExit
      timeout={300}
      classNames={"off-canvas"}>
      <div ref={ref} className="fixed p-2 rounded-md z-10 flex bg-white dark:bg-sec-color-dark top-14 left-4 right-4 drop-shadow-[0_0_3px_rgba(0,0,0,0.15)] sm:w-80 sm:right-8 sm:left-auto">
        <SettingContainer />
      </div>
    </CSSTransition>
  </>
}