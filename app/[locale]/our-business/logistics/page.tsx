import { BusinessPillars } from "@/components/features/OurBusiness/Logistics/BusinessPillars";
import { Hero } from "@/components/features/OurBusiness/Logistics/Hero";
import { Overview } from "@/components/features/OurBusiness/Logistics/Overview";
import { logisticService } from "@/services/OurBusiness/LogisticService";
import { LogisticPageProps } from "@/types/OurBusiness/Logistic";
import { Metadata } from "next";

const description = "PT Chandra Daya Investasi Tbk (CDI Group) merupakan bagian dari investasi infrastruktur Chandra Asri Group, penyedia bahan kimia energi dan solusi infrastruktur terkemuka di Asia Tenggara dan ECGO, perusahaan induk yang berfokus pada investasi bisnis ketenagalistrikan di Thailand. Beragam operasi CDI Group mencakup termasuk penyediaan dan pengolahan air, energi, kepelabuhanan & penyimpanan, dan logistik.";

const baseUrl = "https://chandradaya-investasi.com";

export const metadata: Metadata = {
  title: "Logistic | Chandra Daya Investasi", 
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
    canonical: '/our-business/logistics',
  },
  icons: {
    shortcut: '/assets/frontend/favicon.png',
  },

  openGraph: {
    title: "Chandra Daya Investasi", 
    description: description,
    url: '/our-business/logistics', 
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

export default async function Page({ params: { locale } }: LogisticPageProps) {
  const logisticData = await logisticService.getLogisticPageData(locale);

  const {
    banner_image,
    banner_title,
    overview_title,
    overview_description,
    overview_image,
    tabs,
    link_url,
    link_title_en,
  } = logisticData;

  return (
    <>
      <div>
        <Hero
          imageSrc={banner_image}
          title={banner_title}
          iconSrc="https://chandradaya-investasi.com/assets/frontend/icons/ic_hero_circle_arrow_down.svg"
        />
        <Overview
          title={overview_title}
          description={overview_description}
          imageUrl={overview_image}
          linkUrl={link_url}
          linkTitle={link_title_en}
        />
        <BusinessPillars tabs={tabs} />
      </div>
    </>
  );
}
