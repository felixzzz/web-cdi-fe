import { Hero } from "@/components/features/Investor/PublicationsForInvestors/Hero";
import { Publications } from "@/components/features/Investor/PublicationsForInvestors/Publications";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { publicationService } from "@/services/Investor/PublicationServices";
import { PublicationPageProps } from "@/types/Investor/Publication";
import { Metadata } from "next";
// import { useTranslations } from "next-intl";

export async function generateMetadata({
  params: { locale },
}: PublicationPageProps): Promise<Metadata> {
  const publicationData = await publicationService.getPublicationPageData(
    locale
  );
  const { investor_publication_banner } = publicationData;

  const pagePath = "/investor/publications-for-investors";

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
        "en-US": "/en/investor/publications-for-investors",
        "id-ID": "/id/investor/publications-for-investors",
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
          url: investor_publication_banner.file_url || "/assets/frontend/favicon.png",
          width: 1200,
          height: 630,
          alt: investor_publication_banner.title || "CDI Banner",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [investor_publication_banner.file_url || "/assets/frontend/favicon.png"],
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
}: PublicationPageProps) {
  // const t = useTranslations("homepage");

  const publicationData = await publicationService.getPublicationPageData(
    locale
  );

  const initialTab = "prospectus";
  const initialData = await publicationService.getPublicationTabData(
    locale,
    initialTab,
    1
  );

  const { investor_publication_banner } = publicationData;

  return (
    <main>
      <NavbarThemeTrigger theme="dark" />
      <Hero
        imageSrc={investor_publication_banner.file_url}
        title={
          investor_publication_banner.title ||
          "Financial Information for Investors"
        }
        iconSrc="/assets/icons/ic_hero_circle_arrow_down.svg"
      />
      <NavbarThemeTrigger theme="light" />
      <Publications
        locale={locale}
        initialData={initialData}
        initialTab={initialTab}
      />
    </main>
  );
}
