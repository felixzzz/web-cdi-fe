import { BocBiography } from "@/components/features/AboutUs/management/Details/Biography";
import { DocumentDownload } from "@/components/features/AboutUs/management/Details/Document";
import { DetailHero } from "@/components/features/AboutUs/management/Details/Hero";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { managementService } from "@/services/AboutUs/ManagementService";
import { DownloadItem } from "@/types/AboutUs/Management";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export type PageProps = {
  params: {
    ulid: string;
    locale: string;
  };
};

const FILE_PREVIEW_BASE_URL = "https://cdi-be.cmlabs.dev/file/preview/";
const FILE_DOWNLOAD_BASE_URL =
  "https://cdi-be.cmlabs.dev/file/download/";

const description =
  "PT Chandra Daya Investasi Tbk (CDI Group) merupakan bagian dari investasi infrastruktur Chandra Asri Group, penyedia bahan kimia energi dan solusi infrastruktur terkemuka di Asia Tenggara dan ECGO, perusahaan induk yang berfokus pada investasi bisnis ketenagalistrikan di Thailand. Beragam operasi CDI Group mencakup termasuk penyediaan dan pengolahan air, energi, kepelabuhanan & penyimpanan, dan logistik.";

const baseUrl = "https://cdi-be.cmlabs.dev";

export const metadata: Metadata = {
  title: "Management and Organization Structure | Chandra Daya Investasi",
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
    canonical: "/contact-us",
  },
  icons: {
    shortcut: "/assets/frontend/favicon.png",
  },

  openGraph: {
    title: "Chandra Daya Investasi",
    description: description,
    url: "/contact-us",
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

export default async function page({ params }: PageProps) {
  const [BodData, BocData] = await Promise.all([
    managementService.getManagementBodData(params.locale),
    managementService.getManagementBocData(params.locale),
  ]);

  const member = [...BodData, ...BocData].find(
    (item) => item.ulid === params.ulid
  );

  if (!member) {
    notFound();
  }

  const description =
    params.locale === "id" ? member.description_id : member.description_en;

  const documentItems: DownloadItem[] = [];
  if (member.cv_file && member.cv_file.path) {
    documentItems.push({
      title: `CV - ${member.name}`,
      size: member.cv_file.size,
      format: member.cv_file.format,
      viewUrl: `${FILE_PREVIEW_BASE_URL}${member.cv_file.path}`,
      downloadUrl: `${FILE_DOWNLOAD_BASE_URL}${member.cv_file.path}`,
    });
  }

  return (
    <main>
            <NavbarThemeTrigger theme="light" />
      <DetailHero
        name={member.name}
        title={member.position}
        imageUrl={`https://cdi-be.cmlabs.dev/file-storage/${member.image_hero}`}
        backLinkHref={`/${params.locale}/about-us/management`}
      />
      <BocBiography biographyHtml={description} />
      <div className="border border-neutral-200 w-full"></div>
      <DocumentDownload items={documentItems} />
    </main>
  );
}
