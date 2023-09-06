import NextSeoWrapper from "@/components/NextSeoWrapper";
import { surahDetailAtom } from "@/components/atoms/surah-detail-atom";
import { surahInfoAtom } from "@/components/atoms/surah-info-atom";
import Navbar from "@/components/navbar";
import DetailContainer from "@/components/surah-detail/detail-container";
import { SurahDetail } from "@/types/surah-detail";
import { SurahInfo } from "@/types/surah-info-type";
import { useAtom } from "jotai";
import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect } from "react";

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const surahId = String(ctx.params?.surah)

  if (surahId.match(/[0-9]/i) && (parseInt(surahId) < 115 && parseInt(surahId) > 0)) {
    const surahInfo = await import(`@/quran/surah/surah_${surahId}/surah_info.json`).then((data) => data.default)
    const surahDetail = await import(`@/quran/surah/surah_${surahId}/surah_detail.json`)

    return {
      props: { surahInfo, surahDetail }
    }
  }

  return { notFound: true }
}

const Page = ({ surahInfo, surahDetail }: { surahInfo: SurahInfo, surahDetail: SurahDetail }) => {
  const [, setSurahInfo] = useAtom(surahInfoAtom);
  const [, setSurahDetail] = useAtom(surahDetailAtom);

  useEffect(() => {
    setSurahInfo(undefined);
    setSurahDetail(undefined);
    setSurahInfo(surahInfo);
    setSurahDetail(surahDetail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>
    <NextSeoWrapper
      title={`Detail Surah ${surahInfo.name} Bahasa Indonesia`}
      description={surahDetail.shortText.length > 150 ?
        surahDetail.shortText.slice(0, 150) + "..." :
        surahDetail.shortText
      }
      url={`quranlet.vercel.app/detail/${surahInfo.surah_number}`}
    />
    <Navbar />
    <div className="w-11/12 md:w-3/5 m-auto p-4">
      <DetailContainer />
    </div>
  </>
}

export default Page;