import NextSeoWrapper from "@/components/NextSeoWrapper";
import { surahDetailAtom } from "@/components/atoms/surah-detail-atom";
import { surahInfoAtom } from "@/components/atoms/surah-info-atom";
import Navbar from "@/components/navbar/navbar";
import DetailContainer from "@/components/surah-detail/detail-container";
import { SurahDetail } from "@/types/surah-detail";
import { SurahInfo } from "@/types/surah-info-type";
import { useHydrateAtoms } from "jotai/utils";
import { GetStaticPaths, GetStaticProps } from "next";

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
    const surahDetail = await import(`@/quran/surah/surah_${surahId}/surah_detail.json`).then((data) => data.default)

    return {
      props: { surahInfo, surahDetail }
    }
  }

  return { notFound: true }
}

const Page = ({ surahInfo, surahDetail }: { surahInfo: SurahInfo, surahDetail: SurahDetail }) => {
  useHydrateAtoms([[surahInfoAtom, surahInfo]]);
  useHydrateAtoms([[surahDetailAtom, surahDetail]]);

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