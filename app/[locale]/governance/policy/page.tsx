// import { DownloadsPolicy } from "@/components/features/Governance/Policy/Download";
import { DownloadsPolicy } from "@/components/features/Governance/Policy/Download";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { policyService } from "@/services/Governance/PolicyService";
import { Metadata } from "next";

const description =
  "PT Chandra Daya Investasi Tbk (CDI Group) merupakan bagian dari investasi infrastruktur Chandra Asri Group, penyedia bahan kimia energi dan solusi infrastruktur terkemuka di Asia Tenggara dan ECGO, perusahaan induk yang berfokus pada investasi bisnis ketenagalistrikan di Thailand. Beragam operasi CDI Group mencakup termasuk penyediaan dan pengolahan air, energi, kepelabuhanan & penyimpanan, dan logistik.";
const title = "Chandra Daya Investasi";
const baseUrl = "https://cdi-be.cmlabs.dev";

export const metadata: Metadata = {
  title: title,
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
    canonical: "/",
  },
  icons: {
    shortcut: "/assets/frontend/favicon.png",
  },

  openGraph: {
    title: title,
    description: description,
    url: "/",
    type: "website",
    siteName: title,
  },

  twitter: {
    card: "summary_large_image",
    title: title,
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

export interface PolicyPageProps {
  params: {
    locale: "en" | "id";
  };
   searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ params: { locale },
  searchParams, }: PolicyPageProps) {
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
