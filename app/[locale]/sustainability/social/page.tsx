import { EmpoweringCommunities } from "@/components/features/Sustainability/Social/EmpoweringCommunities";
import { HealthAndSafety } from "@/components/features/Sustainability/Social/HealthAndSafety";
import { Hero } from "@/components/features/Sustainability/Social/Hero";
import { HumanRights } from "@/components/features/Sustainability/Social/HumanRights";
import { socialService } from "@/services/Sustainability/SocialServices";

export default async function Page() {
  const [sosialData, tabsData] = await Promise.all([
    socialService.getSocialPageData(),
    socialService.getSocialTabData(), 
  ]);

  const { sustainability_social_banner, sustainability_social_overview } =
    sosialData;

const empoweringData = {
    ...sustainability_social_overview,
    tabs: tabsData,
  };

  return (
    <>
      <div>
        <Hero
          imageSrc={sustainability_social_banner.file_url}
          title={
            sustainability_social_banner.title ||
            "Financial Information for Investors"
          }
          subtitle={sustainability_social_banner.content_en}
          iconSrc="https://chandradaya-investasi.com/assets/frontend/icons/ic_hero_circle_arrow_down.svg"
        />
        <EmpoweringCommunities data={empoweringData} />
        <HealthAndSafety />
        <HumanRights />
      </div>
    </>
  );
}
