// import { DownloadsPolicy } from "@/components/features/Governance/Policy/Download";
import { DownloadsPolicy } from "@/components/features/Governance/Policy/Download";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { policyService } from "@/services/Governance/PolicyService";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export interface PolicyPageProps {
  params: {
    locale: "en" | "id";
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
  params: { locale },
}: PolicyPageProps): Promise<Metadata> {
    const t = await getTranslations('metadata')

  const pagePath = "/governance/policy";

  const currentPath = locale === "en" ? pagePath : `/${locale}${pagePath}`;

  const title = "Chandra Daya Investasi";
  return {
    title: title,
    description: t('description'),
    keywords: [
      "Chandra Daya Investasi",
      "CDI",
      "CDIA",
      "PT Chandra Daya Investasi Tbk",
      "CDI Group",
    ],

    metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),

    viewport: {
      width: "device-width",
      initialScale: 1.0,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: currentPath,
      languages: {
        "en-US": "/en/governance/policy",
        "id-ID": "/id/governance/policy",
      },
    },
    icons: {
      shortcut: "/assets/frontend/favicon.png",
    },

    openGraph: {
      title: title,
      description: t('description'),
      url: "/",
      type: "website",
      siteName: title,
    },

    twitter: {
      card: "summary_large_image",
      title: title,
      description: t('description'),
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

export default async function Page({
  params: { locale },
  searchParams,
}: PolicyPageProps) {
  const currentPage =
    typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;

  const policyData = await policyService.getPolicyPageData(locale, currentPage);

  return (
    <main>
      <NavbarThemeTrigger theme="light" />
      <DownloadsPolicy data={policyData} locale={locale} />
    </main>
  );
}
