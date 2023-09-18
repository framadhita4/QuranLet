/* eslint-disable react-hooks/exhaustive-deps */
import '@/styles/globals.css';
import "@/styles/surah.icon.css";
import type { AppProps } from 'next/app';
import { Inter, Quicksand } from '@next/font/google';
import { Analytics } from '@vercel/analytics/react';
import localFont from "@next/font/local"
import { Provider } from 'jotai';
import Head from 'next/head';
import Footer from '@/components/footer';

export const surahIconFont = localFont({
  src: "../public/font/surahicon.woff2",
  display: "swap",
  preload: true,
  variable: "--font-surahicon"
})

export const mequranFont = localFont({
  src: "../public/font/me_quran.ttf",
  display: "auto",
  preload: true
})

export const hafsFont = localFont({
  src: "../public/font/KFGQPCHAFSUthmanicScript-Regula.ttf",
  display: "auto",
  preload: true
})

const quicksandFont = Quicksand({
  subsets: ['latin'],
  weight: ["300", "400", "500", "600", "700"],
  preload: true
});

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <link rel="shortcut icon" href="/quran.svg" type="image/x-icon" />
      <link rel="apple-touch-icon" href="/logo/logo-192x.png" sizes="192x192" />
      <link rel="icon" type="image/png" href="/logo/logo-192x.png" sizes="192x192" />
      <link rel="manifest" href="/manifest.json" />
    </Head>
    <main className={`${quicksandFont.className} selection:bg-pri-color-light font-medium text-gray-700`}>
      <Provider>
        <Component {...pageProps} />
        <Footer />
      </Provider>
      <Analytics />
    </main>
  </>
}
