import { BusinessSection } from "@/types/OurBusiness/Bussines";
import { BusinessCard, BusinessCardProps } from "./BusinessCard";

const cardData: BusinessCardProps[] = [
  {
    title: "Energy",
    imageUrl:
      "https://chandradaya-investasi.com/file-storage/MU5uK1FFN3owUHhQY0tDK1JQckVudUEvRERNWG1uMDZ1Q3ZNYlZENFNpY2F3d1A2dE9CcEM4Q2RPSEZrY3RCZVNKOS81ZkNDOUpOSHM2TFJWOERqOEE9PQ.webp",
    descriptionHtml:
      "<p>Our energy business and operations are managed under <strong>PT Krakatau Chandra Energi (KCE)</strong>, in which we hold a 70% stake, acquired from PT Krakatau Sarana Infrastruktur, a subsidiary of PT Krakatau Steel (Persero) Tbk, in 2023. This acquisition strengthens our ability to support strategic sectors in Indonesia, while offering synergies and providing the necessary supporting utilities for future growth and expansion. The targeted growth also includes renewable energy (EBT) businesses, where <strong>CDI Group</strong>, through KCE, is committed to becoming a pioneer in driving the energy transition toward a more sustainable future, supporting the government's target of achieving net zero emissions by 2060.</p>",
    tags: ["Energy Provider", "Electrical Services", "Renewable Energy"],
  },
  {
    title: "Water",
    imageUrl:
      "https://chandradaya-investasi.com/file-storage/aXhWRFhmMXNQUkNMeXRIUVo3UDVlMFBlRlNCbTNYMTEzT3ZHV285dU05NHJ5Q2JYbUE5cUtkSFNBNWFra25GclZqWmluQjJ2UVlxM0cyS0YrRHM5bFE9PQ.webp",
    descriptionHtml:
      "<p>Our water business and activities are operated by our affiliate company <strong>PT Krakatau Tirta Industri (KTI)</strong>, in which we hold a 49% stake acquired from PT Krakatau Sarana Infrastruktur, a subsidiary of PT Krakatau Steel (Persero) Tbk, in 2023. Our industrial water business includes: clean water, demineralized water, and wastewater management.</p><p><br></p>",
    tags: ["CLEAN WATER", "DEMIN WATER", "WASTEWATER TREATMENT"],
  },
  {
    title: "Ports & Storage",
    imageUrl:
      "https://chandradaya-investasi.com/file-storage/ZTBlS0hpSjR6TUlLT0pUa0N3a1VFaTNxVkl3ZEkySnZyVFhUVS9ZanpSN0E5MjJCOHlHL2cya3dWTWtWZWkwaVVMOE53VnNxSkMxRk1UTi9xMlh1dGc9PQ.webp",
    descriptionHtml:
      "<p><strong>CDI&nbsp; Group</strong> also operates &nbsp;a portfolio of ports and tank services specializing in&nbsp; refined chemical and petroleum products.&nbsp; <strong>CDI Group</strong> subsidiary which operate in this sector are <strong>PT Redeco Petrolin Utama (RPU)</strong>. CDI Group serves reputable multinational clients with potential growth from key global traders such as Aramco, Glencore, Shell and other players.</p>",
    tags: ["PT Redeco Petrolin Utama"],
  },
  {
    title: "Logistic",
    imageUrl:
      "https://chandradaya-investasi.com/file-storage/NWF5V2VrTVNQZGliRjFmZ21NbjJNVVhUdVY4UW1kdU91ZlZmaVI4UFhaTHpqRytsTlVqOExEczArNUx5ckYrSERpK0JNVy9jTitvZU16RDJaSjNCREE9PQ.webp",
    descriptionHtml:
      '<p class="ql-align-justify"><strong>CDI Group</strong> is advancing in the shipping and warehousing sector, delivering both marine and land logistics services. The Company focus on meeting the needs of Chandra Asri Group while planning to expand our services to potential external clients in the future. Our logistics operations include <strong>PT Chandra Shipping International (CSI), PT Marina Indah Maritim (MIM), and PT Chandra Cold Chain (CCC)</strong>.</p>',
    tags: ["Marine Logistics", "Inland Logistics"],
  },
];

interface BusinessProps {
  overview: BusinessSection;
}

export function Business({ overview }: BusinessProps) {
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
          />
        ))}
      </div>

      {overview.content && (
        <div className="bg-[#091A24] text-white pt-10 pb-20">
          <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
            <div
              className="content !text-neutral-4 text-base mx-auto"
              dangerouslySetInnerHTML={{ __html: overview.content }}
            />
          </div>
        </div>
      )}
    </section>
  );
}