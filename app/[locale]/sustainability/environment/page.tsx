import { EnergyEmission } from "@/components/features/Sustainability/Environment/EnergyEmission";
import { Hero } from "@/components/features/Sustainability/Environment/Hero";
import { EnvironmentalResponsibility } from "@/components/features/Sustainability/Environment/Overview";
import { SustainabilityFacts } from "@/components/features/Sustainability/Environment/SustainabilityFacts";
import { WasteManagement } from "@/components/features/Sustainability/Environment/WasteManagement";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { environmentService } from "@/services/Sustainability/EnvironmentServices";
import { EnvironmentPageProps } from "@/types/Sustainabilitys/Environment";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { seoService } from "@/services/Global/seoService";

export async function generateMetadata({
  params: { locale },
}: EnvironmentPageProps): Promise<Metadata> {  
  const [seo, t, aboutData] = await Promise.all([
    seoService.getPageSeoMetadata("meta_sustainability_environment", locale),
    getTranslations("metadata-seo.sustainability-environment"),
    environmentService.getEnviromentPageData(locale),
  ]);

  const title = seo.title || t("title");
  const description = seo.description || t("description");

  const { sustainability_environment_banner } = aboutData;

  const pagePath = "/sustainability/environment";

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
            sustainability_environment_banner.file_url ||
            "/assets/frontend/favicon.png",
          width: 1200,
          height: 630,
          alt: sustainability_environment_banner.title || "CDI Banner",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        sustainability_environment_banner.file_url ||
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
}: EnvironmentPageProps) {
  const [environmentData, contentEnviroment] = await Promise.all([
    environmentService.getEnviromentPageData(locale),
    environmentService.getEnviromentContentData(locale),
  ]);

  const {
    sustainability_environment_banner,
    sustainability_environment_overview,
  } = environmentData;

  const energyData = contentEnviroment.find(
    (item) => item.name === "Energy & Emission"
  );
  const factsData = contentEnviroment.find(
    (item) => item.grid_type === "icon_content_card"
  );
  const wasteData = contentEnviroment.find(
    (item) => item.name === "Waste Management"
  );

  return (
    <main>
      <NavbarThemeTrigger theme="dark" />
      <Hero
        imageSrc={sustainability_environment_banner.file_url}
        title={
          sustainability_environment_banner.title ||
          "Financial Information for Investors"
        }
        subtitle={sustainability_environment_banner.content}
        iconSrc="/assets/icons/ic_hero_circle_arrow_down.svg"
      />
      <EnvironmentalResponsibility data={sustainability_environment_overview} />
      <EnergyEmission data={energyData!} />
      <SustainabilityFacts data={factsData!} />
      <WasteManagement data={wasteData!} />
    </main>
  );
}
