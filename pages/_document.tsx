import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="id">
      <Head>
        <link rel="shortcut icon" href="/quran.svg" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/quran.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
