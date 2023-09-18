import Link from "next/link";

export default function Footer() {
  return <div className="text-sm sm:text-base p-5 m-auto text-gray-700 md:w-11/12 sm:flex sm:gap-32 mb-16 border-t-2">
    <div className="flex-1 mb-10">
      <h1 className="text-xl font-semibold">Quranlet</h1>
      <h2 className="text-sm sm:text-base font-bold my-2">Al-Quran dengan terjamahan dan tafsir bahasa Indonesia</h2>
      <p>Proyek ini terinspirasi dari website <a className="underline" href="https://quran.com">quran.com</a>.<br />Jika ada kesalahan pada terjemahan, pengetikan atau tampilan silakan buat issue pada repository <a className="underline" href="https://github.com/framadhita4/QuranLet">github</a> proyek ini atau hubungi saya lewat <a className="underline" href="https://www.instagram.com/framadhita_/">IG</a>.</p>
    </div>
    <div className="flex-1">
      <h1 className="text-sm sm:text-base mb-2 font-semibold">Rekomendasi</h1>
      <div className="flex flex-col">
        <Link className="hover:underline w-fit" href="/2?verse=255">Ayat Kursi</Link>
        <Link className="hover:underline w-fit" href="/36">Surah Yasin</Link>
        <Link className="hover:underline w-fit" href="/67">Surah Al-Mulk</Link>
        <Link className="hover:underline w-fit" href="/55">Surah Ar-Rahman</Link>
        <Link className="hover:underline w-fit" href="/56">Surah Al-Waqi&apos;ah</Link>
        <Link className="hover:underline w-fit" href="/18">Surah Al-Kahf</Link>
        <Link className="hover:underline w-fit" href="/73">Surah Al-Muzammil</Link>
      </div>
    </div>
  </div>
}