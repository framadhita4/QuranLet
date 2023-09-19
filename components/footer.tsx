import Link from "next/link";

const recommendations = [
  {
    name: "Ayat Kursi",
    href: "/2?verse=255"
  },
  {
    name: "Surah Yasin",
    href: "/36"
  },
  {
    name: "Surah Al-Mulk",
    href: "/67"
  },
  {
    name: "Surah Ar-Rahman",
    href: "/55"
  },
  {
    name: "Surah Al-Waqi'ah",
    href: "/56"
  },
  {
    name: "Surah Al-Kahf",
    href: "/18"
  },
  {
    name: "Surah Al-Muzammil",
    href: "/73"
  }
]

export default function Footer() {
  return <div className="text-sm sm:text-base p-5 m-auto text-gray-700 md:w-11/12 sm:flex sm:gap-32 mb-12 border-t-2">
    <div className="flex-1 mb-10">
      <h1 className="text-xl font-semibold">Quranlet</h1>
      <h2 className="text-sm sm:text-base font-bold my-2">Al-Quran dengan terjamahan dan tafsir bahasa Indonesia</h2>
      <p>Proyek ini terinspirasi dari website <a className="underline" href="https://quran.com">quran.com</a>.<br />Jika ada kesalahan pada terjemahan, pengetikan atau tampilan silakan buat issue pada repository <a className="underline" href="https://github.com/framadhita4/QuranLet">github</a> proyek ini atau hubungi saya lewat <a className="underline" href="https://www.instagram.com/framadhita_/">IG</a>.</p>
    </div>
    <div className="flex-1">
      <h1 className="text-sm sm:text-base mb-2 font-semibold">Rekomendasi</h1>
      <div className="flex flex-wrap gap-2">
        {
          recommendations.map((e, i) => <Link className="p-2 border-[1.5px] rounded w-fit hover:text-sec-color-light hover:border-sec-color-light" key={i} href={e.href}>{e.name}</Link>)
        }
      </div>
    </div>
  </div>
}