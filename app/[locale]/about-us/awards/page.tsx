import { Awards } from "@/components/features/AboutUs/awards/Awards";
import { Hero } from "@/components/features/AboutUs/awards/Hero";
import { awardsService } from "@/services/AboutUs/AwardsService";

export default async function Page() {
  const awardsData = await awardsService.getAwardsPageData();

  const { about_us_award_banner, about_us_award_overview } = awardsData;

  // console.log(awardsData)

  return (
    <div>
      <Hero
        imageSrc={about_us_award_banner.file_url}
        title={
          about_us_award_banner.title || "About Chandra Daya Investasi"
        }
        subtitle={about_us_award_banner.content}
        iconSrc="https://chandradaya-investasi.com/assets/frontend/icons/ic_hero_circle_arrow_down.svg"
      />
      <Awards
        title={about_us_award_overview.title}
        description={about_us_award_overview.content}
      />
    </div>
  );
}
