import { HeroNews } from "@/components/features/Media/Hero";
import { News } from "@/components/features/Media/News";
import {
  mediaService,
  pressReleaseService,
} from "@/services/Media/MediaService";
import { NewsPageProps } from "@/types/Media/Media";
import { Metadata } from "next";


const description = "PT Chandra Daya Investasi Tbk (CDI Group) merupakan bagian dari investasi infrastruktur Chandra Asri Group, penyedia bahan kimia energi dan solusi infrastruktur terkemuka di Asia Tenggara dan ECGO, perusahaan induk yang berfokus pada investasi bisnis ketenagalistrikan di Thailand. Beragam operasi CDI Group mencakup termasuk penyediaan dan pengolahan air, energi, kepelabuhanan & penyimpanan, dan logistik.";

const baseUrl = "https://chandradaya-investasi.com";

export const metadata: Metadata = {
  title: "Media | Chandra Daya Investasi", 
  description: description,
  keywords: ['Chandra Daya Investasi', 'CDI', 'CDIA', 'PT Chandra Daya Investasi Tbk', 'CDI Group'],
  
  metadataBase: new URL(baseUrl),

  viewport: {
    width: 'device-width',
    initialScale: 1.0,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/media/news', 
  },
  icons: {
    shortcut: '/assets/frontend/favicon.png',
  },

  openGraph: {
    title: "Chandra Daya Investasi", 
    description: description,
    url: '/media/news',
    type: 'website',
    siteName: 'Chandra Daya Investasi',
  },

  twitter: {
    card: 'summary_large_image',
    title: "Chandra Daya Investasi",
    description: description,
  },

  other: {
    'application-url': 'https://chandradaya-investasi.com',
    'preview-url': 'https://chandradaya-investasi.com/file-storage',
    'download-file': 'https://chandradaya-investasi.com/file-download',
    'add-file-preview': 'https://chandradaya-investasi.com/file/preview',
    'add-file-download': 'https://chandradaya-investasi.com/file/download',
  }
};

export default async function Page({params: {locale}}: NewsPageProps) {
  const [mediaData, pressReleaseData, latestNewsData] = await Promise.all([
    mediaService.getMediaPageData(locale),
    pressReleaseService.getPressReleasePageData(locale),
    pressReleaseService.getLatestNewsData(locale),
  ]);
  return (
    <>
      <div>
        <HeroNews latestNewsData={latestNewsData} />
        <News mediaData={mediaData} pressReleaseData={pressReleaseData} />
      </div>
    </>
  );
}
