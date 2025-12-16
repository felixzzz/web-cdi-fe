import { HeroNews } from "@/components/features/Media/Hero";
import { News } from "@/components/features/Media/News";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import {
  mediaService,
  pressReleaseService,
} from "@/services/Media/MediaService";
import { NewsPageProps } from "@/types/Media/Media";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: NewsPageProps): Promise<Metadata> {
  const t = await getTranslations("metadata");
  const aboutData = await mediaService.getHeroPageData(locale);

  const pagePath = "/media/news";

  const title = "Chandra Daya Investasi";
  
  const baseUrl = process.env.NEXT_PUBLIC_URL_LP || "http://localhost:3000";
  
  const getCanonicalPath = (lang: string) => {
    if (lang === 'id') return `${baseUrl}/${lang}${pagePath}`; 
    return `${baseUrl}/${lang}${pagePath}`;      
  };

  const currentUrl = getCanonicalPath(locale);

  return {
    title: title,
    description: t('description'),
    metadataBase: new URL(baseUrl),

    keywords: [
      "Chandra Daya Investasi",
      "CDI",
      "CDIA",
      "PT Chandra Daya Investasi Tbk",
      "CDI Group",
    ],

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    alternates: {
      canonical: currentUrl,
     languages: {
        "en-US": getCanonicalPath('en'),
        "id-ID": getCanonicalPath('id'),
      },
    },

    openGraph: {
      title: title,
      description: t('description'),
      url: currentUrl,
      siteName: "Chandra Daya Investasi",
      locale: locale,
      type: "website",
      images: [
        {
          url: aboutData.file_url || "/assets/frontend/favicon.png",
          width: 1200,
          height: 630,
          alt: aboutData.title || "CDI Banner",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: title,
      description: t('description'),
      images: [aboutData.file_url || "/assets/frontend/favicon.png"],
    },

    other: {
      "application-url": `${process.env.NEXT_PUBLIC_BASE_URL}`,
      "preview-url": `${process.env.NEXT_PUBLIC_BASE_URL}/file-storage`,
      "download-file": `${process.env.NEXT_PUBLIC_BASE_URL}/file-download`,
      "add-file-preview": `${process.env.NEXT_PUBLIC_BASE_URL}/file/preview`,
      "add-file-download": `${process.env.NEXT_PUBLIC_BASE_URL}/file/download`,
    },
  };
}

export default async function Page({ params: { locale } }: NewsPageProps) {
  const [mediaData, heroNewsData, pressReleaseData, latestNewsData, categoryData] =
    await Promise.all([
      mediaService.getMediaPageData(locale),
      mediaService.getHeroPageData(locale),
      pressReleaseService.getPressReleasePageData(locale),
      pressReleaseService.getLatestNewsData(locale),
      pressReleaseService.getCategoryData(locale),
    ]);

  return (
    <main>
      <NavbarThemeTrigger theme="dark" />
      <HeroNews media={heroNewsData} latestNewsData={latestNewsData} />
      <NavbarThemeTrigger theme="light" />
      <News mediaData={mediaData} pressReleaseData={pressReleaseData} categoryData={categoryData} locale={locale} />
    </main>
  );
}
