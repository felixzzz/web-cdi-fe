import { Hero } from "@/components/features/Sustainability/Hero";
import { Overview } from "@/components/features/Sustainability/Overview";
import { sustainabilityService } from "@/services/Sustainability/FinancialServices";
import { SustainabilityPageProps } from "@/types/Sustainabilitys/Sustainability";
import { Metadata } from "next";


const description = "PT Chandra Daya Investasi Tbk (CDI Group) merupakan bagian dari investasi infrastruktur Chandra Asri Group, penyedia bahan kimia energi dan solusi infrastruktur terkemuka di Asia Tenggara dan ECGO, perusahaan induk yang berfokus pada investasi bisnis ketenagalistrikan di Thailand. Beragam operasi CDI Group mencakup termasuk penyediaan dan pengolahan air, energi, kepelabuhanan & penyimpanan, dan logistik.";

const baseUrl = "https://chandradaya-investasi.com";

export const metadata: Metadata = {
  title: "Sustainability Overview | Chandra Daya Investasi", 
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
    canonical: '/sustainability', 
  },
  icons: {
    shortcut: '/assets/frontend/favicon.png',
  },

  openGraph: {
    title: "Chandra Daya Investasi", 
    description: description,
    url: '/sustainability',
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

export default async function Page({params: {locale}}: SustainabilityPageProps) {
  const sustainabilityData =
    await sustainabilityService.getSustainabilityPageData(locale);

const { 
    sustainability_overview_banner, 
    sustainability_overview_content 
  } = sustainabilityData;

  return (
    <>
      <div>
        <Hero
          imageSrc={sustainability_overview_banner.file_url}
          title={
            sustainability_overview_banner.title ||
            "Financial Information for Investors"
          }
          subtitle={sustainability_overview_banner.content}
          iconSrc="https://chandradaya-investasi.com/assets/frontend/icons/ic_hero_circle_arrow_down.svg"
        />
        <Overview data={sustainability_overview_content} />
      </div>
    </>
  );
}
