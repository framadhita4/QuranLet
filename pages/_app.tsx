/* eslint-disable react-hooks/exhaustive-deps */
import '@/styles/globals.css';
import "@/styles/surah.icon.css";
import type { AppProps } from 'next/app';
import { Noto_Sans_Display } from '@next/font/google';
import { Analytics } from '@vercel/analytics/react';
import localFont from "@next/font/local"
import { Provider } from 'jotai';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const surahIconFont = localFont({
  src: "../public/font/surahicon.woff2",
  display: "swap",
  preload: true,
  variable: "--font-surahicon"
})

const notoSans = Noto_Sans_Display({
  subsets: ['latin'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export default function App({ Component, pageProps }: AppProps) {
  const [key, setKey] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setKey(key + 1);
  }, [router.asPath])

  return <>
    <main className={`${notoSans.className} font-medium text-gray-700`}>
      <Provider key={key}>
        <Component {...pageProps} />
      </Provider>
      <Analytics />
    </main>
  </>
}
