import { Hero } from "@/components/features/Sustainability/Hero";
import { Overview } from "@/components/features/Sustainability/Overview";
// import { SustainabilityFramework } from "@/components/features/Sustainability/SustainabilityFramework";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { sustainabilityService } from "@/services/Sustainability/FinancialServices";
import { SustainabilityPageProps } from "@/types/Sustainabilitys/Sustainability";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: SustainabilityPageProps): Promise<Metadata> {
  const t = await getTranslations("metadata");

  const aboutData = await sustainabilityService.getSustainabilityPageData(
    locale
  );
  const { sustainability_overview_banner } = aboutData;

  const pagePath = "/sustainability";

  const currentPath = locale === "en" ? pagePath : `/${locale}${pagePath}`;

  const title = "Chandra Daya Investasi";

  return {
    title: title,
    description: t("description"),
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),

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
        "en-US": "/en/sustainability",
        "id-ID": "/id/sustainability",
      },
    },

    openGraph: {
      title: title,
      description: t("description"),
      url: currentPath,
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
      title: title,
      description: t("description"),
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
      {/* <SustainabilityFramework
        data={frameworkData}
        policyTitle={policyContent.title}
        policyDescription={policyContent.description}
        policyFileUrl={policyContent.file_url}
      /> */}
    </main>
  );
}
