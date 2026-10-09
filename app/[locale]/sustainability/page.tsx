import { Hero } from "@/components/features/Sustainability/Hero";
import { Overview } from "@/components/features/Sustainability/Overview";
// import { SustainabilityFramework } from "@/components/features/Sustainability/SustainabilityFramework";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { sustainabilityService } from "@/services/Sustainability/FinancialServices";
import { SustainabilityPageProps } from "@/types/Sustainabilitys/Sustainability";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SustainabilitySection } from "@/components/features/Sustainability/policy";

import { seoService } from "@/services/Global/seoService";

export async function generateMetadata({
  params: { locale },
}: SustainabilityPageProps): Promise<Metadata> {
  const [seo, t, aboutData] = await Promise.all([
    seoService.getPageSeoMetadata("meta_sustainability", locale),
    getTranslations("metadata-seo.sustainability"),
    sustainabilityService.getSustainabilityPageData(locale),
  ]);

  const title = seo.title || t("title");
  const description = seo.description || t("description");

  const { sustainability_overview_banner } = aboutData;

  const pagePath = "/sustainability";

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
        en: getCanonicalPath("en"),
        id: getCanonicalPath("id"),
        "x-default": getCanonicalPath("en"),
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
            sustainability_overview_banner.file_url ||
            "/assets/frontend/favicon.png",
          width: 1200,
          height: 630,
          alt: sustainability_overview_banner.title || "CDI Banner",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        sustainability_overview_banner.file_url ||
          "/assets/frontend/favicon.png",
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

export default async function Page({
  params: { locale },
}: SustainabilityPageProps) {
  const [sustainabilityData] = await Promise.all([
    sustainabilityService.getSustainabilityPageData(locale),
    // sustainabilityService.getFrameworkPageData(locale),
  ]);

  const { sustainability_overview_banner, sustainability_overview_content, sustainability_overview_policy_framework, sustainability_overview_policy_framework_file } =
    sustainabilityData;

  // const policyContent = {
  //   title:
  //     sustainability_overview_content?.title ||
  //     "Our Sustainability Policy and Framework",
  //   description:
  //     sustainability_overview_content.content ||
  //     "Advocate for ESG integration by promoting alignment with international frameworks and encouraging voluntary adoption of the parent company’s policy.",
  //   file_url:
  //     sustainability_overview_content.file_url ||
  //     "https://cdi-be.cmlabs.dev/file-download/...",
  // };

  return (
    <main>
      <NavbarThemeTrigger theme="dark" />
      <Hero
        imageSrc={sustainability_overview_banner.file_url}
        title={
          sustainability_overview_banner.title ||
          "Financial Information for Investors"
        }
        subtitle={sustainability_overview_banner.content}
        iconSrc="/assets/icons/ic_hero_circle_arrow_down.svg"
      />
      <Overview data={sustainability_overview_content} />
      <SustainabilitySection 
        policyData={sustainability_overview_policy_framework}
        fileData={sustainability_overview_policy_framework_file}
      />
      {/* <SustainabilityFramework
        data={frameworkData}
        policyTitle={policyContent.title}
        policyDescription={policyContent.description}
        policyFileUrl={policyContent.file_url}
      /> */}
    </main>
  );
}
