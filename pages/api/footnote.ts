// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";

const quranDir: string = path.join(process.cwd(), "quran");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id?.toString();

  if (id?.match(/[0-9]/i)) {
    const content = JSON.parse(
      fs.readFileSync(`${quranDir}/foot_notes/foot_note_${id}.json`, "utf-8")
    );

    return res.status(200).json(content);
  }

  res.status(404).send("file not found");
}
