import { AboutUs } from "@/components/features/homepage/AboutUs";
import { Article } from "@/components/features/homepage/Article";
// import { Article } from "@/components/features/homepage/Article";
import { Discover } from "@/components/features/homepage/Discover";
import { Hero } from "@/components/features/homepage/Hero";
import { Information } from "@/components/features/homepage/Information";
import {
  Journey,
  JourneyLink,
  JourneyStat,
} from "@/components/features/homepage/Journey";
import { Report } from "@/components/features/homepage/Report";
import { Solution } from "@/components/features/homepage/Solution";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { informationService } from "@/services/Global/informationService";
import { homeService } from "@/services/Homepage/homeService";
import { HomePageProps } from "@/types/Homepage/home";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

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

export default async function Page({ params: { locale } }: HomePageProps) {
  const t = await getTranslations("Homepage");

  const [homeData, reportData, quickLinksData, articleData] = await Promise.all(
    [
      homeService.getHomePageData(locale),
      homeService.getHomeReportData(locale),
      informationService.getHomeQuickLinks(locale),
      homeService.getHomeArticle(locale),
    ]
  );

  const {
    home_banner,
    home_banner_tagline,
    home_about_section,
    home_infrastructure_title,
    home_infrastructure_energy,
    home_infrastructure_water,
    home_infrastructure_port_storage,
    home_infrastructure_logistic,
    home_discover_title,
    home_discover_sustainability,
    home_discover_our_business,
    home_discover_investor,
    home_discover_career,
    home_journey_tagline,
    home_journey_content,
    home_journey_info_1,
    home_journey_info_2,
    home_journey_info_3,
  } = homeData;

  const stripHtml = (html: string | null) =>
    html ? html.replace(/<[^>]+>/g, "") : "";

  const statsData: JourneyStat[] = [
    {
      value: home_journey_info_1.title,
      description: stripHtml(home_journey_info_1.content),
    },
    {
      value: home_journey_info_2.title,
      description: stripHtml(home_journey_info_2.content),
    },
    {
      value: home_journey_info_3.title,
      description: stripHtml(home_journey_info_3.content),
    },
  ];

  const linksData: JourneyLink[] = [
    {
      href: "https.careers.capcx.com/",
      text: t("journey_career"),
      external: true,
    },
    {
      href: "/about-us/awards",
      text: t("journey_awards"),
      external: false,
    },
  ];

  return (
    <main>
      <NavbarThemeTrigger theme="dark" />
      <Hero
        videoSrc={home_banner.file_url}
        preTitle={home_banner_tagline.title}
        title={home_banner.title}
        subtitle={home_banner.content}
        linkHref="/about-us"
        linkText={t("more")}
        linkIcon={<ArrowRight size={14} />}
      />
      <AboutUs
        backgroundImageUrl={home_about_section.file_url}
        title={home_about_section.title}
        linkHref="/about-us"
        linkText={t("about")}
        linkIcon={<ArrowUpRight size={14} />}
      >
        <div
          className="text-[12px] md:text-[14px] leading-[24px] font-normal text-white space-y-6"
          dangerouslySetInnerHTML={{ __html: home_about_section.content || "" }}
        />
      </AboutUs>
      <NavbarThemeTrigger theme="dark" />
      <Solution
        home_infrastructure_title={home_infrastructure_title}
        home_infrastructure_energy={home_infrastructure_energy}
        home_infrastructure_water={home_infrastructure_water}
        home_infrastructure_port_storage={home_infrastructure_port_storage}
        home_infrastructure_logistic={home_infrastructure_logistic}
      />
      <NavbarThemeTrigger theme="dark" />
      <Discover
        home_discover_title={home_discover_title}
        home_discover_sustainability={home_discover_sustainability}
        home_discover_our_business={home_discover_our_business}
        home_discover_investor={home_discover_investor}
        home_discover_career={home_discover_career}
      />
      <NavbarThemeTrigger theme="dark" />
      <Journey
        eyebrow={home_journey_tagline.title}
        title={home_journey_content.title}
        backgroundImageUrl={home_journey_content.file_url}
        stats={statsData}
        links={linksData}
      >
        <div
          className="prose prose-invert prose-base leading-loose text-neutral-300 text-justify"
          // className="text-[12px] leading-[24px] font-normal text-white py-1 space-y-6"
          dangerouslySetInnerHTML={{
            __html: home_journey_content.content || "",
          }}
        />
      </Journey>
      <NavbarThemeTrigger theme="light" />
      <Report
        eyebrow={t("eye_report")}
        title={t("title_report")}
        downloadAllUrl={`${process.env.NEXT_PUBLIC_URL}/file/download/default/report/all`}
        seeAllUrl="/investor/financial-information"
        reports={reportData}
      />
      <Article articles={articleData} />
      <Information
        eyebrow={t("eye_information")}
        title={t("title_information")}
        backgroundImageUrl="https://cdi-be.cmlabs.dev/assets/frontend/images/homepage/quick_links.webp"
        links={quickLinksData}
      />
    </main>
  );
}
