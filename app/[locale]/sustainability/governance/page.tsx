import { AntiCorruption } from "@/components/features/Sustainability/Governance/AntiCorruption";
import { BusinessEthics } from "@/components/features/Sustainability/Governance/BusinessEthics";
import { CyberSecurity } from "@/components/features/Sustainability/Governance/CyberSecurity";
import { GovernancePerformance } from "@/components/features/Sustainability/Governance/GovernancePerformance";
import { GrievanceMechanism } from "@/components/features/Sustainability/Governance/GrievanceMechanism";
import { Hero } from "@/components/features/Sustainability/Governance/Hero";
import { Ciso } from "@/components/features/Sustainability/Governance/SecuritySlider";
import { SustainableProcurement } from "@/components/features/Sustainability/Governance/SustainableProcurement";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { governanceService } from "@/services/Sustainability/GovernanceServices";
import { GovernancePageProps } from "@/types/Sustainabilitys/Governance";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { seoService } from "@/services/Global/seoService";

export async function generateMetadata({
  params: { locale },
}: GovernancePageProps): Promise<Metadata> {
  const [seo, t, aboutData] = await Promise.all([
    seoService.getPageSeoMetadata("meta_sustainability_governance", locale),
    getTranslations("metadata-seo.sustainability-governance"),
    governanceService.getGovernancePageData(locale),
  ]);

  const title = seo.title || t("title");
  const description = seo.description || t("description");

  const { sustainability_governance_banner } = aboutData;

  const pagePath = "/sustainability/governance";

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
            sustainability_governance_banner.file_url ||
            "/assets/frontend/favicon.png",
          width: 1200,
          height: 630,
          alt: sustainability_governance_banner.title || "CDI Banner",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        sustainability_governance_banner.file_url ||
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
}: GovernancePageProps) {
  const [governanceData, contentData] = await Promise.all([
    governanceService.getGovernancePageData(locale),
    governanceService.getGovernanceContentData(locale),
  ]);

  const { sustainability_governance_banner } = governanceData;

  const businessEthicsData = contentData.find(
    (item) => item.name === "Business Ethics"
  );
  const antiCorruptionData = contentData.find(
    (item) => item.name === "Anti-Corruption and Anti-Bribery"
  );
  const grievanceData = contentData.find(
    (item) => item.name === "Grievance Mechanism"
  );
  const procurementData = contentData.find(
    (item) => item.name === "Sustainable Procurement"
  );
  const cyberSecurityData = contentData.find(
    (item) => item.name === "Cyber Security"
  );
  const cisoData = contentData.find(
    (item) =>
      item.name ===
      "Three fundamental components of information security management"
  );
  const governancePerfData = contentData.find(
    (item) => item.name === "Governance Performance"
  );

  return (
    <main>
      <NavbarThemeTrigger theme="dark" />
      <Hero
        imageSrc={sustainability_governance_banner.file_url}
        title={
          sustainability_governance_banner.title ||
          "Financial Information for Investors"
        }
        subtitle={sustainability_governance_banner.content || ""}
        iconSrc="/assets/icons/ic_hero_circle_arrow_down.svg"
      />
      <BusinessEthics data={businessEthicsData!} locale={locale} />
      <AntiCorruption data={antiCorruptionData!} />
      <GrievanceMechanism data={grievanceData!} />
      <SustainableProcurement data={procurementData!} />
      <CyberSecurity data={cyberSecurityData!} />
      <Ciso data={cisoData!} />
      {/* <SecuritySlider /> */}
      <GovernancePerformance data={governancePerfData!} />
    </main>
  );
}
