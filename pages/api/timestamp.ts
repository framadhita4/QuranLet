// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import { Timestamp } from "@/types/timestamps";

const quranDir: string = path.join(process.cwd(), "quran");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const surah: string | undefined = req.query.surah?.toString();
  const verseKey: string | undefined = req.query.verse_key?.toString();

  if (surah == undefined) return res.status(404).send("file not found");

  const content: Timestamp = JSON.parse(
    fs.readFileSync(`${quranDir}/timestamps/timestamp_${surah}.json`, "utf-8")
  );

  if (verseKey != undefined && verseKey.match(/[0-9]:[0-9]/i)) {
    content.verse_timings = content.verse_timings.filter(
      (e: { verse_key: string }) => e.verse_key == verseKey
    );
  }

  return res.status(200).json(content);
}
