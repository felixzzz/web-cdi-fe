import { FinancialCalendar } from "@/components/features/Investor/FinancialInformation/FinancialCalendar";
import { Hero } from "@/components/features/Investor/FinancialInformation/Hero";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { financialService } from "@/services/Investor/FinancialServices";
import { FinancialPageProps } from "@/types/Investor/Financial";
import { Metadata } from "next";
// import { useTranslations } from "next-intl";


const description = "PT Chandra Daya Investasi Tbk (CDI Group) merupakan bagian dari investasi infrastruktur Chandra Asri Group, penyedia bahan kimia energi dan solusi infrastruktur terkemuka di Asia Tenggara dan ECGO, perusahaan induk yang berfokus pada investasi bisnis ketenagalistrikan di Thailand. Beragam operasi CDI Group mencakup termasuk penyediaan dan pengolahan air, energi, kepelabuhanan & penyimpanan, dan logistik.";

const baseUrl = "https://cdi-be.cmlabs.dev";

export const metadata: Metadata = {
  title: "Investor Financial Information | Chandra Daya Investasi", 
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
    canonical: '/investor/financial-information', 
  },
  icons: {
    shortcut: '/assets/frontend/favicon.png',
  },

  openGraph: {
    title: "Chandra Daya Investasi", 
    description: description,
    url: '/investor/financial-information',
    type: 'website',
    siteName: 'Chandra Daya Investasi',
  },

  twitter: {
    card: 'summary_large_image',
    title: "Chandra Daya Investasi",
    description: description,
  },

  other: {
    'application-url': 'https://cdi-be.cmlabs.dev',
    'preview-url': 'https://cdi-be.cmlabs.dev/file-storage',
    'download-file': 'https://cdi-be.cmlabs.dev/file-download',
    'add-file-preview': 'https://cdi-be.cmlabs.dev/file/preview',
    'add-file-download': 'https://cdi-be.cmlabs.dev/file/download',
  }
};

export default async function Page({ params: { locale } }: FinancialPageProps) {
  // const t = useTranslations("homepage");

  const [financialData, initialCalendarData] = await Promise.all([
    financialService.getFinancialPageData(locale),
    financialService.getFinancialCalendarData(locale, 1),
  ]);

  const { investor_financial_banner } = financialData;

  return (
    <main>
                  <NavbarThemeTrigger theme="dark" />
      <Hero
        imageSrc={investor_financial_banner.file_url}
        title={
          investor_financial_banner.title ||
          "Financial Information for Investors"
        }
        iconSrc="https://cdi-be.cmlabs.dev/assets/frontend/icons/ic_hero_circle_arrow_down.svg"
      />
                  <NavbarThemeTrigger theme="light" />
      
      <FinancialCalendar initialData={initialCalendarData} />
    </main>
  );
}
