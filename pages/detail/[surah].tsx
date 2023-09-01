import { surahDetailAtom } from "@/components/atoms/surah-detail-atom";
import { surahInfoAtom } from "@/components/atoms/surah-info-atom";
import Navbar from "@/components/navbar";
import DetailContainer from "@/components/surah-detail/detail-container";
import { surahDetail } from "@/types/surah-detail";
import { SurahInfo } from "@/types/surah-info-type";
import { useAtom } from "jotai";
import { useRouter } from "next/router"
import { useEffect } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const router = useRouter();
  const [, setSurahInfo] = useAtom(surahInfoAtom);
  const [, setSurahDetail] = useAtom(surahDetailAtom);

  const getData = async () => {
    try {
      await fetcher(`/api/${router.query.surah}`).then((data: SurahInfo) => setSurahInfo(data));
      await fetcher(`/api/detail/${router.query.surah}`).then((data: surahDetail) => setSurahDetail(data));
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    if (router.isReady) {
      setSurahInfo(undefined);
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return <>
    <Navbar />
    <div className="w-11/12 md:w-3/5 m-auto p-4">
      <DetailContainer />
    </div>
  </>
}