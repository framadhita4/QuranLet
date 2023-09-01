import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import type { SurahInfo } from "@/types/surah-info-type";

const quranDir: string = path.join(process.cwd(), "quran");

const resPage = (pageNumber: number, surahInfo: SurahInfo) => {
  const totalPage = Math.ceil(surahInfo?.ayahs / 6);
  let ayahs = 1;
  const totalVerses = () => {
    if (pageNumber < totalPage) return 6;
    const totalLastVerses =
      surahInfo?.ayahs - 6 * Math.floor(surahInfo?.ayahs / 6);
    if (totalLastVerses == 0) return 6;
    return totalLastVerses;
  };

  if (pageNumber > totalPage) return null;

  const verses: object[] = [];

  for (let i = 1; i <= totalVerses(); i++) {
    verses.push(
      JSON.parse(
        fs.readFileSync(
          `${quranDir}/surah/surah_${surahInfo?.surah_number}/verses_${
            i + 6 * (pageNumber - 1)
          }.json`,
          "utf-8"
        )
      )
    );
    ayahs++;
  }

  return {
    verses,
    pagination: {
      current_page: pageNumber,
      ayahs: ayahs,
      next_page: pageNumber + 1 > totalPage ? null : pageNumber + 1,
      total_pages: totalPage,
    },
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const surah = req.query.surah?.toString();
  const page = req.query.page?.toString();
  const ayah = req.query.ayah?.toString();

  const res404 = () => {
    res.status(404).send("file not found");
  };

  if (!surah) {
    res404();
    return;
  }

  if (surah.match(/[0-9]/i) && Math.abs(parseInt(surah)) > 114) {
    return res404();
  }

  const surahInfo: SurahInfo = JSON.parse(
    fs.readFileSync(`${quranDir}/surah/surah_${surah}/surah_info.json`, "utf8")
  );

  if (page?.match(/[0-9]/i)) {
    const content = resPage(parseInt(page), surahInfo);
    if (!content) return res404();

    return res.status(200).json(content);
  }

  if (ayah?.match(/[0-9]/i)) {
    const content = fs.readFileSync(
      `${quranDir}/surah/surah_${surah}/verses_${ayah}.json`,
      "utf8"
    );
    return res.status(200).json(JSON.parse(content));
  }

  res.status(200).json(surahInfo);
}
