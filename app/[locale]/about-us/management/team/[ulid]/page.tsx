import { BocBiography } from "@/components/features/AboutUs/management/Details/Biography";
import { DocumentDownload } from "@/components/features/AboutUs/management/Details/Document";
import { DetailHero } from "@/components/features/AboutUs/management/Details/Hero";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { managementService } from "@/services/AboutUs/ManagementService";
import { DownloadItem } from "@/types/AboutUs/Management";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export type PageProps = {
  params: {
    ulid: string;
    locale: string;
  };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const t = await getTranslations("metadata");
  const [BodData, BocData] = await Promise.all([
    managementService.getManagementBodData(params.locale),
    managementService.getManagementBocData(params.locale),
  ]);

  const member = [...BodData, ...BocData].find(
    (item) => item.ulid === params.ulid
  );

  const pagePath = `/about-us/management/team/${params.ulid}`;

  const title = "Chandra Daya Investasi";

  const baseUrl = process.env.NEXT_PUBLIC_URL_LP || "http://localhost:3000";
  
  const getCanonicalPath = (lang: string) => {
    if (lang === 'id') return `${baseUrl}/${lang}${pagePath}`; 
    return `${baseUrl}/${lang}${pagePath}`;      
  };

  const currentUrl = getCanonicalPath(params.locale);

  return {
    title: title,
    description: t("description"),
    metadataBase: new URL(`${baseUrl}/${params.locale}`),

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
        "en-US": getCanonicalPath('en'), // Selalu return .../en/media/news
        "id-ID": getCanonicalPath('id'), // Selalu return .../media/news
      },
    },

    openGraph: {
      title: title,
      description: t("description"),
      url: currentUrl,
      siteName: "Chandra Daya Investasi",
      locale: params.locale,
      type: "website",
      images: [
        {
          url: member?.image_hero || "/assets/frontend/favicon.png",
          width: 1200,
          height: 630,
          alt: member?.name || "CDI Banner",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: title,
      description: t("description"),
      images: [member?.image_hero || "/assets/frontend/favicon.png"],
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
      viewUrl: `${process.env.NEXT_PUBLIC_URL}/file-storage/${member.cv_file.path}`,
      downloadUrl: `${process.env.NEXT_PUBLIC_URL}/file-download/${member.cv_file.path}`,
    });
  }

  return (
    <main>
      <NavbarThemeTrigger theme="light" />
      <DetailHero
        name={member.name}
        title={member.position}
        imageUrl={`${process.env.NEXT_PUBLIC_URL}/file-storage/${member.image_hero}`}
        backLinkHref={`/about-us/management`}
      />
      <BocBiography biographyHtml={description} />
      <div className="border border-neutral-200 w-full"></div>
      <DocumentDownload items={documentItems} />
    </main>
  );
}
