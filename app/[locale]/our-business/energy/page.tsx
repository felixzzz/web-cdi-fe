import { BusinessPillars } from "@/components/features/OurBusiness/Energy/BusinessPillars";
import { Hero } from "@/components/features/OurBusiness/Energy/Hero";
import { Overview } from "@/components/features/OurBusiness/Energy/Overview";
import { energyService } from "@/services/OurBusiness/EnergyService";
import { EnergyApiResponse, EnergyPageProps } from "@/types/OurBusiness/Energy";

export default async function Page({ params: { locale } }: EnergyPageProps) {
  const energyData: EnergyApiResponse = await energyService.getEnergyPageData(locale);

  return (
    <>
      <div>
        <Hero
          imageSrc={energyData.banner_image}
          title={energyData.banner_title}
          iconSrc="https://chandradaya-investasi.com/assets/frontend/icons/ic_hero_circle_arrow_down.svg" 
        />

        <Overview
          title={energyData.overview_title}
          description={energyData.overview_description}
          imageUrl={energyData.overview_image}
          linkUrl={energyData.link_url}
          linkTitle={energyData.link_title_en}
        />
        <BusinessPillars
          title={energyData.heading_tab_title}
          tabs={energyData.tabs}
        />
      </div>
    </>
  );
}