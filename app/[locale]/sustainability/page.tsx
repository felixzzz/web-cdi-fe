import { Hero } from "@/components/features/Sustainability/Hero";
import { Overview } from "@/components/features/Sustainability/Overview";
import { sustainabilityService } from "@/services/Sustainability/FinancialServices";
import { SustainabilityPageProps } from "@/types/Sustainabilitys/Sustainability";

export default async function Page({params: {locale}}: SustainabilityPageProps) {
  const sustainabilityData =
    await sustainabilityService.getSustainabilityPageData(locale);

const { 
    sustainability_overview_banner, 
    sustainability_overview_content 
  } = sustainabilityData;

  return (
    <>
      <div>
        <Hero
          imageSrc={sustainability_overview_banner.file_url}
          title={
            sustainability_overview_banner.title ||
            "Financial Information for Investors"
          }
          subtitle={sustainability_overview_banner.content}
          iconSrc="https://chandradaya-investasi.com/assets/frontend/icons/ic_hero_circle_arrow_down.svg"
        />
        <Overview data={sustainability_overview_content} />
      </div>
    </>
  );
}
