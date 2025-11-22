import { Hero } from "@/components/features/Investor/SharesInformation/Hero";
import { StocksInformation } from "@/components/features/Investor/SharesInformation/Stoks";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { sharesService } from "@/services/Investor/SharesServices";
import { SharesPageProps, TableInvestorSection } from "@/types/Investor/Shares";
import { Metadata } from "next";
// import { useTranslations } from "next-intl";


const description = "PT Chandra Daya Investasi Tbk (CDI Group) merupakan bagian dari investasi infrastruktur Chandra Asri Group, penyedia bahan kimia energi dan solusi infrastruktur terkemuka di Asia Tenggara dan ECGO, perusahaan induk yang berfokus pada investasi bisnis ketenagalistrikan di Thailand. Beragam operasi CDI Group mencakup termasuk penyediaan dan pengolahan air, energi, kepelabuhanan & penyimpanan, dan logistik.";

const baseUrl = "https://cdi-be.cmlabs.dev";

export const metadata: Metadata = {
  title: "Investor Shares Information | Chandra Daya Investasi", 
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
    canonical: '/investor/shares-information', 
  },
  icons: {
    shortcut: '/assets/frontend/favicon.png',
  },

  openGraph: {
    title: "Chandra Daya Investasi", 
    description: description,
    url: '/investor/shares-information',
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

export default async function Page({ params: { locale } }: SharesPageProps) {
  // const t = useTranslations("homepage");

    const SharesData = await sharesService.getSharesPageData(locale);

    const {
    investor_share_banner,
    investor_share_tab_one,
    investor_share_tab_two,
    investor_share_shareholders_table,
    investor_share_dividend_table,
    investor_share_shareholders_table_show,
    investor_share_dividend_table_show,
  } = SharesData;

  return (
    <main>
                        <NavbarThemeTrigger theme="dark" />
      <Hero
        imageSrc={investor_share_banner.file_url}
        title={investor_share_banner.title || "Stocks and Bonds"}
        subtitle={investor_share_banner.content}
        iconSrc="https://cdi-be.cmlabs.dev/assets/frontend/icons/ic_hero_circle_arrow_down.svg"
      />
                  <NavbarThemeTrigger theme="light" />
      <StocksInformation
        tabOneTitle={investor_share_tab_one.title}
        tabTwoTitle={investor_share_tab_two.title}
        shareholdersData={
          investor_share_shareholders_table as TableInvestorSection
        }
        dividendData={investor_share_dividend_table as TableInvestorSection}
        showShareholders={
          investor_share_shareholders_table_show.content !== "hide"
        }
        showDividend={investor_share_dividend_table_show.content !== "hide"}
      />
    </main>
  );
}
