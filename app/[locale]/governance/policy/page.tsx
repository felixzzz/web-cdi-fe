// import { DownloadsPolicy } from "@/components/features/Governance/Policy/Download";
import { DownloadsPolicy } from "@/components/features/Governance/Policy/Download";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { policyService } from "@/services/Governance/PolicyService";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { seoService } from "@/services/Global/seoService";

export interface PolicyPageProps {
  params: {
    locale: "en" | "id";
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
  params: { locale },
}: PolicyPageProps): Promise<Metadata> {
  const [seo, t] = await Promise.all([
    seoService.getPageSeoMetadata("meta_governance_policy", locale),
    getTranslations("metadata-seo.governance-policy"),
  ]);

  const title = seo.title || t("title");
  const description = seo.description || t("description");

  const pagePath = "/governance/policy";

  const baseUrl = process.env.NEXT_PUBLIC_URL_LP || "http://localhost:3000";

  const getCanonicalPath = (lang: string) => {
    return `${baseUrl}/${lang}${pagePath}`;      
  };

  const currentUrl = getCanonicalPath(locale);

  return {
    title,
    description,
    keywords: [
      "Chandra Daya Investasi",
      "CDI",
      "CDIA",
      "PT Chandra Daya Investasi Tbk",
      "CDI Group",
    ],

    metadataBase: new URL(`${baseUrl}/${locale}`),

    viewport: {
      width: "device-width",
      initialScale: 1.0,
    },
    robots: {
      index: true,
      follow: true,
    },
     alternates: {
      canonical: currentUrl,
      languages: {
        en: getCanonicalPath('en'),
        id: getCanonicalPath('id'),
        "x-default": getCanonicalPath('en'),
      },
    },
    icons: {
      shortcut: "/assets/frontend/favicon.png",
    },

    openGraph: {
      title,
      description,
      url: currentUrl,
      type: "website",
      siteName: title,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
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
