import { NextSeo } from "next-seo";

export default function NextSeoWrapper({ title, description, url }: { title: string, description: string, url: string }) {
  return <NextSeo
    title={title}
    description={description}
    titleTemplate="%s - QuranLet"
    defaultTitle="QuranLet"
    openGraph={{
      type: "website",
      url: `https://${url}`,
      title,
      description,
      siteName: "QuranLet",
      images: [{
        url: "https://quranlet.vercel.app/og.webp",
        width: 1200,
        height: 630,
        alt: "Quranlet"
      }]
    }}
    robotsProps={{ noimageindex: true }}
    twitter={{
      handle: "@framadhita",
      cardType: "summary_large_image",
      site: "@framadhita"
    }}
    additionalMetaTags={[
      {
        name: "Charset",
        content: "UTF-8"
      },
      {
        name: "Distribution",
        content: "Global"
      },
      {
        name: "Rating",
        content: "General"
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
    ]}
  />
}