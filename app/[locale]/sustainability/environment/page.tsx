import { EnergyEmission } from "@/components/features/Sustainability/Environment/EnergyEmission";
import { Hero } from "@/components/features/Sustainability/Environment/Hero";
import { EnvironmentalResponsibility } from "@/components/features/Sustainability/Environment/Overview";
import { SustainabilityFacts } from "@/components/features/Sustainability/Environment/SustainabilityFacts";
import { WasteManagement } from "@/components/features/Sustainability/Environment/WasteManagement";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { environmentService } from "@/services/Sustainability/EnvironmentServices";
import { EnvironmentPageProps } from "@/types/Sustainabilitys/Environment";
import { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: EnvironmentPageProps): Promise<Metadata> {
  const aboutData = await environmentService.getEnviromentPageData(locale);
  const { sustainability_environment_banner } = aboutData;

  const pagePath = "/sustainability/environment";

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
        "en-US": "/sustainability/environment",
        "id-ID": "/id/sustainability/environment",
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
      title: title,
      description: description,
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
        iconSrc="https://cdi-be.cmlabs.dev/assets/frontend/icons/ic_hero_circle_arrow_down.svg"
      />
      <EnvironmentalResponsibility data={sustainability_environment_overview} />
      <EnergyEmission data={energyData!} />
      <SustainabilityFacts data={factsData!} />
      <WasteManagement data={wasteData!} />
    </main>
  );
}
