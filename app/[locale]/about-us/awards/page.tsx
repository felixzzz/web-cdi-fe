import { Awards } from "@/components/features/AboutUs/awards/Awards";
import { Hero } from "@/components/features/AboutUs/awards/Hero";
import { Information } from "@/components/features/Homepage/Information";
import { awardsService } from "@/services/AboutUs/AwardsService";
import { informationService } from "@/services/Global/informationService";
import { AwardsPageProps } from "@/types/AboutUs/Awards";
import { getTranslations } from "next-intl/server";

export default async function Page({ params: { locale } }: AwardsPageProps) {
  const t = await getTranslations("Awards")
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
        eyebrow={t('eye_information')}
        title={t('title_information')}
        backgroundImageUrl="https://chandradaya-investasi.com/assets/frontend/images/homepage/quick_links.webp"
        links={quickLinksData}
      />
    </div>
  );
}
