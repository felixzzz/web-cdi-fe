import { BusinessPillars } from "@/components/features/OurBusiness/Logistics/BusinessPillars";
import { Hero } from "@/components/features/OurBusiness/Logistics/Hero";
import { Overview } from "@/components/features/OurBusiness/Logistics/Overview";
import { logisticService } from "@/services/OurBusiness/LogisticService";

export default async function Page() {
  const logisticData = await logisticService.getLogisticPageData();

  const {
    banner_image,
    banner_title,
    overview_title,
    overview_description,
    overview_image,
    tabs,
    link_url,
    link_title_en,
  } = logisticData;

  return (
    <>
      <div>
        <Hero
          imageSrc={banner_image}
          title={banner_title}
          iconSrc="https://chandradaya-investasi.com/assets/frontend/icons/ic_hero_circle_arrow_down.svg"
        />
        <Overview
          title={overview_title}
          description={overview_description}
          imageUrl={overview_image}
          linkUrl={link_url}
          linkTitle={link_title_en}
        />
        <BusinessPillars tabs={tabs} />
      </div>
    </>
  );
}
