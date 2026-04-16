import { CompanyProfile } from "@/components/features/AboutUs/CompanyProfile";
import { Hero } from "@/components/features/AboutUs/Hero";
import { History } from "@/components/features/AboutUs/History";
import { Milestone } from "@/components/features/AboutUs/Milestone";
import { VisionMission } from "@/components/features/AboutUs/Mision&Vision";
import { SubNavbar } from "@/components/features/AboutUs/SubNavbar";
import { Overview } from "@/components/features/AboutUs/Overview";
import {
  aboutService,
  extractYouTubeId,
} from "@/services/AboutUs/AboutService";
import { convertHtmlToReact } from "@/lib/htmlUtils";
import { Information } from "@/components/features/homepage/Information";
import { informationService } from "@/services/Global/informationService";
import { AboutPageProps } from "@/types/AboutUs/About";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { stripHtml } from "@/lib/localization";

export async function generateMetadata({
  params: { locale },
}: AboutPageProps): Promise<Metadata> {
  const t = await getTranslations("metadata-seo.about-us");
  const aboutData = await aboutService.getAboutPageData(locale);

  const { about_us_banner } = aboutData;
  const pagePath = "/about-us";

  const baseUrl = process.env.NEXT_PUBLIC_URL_LP || "http://localhost:3000";

  const getCanonicalPath = (lang: string) => {
    if (lang === "id") return `${baseUrl}/${lang}${pagePath}`;
    return `${baseUrl}/${lang}${pagePath}`;
  };

  const currentUrl = getCanonicalPath(locale);

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL_LP}/${locale}`),

    keywords: [
      "Chandra Daya Investasi",
      "CDI",
      "CDIA",
      "PT Chandra Daya Investasi Tbk",
      "CDI Group",
      "Infrastructure Investment Indonesia",
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
        "en-US": getCanonicalPath("en"), // Selalu return .../en/media/news
        "id-ID": getCanonicalPath("id"), // Selalu return .../media/news
      },
    },

    openGraph: {
      title: t("title"),
      description: t("description"),
      url: currentUrl,
      siteName: "Chandra Daya Investasi",
      locale: locale,
      type: "website",
      images: [
        {
          url: about_us_banner?.file_url || "/assets/frontend/favicon.png",
          width: 1200,
          height: 630,
          alt: about_us_banner?.title || "CDI Banner",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [about_us_banner?.file_url || "/assets/frontend/favicon.png"],
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

export default async function Page({ params: { locale } }: AboutPageProps) {
  const t = await getTranslations("AboutUs");

  const [aboutData, quickLinksData, historyData, milstoneData, profileData] =
    await Promise.all([
      aboutService.getAboutPageData(locale),
      informationService.getHomeQuickLinks(locale),
      aboutService.getHistoryData(locale),
      aboutService.getMilstoneData(locale),
      aboutService.getProfileData(locale),
    ]);

  const {
    about_us_banner,
    about_us_company_overview_tagline,
    about_us_company_overview,
    about_us_company_overview_background,
    about_us_youtube,
    about_us_vision_mission_tagline,
    about_us_vision,
    about_us_mission,
    about_us_milestone,
    about_us_company_profile,
  } = aboutData;

  const youtubeId = extractYouTubeId(about_us_youtube.content);

  const visionData = {
    statement: stripHtml(about_us_vision.content),
    imageUrl: about_us_vision.file_url,
    title: "Our Vision",
  };

  const missionData = {
    statement: stripHtml(about_us_mission.content),
    imageUrl: about_us_mission.file_url,
    title: "Our Mission",
  };

  const SECTION_IDS = {
    ABOUT_US: "about-us",
    VISION_MISSION: "vision-mission",
    HISTORY: "history",
    MILESTONE: "milestone",
    COMP_PROFILE: "company-profile",
  };

  const aboutLinks = [
    { text: t("About_Us"), targetId: SECTION_IDS.ABOUT_US },
    { text: t("Vision_Mission"), targetId: SECTION_IDS.VISION_MISSION },
    { text: t("Our_History"), targetId: SECTION_IDS.HISTORY },
    { text: t("Milestone"), targetId: SECTION_IDS.MILESTONE },
    { text: t("Company_Profile"), targetId: SECTION_IDS.COMP_PROFILE },
  ];

  return (
    <main>
      <NavbarThemeTrigger theme="dark" />
      <Hero
        imageSrc={about_us_banner.file_url}
        title={about_us_banner.title || "About Chandra Daya Investasi"}
        subtitle={about_us_banner.content}
        iconSrc="/assets/icons/ic_hero_circle_arrow_down.svg"
      />
      <SubNavbar links={aboutLinks} />
      <Overview
        id="about-us"
        bgImageUrl={about_us_company_overview_background.file_url}
        logoSrc="/assets/icons/logo_cdi_footer_new.svg"
        logoAlt="Chandra Asri Group Logo"
        logoWidth={200}
        logoHeight={80}
        eyebrowText={about_us_company_overview_tagline.title || ""}
        mainImageUrl={about_us_company_overview.file_url}
        mainImageAlt="Company Overview"
        mainImageWidth={800}
        mainImageHeight={600}
        youtubeVideoId={youtubeId}
        videoTitle="Company Profile Video - CDI Group"
      >
        <span className="prose prose-invert prose-base text-neutral-300 text-sm lg:text-base leading-relaxed lg:leading-loose text-justify">
          {convertHtmlToReact(about_us_company_overview.content)}
        </span>
      </Overview>
      <VisionMission
        id="vision-mission"
        title={about_us_vision_mission_tagline.title || "Vision & Mission"}
        visionData={visionData}
        missionData={missionData}
      />
      <History data={historyData} />
      <Milestone
        title={about_us_milestone.title || "From Then to Now"}
        subtitle={
          stripHtml(about_us_milestone.content) ||
          "Explore PT Chandra Daya Investasi Tbk key milestones over the years."
        }
        backgroundImageUrl={about_us_milestone.file_url}
        data={milstoneData}
      />
      <CompanyProfile
        id="company-profile"
        title={
          about_us_company_profile.title ||
          "Curious to learn more about Chandra Daya Investasi?"
        }
        subtitle={
          stripHtml(about_us_company_profile.content) ||
          "Gain deeper insights into our story, growth, and latest achievements by downloading our company profile"
        }
        data={profileData}
        locale={locale}
      />
      <Information
        eyebrow={t("eye_information")}
        title={t("title_information")}
        backgroundImageUrl={`${process.env.NEXT_PUBLIC_URL}/assets/frontend/images/homepage/quick_links.webp`}
        links={quickLinksData}
      />
    </main>
  );
}