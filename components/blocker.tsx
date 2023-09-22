import { useAtom } from "jotai";
import { useRef } from "react"
import { detailCanvasAtom } from "./atoms/surah-detail-atom";
import { CSSTransition } from "react-transition-group";

export default function Blocker() {
  const ref = useRef<HTMLDivElement>(null);
  const [detailCanvas] = useAtom(detailCanvasAtom);

  return <CSSTransition
    nodeRef={ref}
    in={detailCanvas}
    classNames={`blocker`}
    unmountOnExit
    timeout={500} >
    <div ref={ref} className='fixed top-0 left-0 w-full h-full bg-gray-900 dark:bg-opacity-0 bg-opacity-20 z-[51] overflow-scroll py-20' />
  </CSSTransition>
}