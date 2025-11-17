import { BusinessPillars } from "@/components/features/OurBusiness/Water/BusinessPillars";
import { Hero } from "@/components/features/OurBusiness/Water/Hero";
import { Overview } from "@/components/features/OurBusiness/Water/Overview";
import { waterService } from "@/services/OurBusiness/WaterService";
import { WaterPageProps } from "@/types/OurBusiness/Water";
import { Metadata } from "next";

const description = "PT Chandra Daya Investasi Tbk (CDI Group) merupakan bagian dari investasi infrastruktur Chandra Asri Group, penyedia bahan kimia energi dan solusi infrastruktur terkemuka di Asia Tenggara dan ECGO, perusahaan induk yang berfokus pada investasi bisnis ketenagalistrikan di Thailand. Beragam operasi CDI Group mencakup termasuk penyediaan dan pengolahan air, energi, kepelabuhanan & penyimpanan, dan logistik.";

const baseUrl = "https://chandradaya-investasi.com";

export const metadata: Metadata = {
  title: "Water | Chandra Daya Investasi", 
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
    canonical: '/our-business/water', 
  },
  icons: {
    shortcut: '/assets/frontend/favicon.png',
  },

  openGraph: {
    title: "Chandra Daya Investasi",
    description: description,
    url: '/our-business/water',
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

export default async function Page({ params: { locale } }: WaterPageProps) {
  const waterData = await waterService.getWaterPageData(locale);

  return (
    <>
      <div>
        <Hero
          imageSrc={waterData.banner_image}
          title={waterData.banner_title}
          iconSrc="https://chandradaya-investasi.com/assets/frontend/icons/ic_hero_circle_arrow_down.svg" 
        />
        <Overview 
        title={waterData.overview_title}
          description={waterData.overview_description}
          imageUrl={waterData.overview_image}
          linkUrl={waterData.link_url}
          linkTitle={waterData.link_title_en}
        />
        <BusinessPillars 
        title={waterData.heading_tab_title}
          tabs={waterData.tabs}
        />
      </div>
    </>
  );
}
