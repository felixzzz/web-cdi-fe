import { BusinessPillars } from "@/components/features/OurBusiness/ports-and-storage/BusinessPillars";
import { Hero } from "@/components/features/OurBusiness/ports-and-storage/Hero";
import { Overview } from "@/components/features/OurBusiness/ports-and-storage/Overview";
import { portStorageService } from "@/services/OurBusiness/PortsStorageService";
import { PortStoragePageProps } from "@/types/OurBusiness/Ports&Storage";

export default async function Page({ params: { locale } }: PortStoragePageProps) {
  const portStorageData = await portStorageService.getPortStoragePageData(locale);

  const {
    banner_image,
    banner_title,
    overview_title,
    overview_description,
    overview_image,
    heading_tab_title,
    tabs,
    link_url,
    link_title_en,
  } = portStorageData;
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
        {/* <BusinessPillars /> */}
        <BusinessPillars title={heading_tab_title} tab={tabs[0]} />
      </div>
    </>
  );
}
