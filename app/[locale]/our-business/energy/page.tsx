import { BusinessPillars } from "@/components/features/OurBusiness/Energy/BusinessPillars";
import { Hero } from "@/components/features/OurBusiness/Energy/Hero";
import { Overview } from "@/components/features/OurBusiness/Energy/Overview";
import { energyService } from "@/services/OurBusiness/EnergyService";
import { EnergyApiResponse, EnergyPageProps } from "@/types/OurBusiness/Energy";
import { Metadata } from "next";

const description = "PT Chandra Daya Investasi Tbk (CDI Group) merupakan bagian dari investasi infrastruktur Chandra Asri Group, penyedia bahan kimia energi dan solusi infrastruktur terkemuka di Asia Tenggara dan ECGO, perusahaan induk yang berfokus pada investasi bisnis ketenagalistrikan di Thailand. Beragam operasi CDI Group mencakup termasuk penyediaan dan pengolahan air, energi, kepelabuhanan & penyimpanan, dan logistik.";

const baseUrl = "https://chandradaya-investasi.com";

export const metadata: Metadata = {
  title: "Energy | Chandra Daya Investasi", 
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
    canonical: '/our-business/energy',
  },
  icons: {
    shortcut: '/assets/frontend/favicon.png',
  },

  openGraph: {
    title: "Chandra Daya Investasi",
    description: description,
    url: '/our-business/energy',
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

export default async function Page({ params: { locale } }: EnergyPageProps) {
  const energyData: EnergyApiResponse = await energyService.getEnergyPageData(locale);

  return (
    <>
      <div>
        <Hero
          imageSrc={energyData.banner_image}
          title={energyData.banner_title}
          iconSrc="https://chandradaya-investasi.com/assets/frontend/icons/ic_hero_circle_arrow_down.svg" 
        />

        <Overview
          title={energyData.overview_title}
          description={energyData.overview_description}
          imageUrl={energyData.overview_image}
          linkUrl={energyData.link_url}
          linkTitle={energyData.link_title_en}
        />
        <BusinessPillars
          title={energyData.heading_tab_title}
          tabs={energyData.tabs}
        />
      </div>
    </>
  );
}