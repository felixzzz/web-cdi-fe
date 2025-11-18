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

const aboutLinks = [
  { text: "Company Overview", href: "/about-us" },
  { text: "Vision & Mission", href: "/about-us/vision-mission" },
  { text: "Our History", href: "/about-us/history" },
  { text: "Milestone", href: "/about-us/milestone" },
  { text: "Company Profile", href: "/about-us/company-profile" },
];

const stripHtml = (html: string | null) =>
  html ? html.replace(/<[^>]+>/g, "") : "";

const description = "PT Chandra Daya Investasi Tbk (CDI Group) merupakan bagian dari investasi infrastruktur Chandra Asri Group, penyedia bahan kimia energi dan solusi infrastruktur terkemuka di Asia Tenggara dan ECGO, perusahaan induk yang berfokus pada investasi bisnis ketenagalistrikan di Thailand. Beragam operasi CDI Group mencakup termasuk penyediaan dan pengolahan air, energi, kepelabuhanan & penyimpanan, dan logistik.";

const baseUrl = "https://chandradaya-investasi.com";

export const metadata: Metadata = {
  title: "Management and Organization Structure | Chandra Daya Investasi", 
  description: description,
  keywords: ['Chandra Daya Investasi', 'CDI', 'CDIA', 'PT Chandra Daya Investasi Tbk', 'CDI Group'],
  
  metadataBase: new URL(baseUrl),

  viewport: {
    width: 'device-width',
    initialScale: 1.0,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/contact-us',
  },
  icons: {
    shortcut: '/assets/frontend/favicon.png',
  },

  openGraph: {
    title: "Chandra Daya Investasi",
    description: description,
    url: '/contact-us',
    type: 'website',
    siteName: 'Chandra Daya Investasi',
  },

  twitter: {
    card: 'summary_large_image',
    title: "Chandra Daya Investasi",
    description: description,
  },

  other: {
    'application-url': 'https://chandradaya-investasi.com',
    'preview-url': 'https://chandradaya-investasi.com/file-storage',
    'download-file': 'https://chandradaya-investasi.com/file-download',
    'add-file-preview': 'https://chandradaya-investasi.com/file/preview',
    'add-file-download': 'https://chandradaya-investasi.com/file/download',
  }
};

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
    title: "Our Vision"
  };
  
  const missionData = {
    statement: stripHtml(about_us_mission.content),
    imageUrl: about_us_mission.file_url,
    title: "Our Mission"
  };

  return (
    <>
      <div>
              <NavbarThemeTrigger theme="dark" />
        <Hero
          imageSrc={about_us_banner.file_url}
          title={about_us_banner.title || "About Chandra Daya Investasi"}
          subtitle={about_us_banner.content}
          iconSrc="https://chandradaya-investasi.com/assets/frontend/icons/ic_hero_circle_arrow_down.svg"
        />
        <SubNavbar links={aboutLinks} />
        <Overview
          id="company-overview"
          bgImageUrl={about_us_company_overview_background.file_url}
          logoSrc="https://chandradaya-investasi.com/assets/frontend/logo_cdi_footer_new.svg"
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
          <div className="prose prose-invert prose-base text-neutral-300">
            {convertHtmlToReact(about_us_company_overview.content)}
          </div>
        </Overview>
        <VisionMission
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
        />
        <Information
          eyebrow={t('eye_information')}
          title={t('title_information')}
          backgroundImageUrl="https://chandradaya-investasi.com/assets/frontend/images/homepage/quick_links.webp"
          links={quickLinksData}
        />
      </div>
    </>
  );
}
