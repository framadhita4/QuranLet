import Navbar from "@/components/navbar/navbar";
import { hafsFont, mequranFont } from "../_app";
import Link from "next/link";
import NextSeoWrapper from "@/components/NextSeoWrapper";

const Arabic = ({ text, ayah }: { text: string, ayah: string }) => {
  return <p dir="rtl" lang="ar" className={`${mequranFont.className} sm:text-2xl text-[5vw]`}>{text}<span className={`${hafsFont.className} font-bold sm:text-3xl text-[6vw]`}>{ayah}</span></p>
}

export default function Page() {
  return <>
    <NextSeoWrapper
      title={`Tentang Al-Quran`}
      description="Al-Quran berasal dari bahasa Arab yang artinya bacaan. Sebagian ulama menyebutkan bahwa kata Al-Quran adalah masdar yang di artikan dengan isim maf’ul, yakni maqru’ artinya sesuatu yang di baca. Maksudnya, Al-qur’an itu adalah bacaan yang di baca. membahas Pengertian tentang Al-Quran, Isi pokok Al-quran, Cara membaca Al-Quran bagi pemula, Adab-adab dalam membaca Al-Quran"
      url={`quranlet.vercel.app/tentang-alquran`}
    />
    <Navbar />
    <div className="mx-6 lg:mx-64 sm:mx-20 text-sm sm:text-base text-justify flex flex-col gap-3 mt-24 mb-10">
      <h1 className="h1">Pengertian Al-Quran</h1>
      <p>
        Al-Quran berasal dari bahasa Arab yang artinya bacaan. Sebagian ulama menyebutkan bahwa kata Al-Quran adalah masdar yang di artikan dengan isim maf’ul, yakni maqru’ artinya sesuatu yang di baca. Maksudnya, Al-qur’an itu adalah bacaan yang di baca.
      </p>
      <p>
        Secara istilah, Al-qur’an adalah wahyu Allah SWT yang di turunkan kepada Nabi Muhammad SAW, untuk di sampaikan umatnya secara berangsur-angsur melalui Malaikat Jibril dan membacanya adalah ibadah.
      </p>
      <p>
        Al-Quran adalah sumber hukum Islam yang pertama. Al-Quran sebagai sumber hukum dan pedoman hidup umat manusia memiliki beberapa keistimewaan dan kelebihan di banding dengan kitab-kibat suci lainnya sebagai berikut :
      </p>
      <ul className="list-disc pl-8">
        <li>
          Al-quran memuat ringkasan mengenai ajaran-ajaran tentang ketuhanan yang pernah tertulis di kitab-kitab lainnya (sebelumnya) seperti Zabur, Taurat dan Injil.
        </li>
        <li>
          Al-quran memuat kalam-kalam Allah yang menjadi pedoman hidup manusia sepanjang masa.
        </li>
        <li>
          Al-quran adalah sumber ilmu pengetahuan sehingga seluruh fenomena yang terjadi di alam semesta tidak akan pernah berlawanan dengan apa yang Allah SWT ciptakan.
        </li>
        <li>
          Al-quran di turunkan oleh Allah SWT, dengan suatu gaya bahasa yang istimewa, mudah, tidak sulit bagi siapa pun untuk memahaminya dan tidak sulit pula mengamalkannya, jika disertai dengan keikhlasan hati dan kemauan yang kuat.
        </li>
      </ul>

      <h1 className="h1">Isi pokok Al-Quran</h1>
      <p>
        Secara umum, terdapat enam isi pokok Al-quran sebagai pedoman dan petunjuk bagi umat manusia. Berikut enam isi pokok Al-quran tersebut :
      </p>
      <ol className="pl-8 list-decimal flex flex-col gap-1">
        <li>Akidah</li>
        <p>
          Akidah atau tauhid mengajarkan kepercayaan kepada Allah SWT, malaikat-malaikat, kitab-kitab, rasul-rasul, hari akhir dan takdir.
        </p>
        <p>
          Keenam perkara ini dikenal sebagai rukun iman atau pokok-pokok kepercayaan Islam. Selain itu, Al-quran juga melakukan pembuktian bahwa Islam adalah ajaran agama yang benar dan harus diyakini keabsahannya.
        </p>

        <li>Ibadah</li>
        <p>
          Tujuan hidup manusia di dunia adalah beribadah kepada Allah SWT, sebagaimana tertera dalam surah Adz-Dzariyat (51:56). Karena itulah, Al-quran menyebutkan sejumlah ibadah yang wajib dan sunah dikerjakan umat Islam.
        </p>
        <p>
          Kendati demikian, ayat-ayat Al-quran hanya menyebutkan secara umum dan tidak merincinya. Penjelasan yang mengatur ibadah-ibadah tersebut dijelaskan melalui hadis Nabi Muhammad SAW.
        </p>

        <li>Muamalah</li>
        <p>
          Al-quran juga menjelaskan mengenai muamalah dan hubungan sosial dalam bermasyarakat. Prinsip muamalah ini mengajarkan hubungan yang baik antarmanusia, baik dalam keluarga, tetangga, maupun masyarakat secara umum.
        </p>

        <li>Akhlak Mulia</li>
        <p>
          Salah satu tujuan Islam adalah menyebarkan akhlak yang mulia. Al-quran menjelaskan mengenai akhlak-akhlak tersebut sebagai prinsip yang harus dijalankan umat Islam.
        </p>

        <li>Sejarah</li>
        <p>
          Tidak hanya menceritakan mengenai kisah dan cerita-cerita umat terdahulu, Al-quran juga memberikan beberapa prediksi masa depan, misalnya mengenai kejatuhan Romawi, ekspansi ke bulan, dan lain sebagainya.
        </p>

        <li>Syariat</li>
        <p>
          Al-quran berisi syariat, hukum-hukum Islam yang berkaitan dengan ibadah, sosial, politik, dan lain sebagainya.
        </p>
      </ol>

      <h1 className="h1">Apakah Al-Quran terjaga keasliannya?</h1>
      <p>
        Kebenaran Al-Quran adalah sesuatu yang pasti. Karena Al-Quran merupakan perkataan Allah SWT yang Maha Benar. Dan Allah SWT menjamin keaslian Al-Quran :
      </p>
      <Arabic text="إِنَّانَحْنُنَزَّلْنَاٱلذِّكْرَوَإِنَّالَهُۥلَحَـٰفِظُونَ" ayah="٩" />
      <p>&ldquo;Sesungguhnya Kami-lah yang menurunkan Al-Qur`ān dan sesungguhnya Kami benar-benar memeliharanya.&ldquo; <Link href={"/15?verse=9"} className="link">(QS. Al-Hijr ayat 9)</Link></p>

      <h1 className="h1">Belum pernah membaca Al-Quran? Berikut saran jika ingin mulai membaca Al-Quran</h1>
      <p>
        Dekati Al-Quran dengan pikiran terbuka dan kemauan untuk belajar, Penting untuk mendekati Al-Quran dengan sikap positif dan keinginan untuk memahami pesannya. Cobalah untuk mengesampingkan segala prasangka atau bias yang mungkin kalian miliki, dan pelajari Al-Quran dengan pikiran terbuka.
      </p>
      <p className="font-bold">Mulai baca darimana?</p>
      <p>
        Surah pertama Al-Quran, <Link href={"/1"} className="link">Surah Al Fatihah</Link>, adalah tempat yang cocok untuk memulai perjalanan kalian dalam Al-Quran.
      </p>
      <p>
        Surah Al-Fatihah adalah surah pertama Al-Quran, dan merupakan surah yang paling banyak dibaca dalam iman Islam. Surah (bab) ini juga dikenal dengan &ldquo;Ummul Quran&ldquo; (induk Al Quran) atau &ldquo;Ummul Kitaab&ldquo; (induk Al Kitaab) karena merupakan induk bagi semua isi Al Quran serta menjadi inti sari kandungan Al Quran.
      </p>

      <h1 className="h1">Adab dalam membaca Al-Quran</h1>
      <p>
        Sebagai seorang Muslim yang baik, sebelum membaca atau bahkan mempelajari Alquran sangat perlu dalam memperhatikan adab-adabnya. Berikut adab-adab dalam membaca Al-Quran :
      </p>

      <ol className="pl-8 list-decimal flex flex-col gap-1">
        <li>Memulai membaca Alquran dengan isti’adzah.</li>
        <p className="mb-2">
          Kalimat isti’adzah atau taawudz merupakan sebuah doa untuk memohon penjagaan dan perlindungan dari godaan setan. Allah ﷻ berfirman:
        </p>
        <Arabic text="فَإِذَاقَرَأْتَٱلْقُرْءَانَفَٱسْتَعِذْبِٱللَّهِمِنَٱلشَّيْطَـٰنِٱلرَّجِيمِ" ayah="٩٨" />
        <p className="mt-2">
          &ldquo;Apabila kamu membaca Al-Qur`ān, hendaklah kamu meminta perlindungan kepada Allah dari setan yang terkutuk.&ldquo; <Link href="/16?verse=98" className="link">(QS. An-Nahl ayat 98)</Link>
        </p>

        <li>Membaca Alquran dalam keadaan suci, duduk dengan sopan dan tenang.</li>
        <p className="mb-2">
          Ketika membaca Alquran seorang Muslim dianjurkan dalam keadaan suci dari najis Baik itu badan, pakaian, maupun tempat membaca Alquran harus terbebas dari najis. Allah Subhanahu Wa Ta’ala berfirman:
        </p>
        <Arabic text="لَّايَمَسُّهُۥٓإِلَّاٱلْمُطَهَّرُونَ" ayah="٧٩" />
        <p className="mt-2">&ldquo;tidak menyentuhnya kecuali hamba-hamba yang disucikan.&ldquo; <Link className="link" href="/56?verse=79" >(QS Al-Waqiah ayat 79)</Link></p>

        <li>Membaca dengan tartil</li>
        <p className="mb-2">
          Membaca dengan tartil (pelan) dan tidak terburu-buru, agar dapat menghayati setiap ayat yang dibaca. Allah Subhanahu Wa Ta’ala berfirman:
        </p>
        <Arabic text="أَوْزِدْعَلَيْهِوَرَتِّلِٱلْقُرْءَانَتَرْتِيلًا" ayah="٤" />
        <p className="mt-2">&ldquo;atau lebih dari seperdua itu. Dan bacalah Al-Qur`ān itu dengan perlahan-lahan.&ldquo; <Link href="/73?verse=4" className="link" >(QS. Al-Muzammil ayat 4)</Link></p>

        <li>Membaca dengan khusyuk</li>
        <p>
          Membaca Alquran dengan khusyuk, dengan menangis karena sentuhan pengaruh ayat yang dibaca sehingga dapat menyentuh jiwa dan perasaan, serta membaguskan suara ketika membaca Alquran .
        </p>
      </ol>
      <Link className="p-4 my-4 m-auto font-semibold rounded-md bg-slate-700 text-white hover:bg-sec-color-light dark:bg-white dark:hover:bg-sec-color-light dark:text-slate-700 active:scale-90 transition ease-in-out duration-200 hover:glow" href={"/1"}>Mulai membaca Al-Quran</Link >
    </div >
  </>
}