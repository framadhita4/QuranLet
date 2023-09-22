import { useAtom } from "jotai";
import { useRef } from "react"
import { CSSTransition } from "react-transition-group"
import { detailCanvasAtom } from "../atoms/surah-detail-atom";
import { surahInfoAtom } from "../atoms/surah-info-atom";
import Button from "../Surah-Page/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import DetailContainer from "./detail-container";


export default function SurahDetailCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [detailCanvas, setDetailCanvas] = useAtom(detailCanvasAtom);
  const [surahInfo] = useAtom(surahInfoAtom);

  const clickHandler = () => {
    if (!detailCanvas) return;

    setDetailCanvas(!detailCanvas);
    window.history.pushState({}, "", `/${surahInfo?.surah_number}`);

    document.body.style.overflow = 'auto';
  }

  return <CSSTransition
    in={detailCanvas}
    classNames={`detail-card`}
    unmountOnExit
    timeout={200} >
    <div onClick={(event) => { if (event.target != event.currentTarget) return; clickHandler() }} className="z-[52] h-screen w-screen overflow-scroll pt-24 pb-12 fixed top-0">
      <div ref={ref} className='w-11/12 md:w-9/12 bg-white dark:bg-sec-color-dark dark:shadow-lg m-auto rounded-xl p-6 md:p-8'>
        <DetailContainer>
          <Button onClick={clickHandler}>
            <FontAwesomeIcon icon={faXmark} size="xl" />
          </Button>
        </DetailContainer>
      </div>
    </div>
  </CSSTransition>
}