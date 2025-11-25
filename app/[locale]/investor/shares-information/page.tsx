import { Hero } from "@/components/features/Investor/SharesInformation/Hero";
import { StocksInformation } from "@/components/features/Investor/SharesInformation/Stoks";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { sharesService } from "@/services/Investor/SharesServices";
import { SharesPageProps, TableInvestorSection } from "@/types/Investor/Shares";
import { Metadata } from "next";
// import { useTranslations } from "next-intl";

export async function generateMetadata({
  params: { locale },
}: SharesPageProps): Promise<Metadata> {
  const aboutData = await sharesService.getSharesPageData(locale);

  const { investor_share_banner } = aboutData;

  const pagePath = "/investor/shares-information";

  const currentPath = locale === "en" ? pagePath : `/${locale}${pagePath}`;

  const title = "Chandra Daya Investasi";

  const description =
    "PT Chandra Daya Investasi Tbk (CDI Group) merupakan bagian dari investasi infrastruktur Chandra Asri Group, penyedia bahan kimia energi dan solusi infrastruktur terkemuka di Asia Tenggara dan ECGO, perusahaan induk yang berfokus pada investasi bisnis ketenagalistrikan di Thailand. Beragam operasi CDI Group mencakup termasuk penyediaan dan pengolahan air, energi, kepelabuhanan & penyimpanan, dan logistik.";

  return {
    title: title,
    description: description,
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),

    keywords: [
      "Chandra Daya Investasi",
      "CDI",
      "CDIA",
      "PT Chandra Daya Investasi Tbk",
      "CDI Group",
    ],

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    alternates: {
      canonical: currentPath,
      languages: {
        "en-US": "/investor/shares-information",
        "id-ID": "/id/investor/shares-information",
      },
    },

    openGraph: {
      title: title,
      description: description,
      url: currentPath,
      siteName: "Chandra Daya Investasi",
      locale: locale,
      type: "website",
      images: [
        {
          url: investor_share_banner.file_url || "/assets/frontend/favicon.png",
          width: 1200,
          height: 630,
          alt: investor_share_banner.title || "CDI Banner",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [investor_share_banner.file_url || "/assets/frontend/favicon.png"],
    },

    other: {
      "application-url": `${process.env.NEXT_PUBLIC_BASE_URL}`,
      "preview-url": `${process.env.NEXT_PUBLIC_BASE_URL}/file-storage`,
      "download-file": `${process.env.NEXT_PUBLIC_BASE_URL}/file-download`,
      "add-file-preview": `${process.env.NEXT_PUBLIC_BASE_URL}/file/preview`,
      "add-file-download": `${process.env.NEXT_PUBLIC_BASE_URL}/file/download`,
    },
  };
}

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
