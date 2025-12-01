import { HeroNews } from "@/components/features/Media/Hero";
import { News } from "@/components/features/Media/News";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import {
  mediaService,
  pressReleaseService,
} from "@/services/Media/MediaService";
import { NewsPageProps } from "@/types/Media/Media";
import { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: NewsPageProps): Promise<Metadata> {
  const aboutData = await mediaService.getHeroPageData(locale);

  const pagePath = "/media/news";

  const currentPath = locale === "en" ? pagePath : `/${locale}${pagePath}`;

  const title = "Chandra Daya Investasi";

  const description =
    "PT Chandra Daya Investasi Tbk (CDI Group) merupakan bagian dari investasi infrastruktur Chandra Asri Group, penyedia bahan kimia energi dan solusi infrastruktur terkemuka di Asia Tenggara dan ECGO, perusahaan induk yang berfokus pada investasi bisnis ketenagalistrikan di Thailand. Beragam operasi CDI Group mencakup termasuk penyediaan dan pengolahan air, energi, kepelabuhanan & penyimpanan, dan logistik.";

  return {
    title: title,
    description: description,
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),

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
      canonical: currentPath,
      languages: {
        "en-US": "/en/media/news",
        "id-ID": "/id/media/news",
      },
    },

    openGraph: {
      title: title,
      description: description,
      url: currentPath,
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
      description: description,
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
  const [mediaData, heroNewsData, pressReleaseData, latestNewsData] =
    await Promise.all([
      mediaService.getMediaPageData(locale),
      mediaService.getHeroPageData(locale),
      pressReleaseService.getPressReleasePageData(locale),
      pressReleaseService.getLatestNewsData(locale),
    ]);

  return (
    <main>
      <NavbarThemeTrigger theme="dark" />
      <HeroNews media={heroNewsData} latestNewsData={latestNewsData} />
      <NavbarThemeTrigger theme="light" />
      <News mediaData={mediaData} pressReleaseData={pressReleaseData} />
    </main>
  );
}
