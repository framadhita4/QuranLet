// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fs } from "fs";

const quranDir: string = path.join(process.cwd(), "quran");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const content = await fs.readFile(`${quranDir}/quran.json`, "utf8");
  res.status(200).json(JSON.parse(content));
}
