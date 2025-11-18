import { Business } from "@/components/features/OurBusiness/Business";
import { Hero } from "@/components/features/OurBusiness/Hero";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { businessService } from "@/services/OurBusiness/BussinesService";
import { BussinesPageProps } from "@/types/OurBusiness/Bussines";
import { Metadata } from "next";

const stripHtml = (html: string | null) =>
  html ? html.replace(/<[^>]+>/g, "") : "";

const description = "PT Chandra Daya Investasi Tbk (CDI Group) merupakan bagian dari investasi infrastruktur Chandra Asri Group, penyedia bahan kimia energi dan solusi infrastruktur terkemuka di Asia Tenggara dan ECGO, perusahaan induk yang berfokus pada investasi bisnis ketenagalistrikan di Thailand. Beragam operasi CDI Group mencakup termasuk penyediaan dan pengolahan air, energi, kepelabuhanan & penyimpanan, dan logistik.";

const baseUrl = "https://chandradaya-investasi.com";

export const metadata: Metadata = {
  title: "What We Do | Chandra Daya Investasi", 
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
    canonical: '/our-business',
  },
  icons: {
    shortcut: '/assets/frontend/favicon.png',
  },

  openGraph: {
    title: "Chandra Daya Investasi", 
    description: description,
    url: '/our-business',
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

export default async function Page({ params: { locale } }: BussinesPageProps) {

  const [businessData, overviewData] = await Promise.all([
    businessService.getBusinessPageData(locale),
    businessService.getOverviewData(locale),
  ]);

  const { our_business_banner, our_business_overview } = businessData;

  return (
      <main>
                    <NavbarThemeTrigger theme="dark" />
        <Hero
          imageSrc={our_business_banner.file_url}
          title={our_business_banner.title || "About Chandra Daya Investasi"}
          subtitle={stripHtml(our_business_banner.content)}
          iconSrc="https://chandradaya-investasi.com/assets/frontend/icons/ic_hero_circle_arrow_down.svg"
        />
        <Business items={overviewData} overview={our_business_overview} />
      </main>
  );
}
