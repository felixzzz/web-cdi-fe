import { Awards } from "@/components/features/AboutUs/awards/Awards";
import { Hero } from "@/components/features/AboutUs/awards/Hero";
import { Information } from "@/components/features/homepage/Information";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { awardsService } from "@/services/AboutUs/AwardsService";
import { informationService } from "@/services/Global/informationService";
import { AwardsPageProps } from "@/types/AboutUs/Awards";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const description =
  "PT Chandra Daya Investasi Tbk (CDI Group) merupakan bagian dari investasi infrastruktur Chandra Asri Group, penyedia bahan kimia energi dan solusi infrastruktur terkemuka di Asia Tenggara dan ECGO, perusahaan induk yang berfokus pada investasi bisnis ketenagalistrikan di Thailand. Beragam operasi CDI Group mencakup termasuk penyediaan dan pengolahan air, energi, kepelabuhanan & penyimpanan, dan logistik.";

const baseUrl = "https://cdi-be.cmlabs.dev";

export const metadata: Metadata = {
  title: "Awards & Certification | Chandra Daya Investasi",
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
    canonical: "/about-us/awards",
  },
  icons: {
    shortcut: "/assets/frontend/favicon.png",
  },

  openGraph: {
    title: "Chandra Daya Investasi",
    description: description,
    url: "/about-us/awards",
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
