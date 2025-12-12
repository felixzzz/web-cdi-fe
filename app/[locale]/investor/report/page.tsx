import { FinancialBanner } from "@/components/features/Investor/Report/FinancialBanner";
import { FinancialCalendar } from "@/components/features/Investor/Report/FinancialCalendar";
import { FinancialTable } from "@/components/features/Investor/Report/FinancialTable";
import { Hero } from "@/components/features/Investor/Report/Hero";
import { SupportingInstitutions } from "@/components/features/Investor/Report/Institutions";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { reportService } from "@/services/Investor/ReportServices";
import { ReportPageProps } from "@/types/Investor/Report";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
// import { useTranslations } from "next-intl";

export async function generateMetadata({
  params: { locale },
}: ReportPageProps): Promise<Metadata> {
  const t = await getTranslations("metadata");

  const aboutData = await reportService.getReportPageData(locale);
  const { investor_report_banner } = aboutData;

  const pagePath = "/investor/report";

  const currentPath = locale === "en" ? pagePath : `/${locale}${pagePath}`;

  const title = "Chandra Daya Investasi";

  return {
    title: title,
    description: t("description"),
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
        "en-US": "/en/investor/report",
        "id-ID": "/id/investor/report",
      },
    },

    openGraph: {
      title: title,
      description: t("description"),
      url: currentPath,
      siteName: "Chandra Daya Investasi",
      locale: locale,
      type: "website",
      images: [
        {
          url:
            investor_report_banner.file_url || "/assets/frontend/favicon.png",
          width: 1200,
          height: 630,
          alt: investor_report_banner.title || "CDI Banner",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: title,
      description: t("description"),
      images: [
        investor_report_banner.file_url || "/assets/frontend/favicon.png",
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
      <NavbarThemeTrigger theme="dark" />

      <Hero
        imageSrc={investor_report_banner.file_url}
        title={investor_report_banner.title || "Investor Report"}
        subtitle={investor_report_banner.content}
        iconSrc="/assets/icons/ic_hero_circle_arrow_down.svg"
      />
      <NavbarThemeTrigger theme="light" />
      <FinancialBanner data={investor_report_overview} />
      <FinancialTable data={investor_report_table} />
      <SupportingInstitutions data={institutions} />
      <FinancialCalendar initialData={financialData} locale={locale} />
    </main>
  );
}
