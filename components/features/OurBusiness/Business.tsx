import {
  BusinessItem,
  BusinessSection,
} from "@/types/OurBusiness/Bussines";
import { BusinessCard, BusinessCardProps } from "./BusinessCard";

interface BusinessProps {
  overview: BusinessSection;
  items: BusinessItem[];
}

export function Business({ overview, items }: BusinessProps) {
  const cardData: BusinessCardProps[] = items.map((item) => ({
    title: item.title,
    imageUrl: item.image,
    descriptionHtml: item.description,
    tags: item.tabs.map((tab) => tab.title), 
    route: `our-business/${item.title_en.toLowerCase().replace(/\blogistic\b/g, "logistics").replace(/&/g, "and").replace(/\s+/g, "-")}`,
  }));

  return (
    <section aria-labelledby="business-heading" className="w-full">
      <h2 id="business-heading" className="sr-only">
        Our Business Sectors
      </h2>

      <div className="flex w-full flex-row md:aspect-video">
        {cardData.map((card) => (
          <BusinessCard
            key={card.title}
            title={card.title}
            imageUrl={card.imageUrl}
            descriptionHtml={card.descriptionHtml}
            tags={card.tags}
            route={card.route} 
          />
        ))}
      </div>

      {overview.content && (
        <div className="bg-[#091A24] text-white pt-10 pb-20">
          <div className="container mx-auto px-4 md:px-4 lg:px-20 xl:px-8 2xl:px-44">
            <div
              className="font-normal text-neutral-300 space-y-6 text-[10px] md:text-[12px] md:leading-[24px] text-justify"
              dangerouslySetInnerHTML={{ __html: overview.content }}
            />
          </div>
        </div>
      )}
    </section>
  );
}