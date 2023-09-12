/* eslint-disable react-hooks/exhaustive-deps */
import '@/styles/globals.css';
import "@/styles/surah.icon.css";
import type { AppProps } from 'next/app';
import { Inter } from '@next/font/google';
import { Analytics } from '@vercel/analytics/react';
import localFont from "@next/font/local"
import { Provider } from 'jotai';

export const surahIconFont = localFont({
  src: "../public/font/surahicon.woff2",
  display: "swap",
  preload: true,
  variable: "--font-surahicon"
})

const notoSans = Inter({
  subsets: ['latin'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <main className={`${notoSans.className} selection:bg-pri-color-light font-medium text-gray-700`}>
      <Provider>
        <Component {...pageProps} />
      </Provider>
      <Analytics />
    </main>
  </>
}
