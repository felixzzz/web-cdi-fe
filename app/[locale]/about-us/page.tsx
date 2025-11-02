import { CompanyProfile } from "@/components/features/AboutUs/CompanyProfile";
import { Hero } from "@/components/features/AboutUs/Hero";
import { History } from "@/components/features/AboutUs/History";
import { Milestone } from "@/components/features/AboutUs/Milestone";
import { VisionMission } from "@/components/features/AboutUs/Mision&Vision";
import { SubNavbar } from "@/components/features/AboutUs/SubNavbar";
import { Overview } from "@/components/features/AboutUs/Overview";
import { aboutService, extractYouTubeId } from "@/services/AboutUs/AboutService";
import { convertHtmlToReact } from "@/lib/htmlUtils";
import { Information } from "@/components/features/Homepage/Information";
import { quickLinksData } from "../page";

const aboutLinks = [
  { text: "Company Overview", href: "/about-us" },
  { text: "Vision & Mission", href: "/about-us/vision-mission" },
  { text: "Our History", href: "/about-us/history" },
  { text: "Milestone", href: "/about-us/milestone" },
  { text: "Company Profile", href: "/about-us/company-profile" },
];

const milestoneData = [
  {
    year: "2023",
    achievements: [
      "CDI Group was established as an investment holding company...",
      "An investment of US$194 million from Electric Generating Public Company Limited...",
      "Acquired 70% of PT Krakatau Chandra Energi (KCE)...",
      "Expanded energy sector acquisitions...",
    ],
  },
  {
    year: "2024",
    achievements: [
      "Commenced solar panel business outside Cilegon",
      "Commenced Port and Storage business",
      "Started the operation of a desalination plant...",
      "Established PT Chandra Shipping International (CSI)...",
      "Established PT Chandra Cold Chain (CCC)...",
    ],
  },
];

const stripHtml = (html: string | null) =>
  html ? html.replace(/<[^>]+>/g, "") : "";

export default async function Page() {
  const aboutData = await aboutService.getAboutPageData();

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
  };

  const missionData = {
    statement: stripHtml(about_us_mission.content),
    imageUrl: about_us_mission.file_url,
  };

  return (
    <>
      <div>
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
          <div
          className="text-[12px] leading-[24px] text-white py-1 space-y-6"
          >
            {convertHtmlToReact(about_us_company_overview.content)}
          </div>
        </Overview>
        <VisionMission
          title={about_us_vision_mission_tagline.title || "Vision & Mission"}
          visionData={visionData}
          missionData={missionData}
        />
        <History />
        <Milestone
          title={about_us_milestone.title || "From Then to Now"}
          subtitle={
            stripHtml(about_us_milestone.content) ||
            "Explore PT Chandra Daya Investasi Tbk key milestones over the years."
          }
          backgroundImageUrl={about_us_milestone.file_url}
          data={milestoneData} 
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
          itemTitle="Company Profile CDI Group"
          itemSize="2.01 MB"
          itemViewUrl="https://chandradaya-investasi.com/file/preview/default/company_profile/Company_Profile_1018/"
          itemDownloadUrl="https://chandradaya-investasi.com/file/download/default/company_profile/Company_Profile_1018/"
        />
        <Information
                        eyebrow="QUICK LINKS"
                        title="Need to access detailed information?"
                        backgroundImageUrl="https://chandradaya-investasi.com/assets/frontend/images/homepage/quick_links.webp"
                        links={quickLinksData}
                      />
      </div>
    </>
  );
}
