import { Business } from "@/components/features/OurBusiness/Business";
import { Hero } from "@/components/features/OurBusiness/Hero";
import { businessService } from "@/services/OurBusiness/BussinesService";

export default async function Page() {
  const businessData = await businessService.getBusinessPageData();

  const { our_business_banner, our_business_overview } = businessData;

  return (
    <>
      <div>
        <Hero
          imageSrc={our_business_banner.file_url}
          title={our_business_banner.title || "About Chandra Daya Investasi"}
          subtitle={our_business_banner.content}
          iconSrc="https://chandradaya-investasi.com/assets/frontend/icons/ic_hero_circle_arrow_down.svg"
        />
        <Business overview={our_business_overview} />
      </div>
    </>
  );
}
