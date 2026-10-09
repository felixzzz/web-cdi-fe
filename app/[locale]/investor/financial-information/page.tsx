import { FinancialCalendar } from "@/components/features/Investor/FinancialInformation/FinancialCalendar";
import { Hero } from "@/components/features/Investor/FinancialInformation/Hero";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { financialService } from "@/services/Investor/FinancialServices";
import { FinancialPageProps } from "@/types/Investor/Financial";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
// import { useTranslations } from "next-intl";

import { seoService } from "@/services/Global/seoService";

export async function generateMetadata({
  params: { locale },
}: FinancialPageProps): Promise<Metadata> {
  const [seo, t, aboutData] = await Promise.all([
    seoService.getPageSeoMetadata("meta_investor_financial", locale),
    getTranslations("metadata-seo.investor-financial"),
    financialService.getFinancialPageData(locale),
  ]);

  const title = seo.title || t("title");
  const description = seo.description || t("description");

  const { investor_financial_banner } = aboutData;

  const pagePath = "/investor/financial-information";

  const baseUrl = process.env.NEXT_PUBLIC_URL_LP || "http://localhost:3000";

  const getCanonicalPath = (lang: string) => {
    return `${baseUrl}/${lang}${pagePath}`;      
  };

  const currentUrl = getCanonicalPath(locale);

  return {
    title,
    description,
    metadataBase: new URL(`${baseUrl}/${locale}`),

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
      canonical: currentUrl,
      languages: {
        en: getCanonicalPath('en'),
        id: getCanonicalPath('id'),
        "x-default": getCanonicalPath('en'),
      },
    },

    openGraph: {
      title,
      description,
      url: currentUrl,
      siteName: "Chandra Daya Investasi",
      locale: locale,
      type: "website",
      images: [
        {
          url:
            investor_financial_banner.file_url ||
            "/assets/frontend/favicon.png",
          width: 1200,
          height: 630,
          alt: investor_financial_banner.title || "CDI Banner",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        investor_financial_banner.file_url || "/assets/frontend/favicon.png",
      ],
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
        iconSrc="/assets/icons/ic_hero_circle_arrow_down.svg"
      />
      <NavbarThemeTrigger theme="light" />

      <FinancialCalendar initialData={initialCalendarData} locale={locale} />
    </main>
  );
}
