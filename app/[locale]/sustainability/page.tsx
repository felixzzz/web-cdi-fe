import { Hero } from "@/components/features/Sustainability/Hero";
import { Overview } from "@/components/features/Sustainability/Overview";
// import { SustainabilityFramework } from "@/components/features/Sustainability/SustainabilityFramework";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { sustainabilityService } from "@/services/Sustainability/FinancialServices";
import { SustainabilityPageProps } from "@/types/Sustainabilitys/Sustainability";
import { Metadata } from "next";

const description =
  "PT Chandra Daya Investasi Tbk (CDI Group) merupakan bagian dari investasi infrastruktur Chandra Asri Group, penyedia bahan kimia energi dan solusi infrastruktur terkemuka di Asia Tenggara dan ECGO, perusahaan induk yang berfokus pada investasi bisnis ketenagalistrikan di Thailand. Beragam operasi CDI Group mencakup termasuk penyediaan dan pengolahan air, energi, kepelabuhanan & penyimpanan, dan logistik.";

const baseUrl = "https://cdi-be.cmlabs.dev";

export const metadata: Metadata = {
  title: "Sustainability Overview | Chandra Daya Investasi",
  description: description,
  keywords: [
    "Chandra Daya Investasi",
    "CDI",
    "CDIA",
    "PT Chandra Daya Investasi Tbk",
    "CDI Group",
  ],

  metadataBase: new URL(baseUrl),

  viewport: {
    width: "device-width",
    initialScale: 1.0,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/sustainability",
  },
  icons: {
    shortcut: "/assets/frontend/favicon.png",
  },

  openGraph: {
    title: "Chandra Daya Investasi",
    description: description,
    url: "/sustainability",
    type: "website",
    siteName: "Chandra Daya Investasi",
  },

  twitter: {
    card: "summary_large_image",
    title: "Chandra Daya Investasi",
    description: description,
  },

  other: {
    "application-url": "https://cdi-be.cmlabs.dev",
    "preview-url": "https://cdi-be.cmlabs.dev/file-storage",
    "download-file": "https://cdi-be.cmlabs.dev/file-download",
    "add-file-preview": "https://cdi-be.cmlabs.dev/file/preview",
    "add-file-download": "https://cdi-be.cmlabs.dev/file/download",
  },
};

export default async function Page({
  params: { locale },
}: SustainabilityPageProps) {
  const [sustainabilityData] = await Promise.all([
    sustainabilityService.getSustainabilityPageData(locale),
    // sustainabilityService.getFrameworkPageData(locale),
  ]);

  const { sustainability_overview_banner, sustainability_overview_content } =
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

  console.log('sustainability_overview_content ', sustainability_overview_content);

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
        iconSrc="https://cdi-be.cmlabs.dev/assets/frontend/icons/ic_hero_circle_arrow_down.svg"
      />
      <Overview data={sustainability_overview_content} />
      {/* <SustainabilityFramework
        data={frameworkData}
        policyTitle={policyContent.title}
        policyDescription={policyContent.description}
        policyFileUrl={policyContent.file_url}
      /> */}
    </main>
  );
}
