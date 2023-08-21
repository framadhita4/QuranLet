import '@/styles/globals.css';
import "@/styles/surah.icon.css";
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Noto_Sans_Display } from 'next/font/google';

const notoSans = Noto_Sans_Display({
  subsets: ['latin'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>QuranLet</title>
    </Head>
    <main className={`${notoSans.className} font-medium text-gray-700`}>
      <Component {...pageProps} />
    </main>
  </>
}
