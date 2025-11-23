import { Awards } from "@/components/features/AboutUs/awards/Awards";
import { Hero } from "@/components/features/AboutUs/awards/Hero";
import { Information } from "@/components/features/homepage/Information";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { awardsService } from "@/services/AboutUs/AwardsService";
import { informationService } from "@/services/Global/informationService";
import { AwardsPageProps } from "@/types/AboutUs/Awards";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: AwardsPageProps): Promise<Metadata> {
  const aboutData = await awardsService.getAwardsPageData(locale);

  const { about_us_award_banner } = aboutData;

  const pagePath = "/about-us/awards";

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
        "en-US": "/about-us/awards",
        "id-ID": "/id/about-us/awards",
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
          url: about_us_award_banner?.file_url || "/assets/frontend/favicon.png",
          width: 1200,
          height: 630,
          alt: about_us_award_banner?.title || "CDI Banner",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [about_us_award_banner?.file_url || "/assets/frontend/favicon.png"],
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

export default async function Page({ params: { locale } }: AwardsPageProps) {
  const t = await getTranslations("Awards");
  const [
    awardsPageData,
    quickLinksData,
    awardsResponse,
    certificationResponse,
    membershipResponse,
  ] = await Promise.all([
    awardsService.getAwardsPageData(locale),
    informationService.getHomeQuickLinks(locale),
    awardsService.getAwardsTabPageData(locale),
    awardsService.getCertificationTabPageData(locale),
    awardsService.getMembershipTabPageData(locale),
  ]);

  const { about_us_award_banner, about_us_award_overview } = awardsPageData;

  return (
    <main>
      <NavbarThemeTrigger theme="dark" />
      <Hero
        imageSrc={about_us_award_banner.file_url}
        title={about_us_award_banner.title || "About Chandra Daya Investasi"}
        subtitle={about_us_award_banner.content}
        iconSrc="https://cdi-be.cmlabs.dev/assets/frontend/icons/ic_hero_circle_arrow_down.svg"
      />
      <Awards
        title={about_us_award_overview.title}
        description={about_us_award_overview.content}
        initialAwardsResponse={awardsResponse}
        initialCertificationResponse={certificationResponse}
        initialMembershipResponse={membershipResponse}
      />
      <Information
        eyebrow={t("eye_information")}
        title={t("title_information")}
        backgroundImageUrl="https://cdi-be.cmlabs.dev/assets/frontend/images/homepage/quick_links.webp"
        links={quickLinksData}
      />
    </main>
  );
}
