import { AboutUs } from "@/components/features/Homepage/AboutUs";
import { Article } from "@/components/features/Homepage/Article";
// import { Article } from "@/components/features/homepage/Article";
import { Discover } from "@/components/features/Homepage/Discover";
import { Hero } from "@/components/features/Homepage/Hero";
import { Information } from "@/components/features/Homepage/Information";
import {
  Journey,
  JourneyLink,
  JourneyStat,
} from "@/components/features/Homepage/Journey";
import { Report } from "@/components/features/Homepage/Report";
import { Solution } from "@/components/features/Homepage/Solution";
import { informationService } from "@/services/Global/informationService";
import { homeService } from "@/services/Homepage/homeService";
import { HomePageProps } from "@/types/Homepage/home";
import { ArrowRight, ArrowUpRight } from "lucide-react";
// import { useTranslations } from "next-intl";

export default async function Page({ params: { locale } }: HomePageProps) {
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
          className="prose prose-invert prose-base text-neutral-300"
          // className="text-[12px] leading-[24px] font-normal text-white py-1 space-y-6"
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
        reports={reportData}
      />
      <Article articles={articleData} />
      <Information
        eyebrow="QUICK LINKS"
        title="Need to access detailed information?"
        backgroundImageUrl="https://chandradaya-investasi.com/assets/frontend/images/homepage/quick_links.webp"
        links={quickLinksData}
      />
    </main>
  );
}
