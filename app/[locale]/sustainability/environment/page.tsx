import { EnergyEmission } from "@/components/features/Sustainability/Environment/EnergyEmission";
import { Hero } from "@/components/features/Sustainability/Environment/Hero";
import { EnvironmentalResponsibility } from "@/components/features/Sustainability/Environment/Overview";
import { SustainabilityFacts } from "@/components/features/Sustainability/Environment/SustainabilityFacts";
import { WasteManagement } from "@/components/features/Sustainability/Environment/WasteManagement";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { environmentService } from "@/services/Sustainability/EnvironmentServices";
import { EnvironmentPageProps } from "@/types/Sustainabilitys/Environment";
import { Metadata } from "next";

const description = "PT Chandra Daya Investasi Tbk (CDI Group) merupakan bagian dari investasi infrastruktur Chandra Asri Group, penyedia bahan kimia energi dan solusi infrastruktur terkemuka di Asia Tenggara dan ECGO, perusahaan induk yang berfokus pada investasi bisnis ketenagalistrikan di Thailand. Beragam operasi CDI Group mencakup termasuk penyediaan dan pengolahan air, energi, kepelabuhanan & penyimpanan, dan logistik.";

const baseUrl = "https://cdi-be.cmlabs.dev";

export const metadata: Metadata = {
  title: "Sustainability Environment | Chandra Daya Investasi", 
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
    canonical: '/sustainability/environment', 
  },
  icons: {
    shortcut: '/assets/frontend/favicon.png',
  },

  openGraph: {
    title: "Chandra Daya Investasi", 
    description: description,
    url: '/sustainability/environment',
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

export default async function Page({params: {locale}}: EnvironmentPageProps) {

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
