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

      <div className="flex w-full flex-col lg:flex-row lg:aspect-video">
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
          <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
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