import { Awards } from "@/components/features/AboutUs/awards/Awards";
import { Hero } from "@/components/features/AboutUs/awards/Hero";
import { Information } from "@/components/features/Homepage/Information";
import { awardsService } from "@/services/AboutUs/AwardsService";
import { informationService } from "@/services/Global/informationService";

export default async function Page() {
  const [
    awardsPageData,
    quickLinksData,
    awardsResponse,
    certificationResponse,
    membershipResponse,
  ] = await Promise.all([
    awardsService.getAwardsPageData(),
    informationService.getHomeQuickLinks(),
    awardsService.getAwardsTabPageData(),
    awardsService.getCertificationTabPageData(),
    awardsService.getMembershipTabPageData(),
  ]);

  const { about_us_award_banner, about_us_award_overview } = awardsPageData;

  return (
    <div>
      <Hero
        imageSrc={about_us_award_banner.file_url}
        title={about_us_award_banner.title || "About Chandra Daya Investasi"}
        subtitle={about_us_award_banner.content}
        iconSrc="https://chandradaya-investasi.com/assets/frontend/icons/ic_hero_circle_arrow_down.svg"
      />
      <Awards
        title={about_us_award_overview.title}
        description={about_us_award_overview.content}
        initialAwardsResponse={awardsResponse}
        initialCertificationResponse={certificationResponse}
        initialMembershipResponse={membershipResponse}
      />
      <Information
        eyebrow="QUICK LINKS"
        title="Need to access detailed information?"
        backgroundImageUrl="https://chandradaya-investasi.com/assets/frontend/images/homepage/quick_links.webp"
        links={quickLinksData}
      />
    </div>
  );
}
