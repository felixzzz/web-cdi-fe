import { Business } from "@/components/features/OurBusiness/Business";
import { Hero } from "@/components/features/OurBusiness/Hero";
import { businessService } from "@/services/OurBusiness/BussinesService";
import { BussinesPageProps } from "@/types/OurBusiness/Bussines";

const stripHtml = (html: string | null) =>
  html ? html.replace(/<[^>]+>/g, "") : "";

export default async function Page({ params: { locale } }: BussinesPageProps) {

  const [businessData, overviewData] = await Promise.all([
    businessService.getBusinessPageData(locale),
    businessService.getOverviewData(locale),
  ]);

  const { our_business_banner, our_business_overview } = businessData;

  return (
    <>
      <div>
        <Hero
          imageSrc={our_business_banner.file_url}
          title={our_business_banner.title || "About Chandra Daya Investasi"}
          subtitle={stripHtml(our_business_banner.content)}
          iconSrc="https://chandradaya-investasi.com/assets/frontend/icons/ic_hero_circle_arrow_down.svg"
        />
        <Business items={overviewData} overview={our_business_overview} />
      </div>
    </>
  );
}
