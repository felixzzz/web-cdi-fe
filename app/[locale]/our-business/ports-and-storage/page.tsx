import { BusinessPillars } from "@/components/features/OurBusiness/ports-and-storage/BusinessPillars";
import { Hero } from "@/components/features/OurBusiness/ports-and-storage/Hero";
import { Overview } from "@/components/features/OurBusiness/ports-and-storage/Overview";
import { portStorageService } from "@/services/OurBusiness/PortsStorageService";
import { PortStoragePageProps } from "@/types/OurBusiness/Ports&Storage";
import { Metadata } from "next";

const description = "PT Chandra Daya Investasi Tbk (CDI Group) merupakan bagian dari investasi infrastruktur Chandra Asri Group, penyedia bahan kimia energi dan solusi infrastruktur terkemuka di Asia Tenggara dan ECGO, perusahaan induk yang berfokus pada investasi bisnis ketenagalistrikan di Thailand. Beragam operasi CDI Group mencakup termasuk penyediaan dan pengolahan air, energi, kepelabuhanan & penyimpanan, dan logistik.";

const baseUrl = "https://chandradaya-investasi.com";

export const metadata: Metadata = {
  title: "Ports & Storage | Chandra Daya Investasi", 
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
    canonical: '/our-business/ports-and-storage',
  },
  icons: {
    shortcut: '/assets/frontend/favicon.png',
  },

  openGraph: {
    title: "Chandra Daya Investasi",
    description: description,
    url: '/our-business/ports-and-storage',
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

export default async function Page({ params: { locale } }: PortStoragePageProps) {
  const portStorageData = await portStorageService.getPortStoragePageData(locale);

  const {
    banner_image,
    banner_title,
    overview_title,
    overview_description,
    overview_image,
    heading_tab_title,
    tabs,
    link_url,
    link_title_en,
  } = portStorageData;
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
        {/* <BusinessPillars /> */}
        <BusinessPillars title={heading_tab_title} tab={tabs[0]} />
      </div>
    </>
  );
}
