import { Suspense } from "react";
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

import { seoService } from "@/services/Global/seoService";

export async function generateMetadata({
  params: { locale },
}: NewsPageProps): Promise<Metadata> {
  const [seo, t, aboutData] = await Promise.all([
    seoService.getPageSeoMetadata("meta_media_news", locale),
    getTranslations("metadata-seo.media-news"),
    mediaService.getHeroPageData(locale),
  ]);

  const title = seo.title || t("title");
  const description = seo.description || t("description");

  const pagePath = "/media/news";

  const baseUrl = process.env.NEXT_PUBLIC_URL_LP || "http://localhost:3000";

  const getCanonicalPath = (lang: string) => {
    return `${baseUrl}/${lang}${pagePath}`;
  };

  const currentUrl = getCanonicalPath(locale);

  return {
    title,
    description,
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
        en: getCanonicalPath("en"),
        id: getCanonicalPath("id"),
        "x-default": getCanonicalPath("en"),
      },
    },

    openGraph: {
      title,
      description,
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
      title,
      description,
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
  const [
    mediaData,
    mediaBlogData,
    heroNewsData,
    pressReleaseData,
    latestNewsData,
    categoryData,
  ] = await Promise.all([
    mediaService.getMediaPageData(locale),
    mediaService.getMediaBlogPageData(1),
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
      <Suspense fallback={null}>
        <News
          mediaData={mediaData}
          mediaBlogData={mediaBlogData}
          pressReleaseData={pressReleaseData}
          categoryData={categoryData}
          locale={locale}
        />
      </Suspense>
    </main>
  );
}
