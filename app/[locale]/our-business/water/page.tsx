import { BusinessPillars } from "@/components/features/OurBusiness/Water/BusinessPillars";
import { Hero } from "@/components/features/OurBusiness/Water/Hero";
import { Overview } from "@/components/features/OurBusiness/Water/Overview";
import { waterService } from "@/services/OurBusiness/WaterService";

export default async function Page() {
  const waterData = await waterService.getWaterPageData();

  return (
    <>
      <div>
        <Hero
          imageSrc={waterData.banner_image}
          title={waterData.banner_title}
          iconSrc="https://chandradaya-investasi.com/assets/frontend/icons/ic_hero_circle_arrow_down.svg" 
        />
        <Overview />
        <BusinessPillars />
      </div>
    </>
  );
}
