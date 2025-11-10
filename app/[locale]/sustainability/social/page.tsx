import { EmpoweringCommunities } from "@/components/features/Sustainability/Social/EmpoweringCommunities";
import { HealthAndSafety } from "@/components/features/Sustainability/Social/HealthAndSafety";
import { Hero } from "@/components/features/Sustainability/Social/Hero";
import { HumanRights } from "@/components/features/Sustainability/Social/HumanRights";
import { socialService } from "@/services/Sustainability/SocialServices";
import { SocialPageProps } from "@/types/Sustainabilitys/Social";

export default async function Page({params: {locale}}: SocialPageProps) {
  const [sosialData, tabsData, contentData] = await Promise.all([
    socialService.getSocialPageData(locale),
    socialService.getSocialTabData(locale), 
    socialService.getSocialContentData(locale), 
  ]);

  const { sustainability_social_banner, sustainability_social_overview } =
    sosialData;

const empoweringData = {
    ...sustainability_social_overview,
    tabs: tabsData,
  };

  const healthData = contentData.find(
    (item) => item.name === "Health and Safety Culture"
  );
  const humanRightsData = contentData.find(
    (item) => item.name === "Human Rights"
  );

  return (
    <>
      <div>
        <Hero
          imageSrc={sustainability_social_banner.file_url}
          title={
            sustainability_social_banner.title ||
            "Financial Information for Investors"
          }
          subtitle={sustainability_social_banner.content}
          iconSrc="https://chandradaya-investasi.com/assets/frontend/icons/ic_hero_circle_arrow_down.svg"
        />
        <EmpoweringCommunities data={empoweringData} />
        <HealthAndSafety data={healthData!} />
        <HumanRights data={humanRightsData!} />
      </div>
    </>
  );
}
