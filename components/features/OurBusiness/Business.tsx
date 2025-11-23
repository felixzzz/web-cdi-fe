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
    route: item.route,
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
          <div className="container mx-auto px-4 md:px-8 lg:px-20 2xl:px-44">
            <div
              className="text-[12px] leading-[24px] font-normal text-white space-y-6"
              dangerouslySetInnerHTML={{ __html: overview.content }}
            />
          </div>
        </div>
      )}
    </section>
  );
}