import { AboutUs } from "@/components/features/homepage/AboutUs";
// import { Article } from "@/components/features/homepage/Article";
import { Discover } from "@/components/features/homepage/Discover";
import { Hero } from "@/components/features/homepage/Hero";
import {
  Information,
  QuickLink,
} from "@/components/features/homepage/Information";
import {
  Journey,
  JourneyLink,
  JourneyStat,
} from "@/components/features/homepage/Journey";
import { Report } from "@/components/features/homepage/Report";
import { ReportItemProps } from "@/components/features/homepage/ReportItem";
import { Solution } from "@/components/features/homepage/Solution";
import { homeService } from "@/services/Homepage/homeService";
import { ArrowRight, ArrowUpRight } from "lucide-react";
// import { useTranslations } from "next-intl";

const quickLinksData: QuickLink[] = [
  { href: "/about-us", text: "Who We Are" },
  { href: "/about-us/management", text: "Management & Structure" },
  { href: "/investor/financial-information", text: "Financial Information" },
  { href: "/investor/report", text: "Report" },
  { href: "/governance/policy", text: "Code of Conduct" },
];

const reportsData: ReportItemProps[] = [
  {
    title: "Audited Financial Report - 30 Jun 2025",
    date: "15 September 2025",
    size: "2.1 MB",
    viewUrl: "https://...",
    downloadUrl: "https://...",
  },
  {
    title: "Audited Report 2024",
    date: "14 April 2025",
    size: "3.59 MB",
    viewUrl: "https://...",
    downloadUrl: "https://...",
  },
];

export default async function Page() {
  const homeData = await homeService.getHomePageData();
  // const t = useTranslations("homepage");

  // console.log(homeData);

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
    text: "Join with Us",
    external: true,
  },
  {
    href: "/about-us/awards",
    text: "All Awards",
    external: false,
  },
];

  return (
    <main>
      <Hero
        videoSrc={home_banner.video_url}
        preTitle={home_banner_tagline.title}
        title={home_banner.title}
        subtitle={home_banner.content}
        linkHref="/about-us"
        linkText="Learn More"
        linkIcon={<ArrowRight size={14} />}
      />
      <AboutUs
        backgroundImageUrl={home_about_section.file_url}
        title={home_about_section.title}
        linkHref="/about-us"
        linkText="About Us"
        linkIcon={<ArrowUpRight size={14} />}
      >
        <div
          className="text-[12px] leading-[24px] font-normal text-white space-y-6"
          dangerouslySetInnerHTML={{ __html: home_about_section.content || "" }}
        />
      </AboutUs>
      <Solution
        home_infrastructure_title={home_infrastructure_title}
        home_infrastructure_energy={home_infrastructure_energy}
        home_infrastructure_water={home_infrastructure_water}
        home_infrastructure_port_storage={home_infrastructure_port_storage}
        home_infrastructure_logistic={home_infrastructure_logistic}
      />
      <Discover
        home_discover_title={home_discover_title}
        home_discover_sustainability={home_discover_sustainability}
        home_discover_our_business={home_discover_our_business}
        home_discover_investor={home_discover_investor}
        home_discover_career={home_discover_career}
      />
      <Journey
        eyebrow={home_journey_tagline.title}
        title={home_journey_content.title}
        backgroundImageUrl={home_journey_content.file_url}
        stats={statsData}
        links={linksData}
      >
        <div
          className="text-[12px] leading-[24px] font-normal text-white py-1 space-y-6"
          dangerouslySetInnerHTML={{
            __html: home_journey_content.content || "",
          }}
        />
      </Journey>
      <Report
        eyebrow="LATEST DOCUMENTS"
        title="Financial Reports"
        downloadAllUrl="https://..."
        seeAllUrl="/investor/financial-information"
        reports={reportsData}
      />
      {/* <Article /> */}
      <Information
        eyebrow="QUICK LINKS"
        title="Need to access detailed information?"
        backgroundImageUrl="https://chandradaya-investasi.com/assets/frontend/images/homepage/quick_links.webp"
        links={quickLinksData}
      />
    </main>
  );
}
