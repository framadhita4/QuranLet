import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";

const quranDir: string = path.join(process.cwd(), "quran");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const surah = req.query.surah?.toString();

  const res404 = () => {
    res.status(404).send("file not found");
  };

  const content = fs.readFileSync(
    `${quranDir}/surah/surah_${surah}/surah_detail.json`,
    "utf8"
  );

  res.status(200).json(JSON.parse(content));
}
