import { EmpoweringCommunities } from "@/components/features/Sustainability/Social/EmpoweringCommunities";
import { HealthAndSafety } from "@/components/features/Sustainability/Social/HealthAndSafety";
import { Hero } from "@/components/features/Sustainability/Social/Hero";
import { HumanRights } from "@/components/features/Sustainability/Social/HumanRights";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { socialService } from "@/services/Sustainability/SocialServices";
import { SocialPageProps } from "@/types/Sustainabilitys/Social";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { seoService } from "@/services/Global/seoService";

export async function generateMetadata({
  params: { locale },
}: SocialPageProps): Promise<Metadata> {
  const [seo, t, aboutData] = await Promise.all([
    seoService.getPageSeoMetadata("meta_sustainability_social", locale),
    getTranslations("metadata-seo.sustainability-social"),
    socialService.getSocialPageData(locale),
  ]);

  const title = seo.title || t("title");
  const description = seo.description || t("description");

  const { sustainability_social_banner } = aboutData;

  const pagePath = "/sustainability/social";

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
            sustainability_social_banner.file_url ||
            "/assets/frontend/favicon.png",
          width: 1200,
          height: 630,
          alt: sustainability_social_banner.title || "CDI Banner",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        sustainability_social_banner.file_url || "/assets/frontend/favicon.png",
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

export default async function Page({ params: { locale } }: SocialPageProps) {
  const [sosialData, tabsData, contentData] = await Promise.all([
    socialService.getSocialPageData(locale),
    socialService.getSocialTabData(locale),
    socialService.getSocialContentData(locale),
  ]);

  const { sustainability_social_banner, sustainability_social_overview } =
    sosialData;

  const empoweringData = {
    ...sustainability_social_overview,
    tabs: tabsData,
  };

  const healthData = contentData.find(
    (item) => item.name === "Health and Safety Culture"
  );
  const humanRightsData = contentData.find(
    (item) => item.name === "Human Rights"
  );

  return (
    <main>
      <NavbarThemeTrigger theme="dark" />
      <Hero
        imageSrc={sustainability_social_banner.file_url}
        title={
          sustainability_social_banner.title ||
          "Financial Information for Investors"
        }
        subtitle={sustainability_social_banner.content}
        iconSrc="/assets/icons/ic_hero_circle_arrow_down.svg"
      />
      <EmpoweringCommunities data={empoweringData} />
      <HealthAndSafety data={healthData!} />
      <HumanRights data={humanRightsData!} />
    </main>
  );
}
