import { FinancialBanner } from "@/components/features/Investor/Report/FinancialBanner";
import { FinancialCalendar } from "@/components/features/Investor/Report/FinancialCalendar";
import { FinancialTable } from "@/components/features/Investor/Report/FinancialTable";
import { Hero } from "@/components/features/Investor/Report/Hero";
import { SupportingInstitutions } from "@/components/features/Investor/Report/Institutions";
import { reportService } from "@/services/Investor/ReportServices";
import { ReportPageProps } from "@/types/Investor/Report";
import { Metadata } from "next";
// import { useTranslations } from "next-intl";

const description = "PT Chandra Daya Investasi Tbk (CDI Group) merupakan bagian dari investasi infrastruktur Chandra Asri Group, penyedia bahan kimia energi dan solusi infrastruktur terkemuka di Asia Tenggara dan ECGO, perusahaan induk yang berfokus pada investasi bisnis ketenagalistrikan di Thailand. Beragam operasi CDI Group mencakup termasuk penyediaan dan pengolahan air, energi, kepelabuhanan & penyimpanan, dan logistik.";

const baseUrl = "https://chandradaya-investasi.com";

export const metadata: Metadata = {
  title: "Investor Report | Chandra Daya Investasi", 
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
    canonical: '/investor/report', 
  },
  icons: {
    shortcut: '/assets/frontend/favicon.png',
  },

  openGraph: {
    title: "Chandra Daya Investasi", 
    description: description,
    url: '/investor/report',
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

export default async function Page({ params: { locale } }: ReportPageProps) {
  // const t = useTranslations("homepage");

  const [reportData, financialData, institutions] = await Promise.all([
    reportService.getReportPageData(locale),
    reportService.getFinancialData(locale),
    reportService.getInstitutionsData(locale),
  ]);

  const {
    investor_report_banner,
    investor_report_overview,
    investor_report_table,
  } = reportData;

  return (
    <main>
      <Hero
        imageSrc={investor_report_banner.file_url}
        title={investor_report_banner.title || "Investor Report"}
        subtitle={investor_report_banner.content}
        iconSrc="https://chandradaya-investasi.com/assets/frontend/icons/ic_hero_circle_arrow_down.svg"
      />
      <FinancialBanner data={investor_report_overview} />
      <FinancialTable data={investor_report_table} />
      <SupportingInstitutions data={institutions} />
      <FinancialCalendar initialData={financialData} />
    </main>
  );
}
