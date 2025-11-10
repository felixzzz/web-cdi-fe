import { EnergyEmission } from "@/components/features/Sustainability/Environment/EnergyEmission";
import { Hero } from "@/components/features/Sustainability/Environment/Hero";
import { EnvironmentalResponsibility } from "@/components/features/Sustainability/Environment/Overview";
import { SustainabilityFacts } from "@/components/features/Sustainability/Environment/SustainabilityFacts";
import { WasteManagement } from "@/components/features/Sustainability/Environment/WasteManagement";
import { environmentService } from "@/services/Sustainability/EnvironmentServices";
import { EnvironmentPageProps } from "@/types/Sustainabilitys/Environment";

export default async function Page({params: {locale}}: EnvironmentPageProps) {

  const [environmentData, contentEnviroment] = await Promise.all([
    environmentService.getEnviromentPageData(locale),
    environmentService.getEnviromentContentData(locale),
  ]);

  const {
    sustainability_environment_banner,
    sustainability_environment_overview,
  } = environmentData;

  const energyData = contentEnviroment.find(
    (item) => item.name === "Energy & Emission"
  );
  const factsData = contentEnviroment.find(
    (item) => item.grid_type === "icon_content_card"
  );
  const wasteData = contentEnviroment.find(
    (item) => item.name === "Waste Management"
  );

  return (
    <>
      <div>
        <Hero
          imageSrc={sustainability_environment_banner.file_url}
          title={
            sustainability_environment_banner.title ||
            "Financial Information for Investors"
          }
          subtitle={sustainability_environment_banner.content}
          iconSrc="https://chandradaya-investasi.com/assets/frontend/icons/ic_hero_circle_arrow_down.svg"
        />
        <EnvironmentalResponsibility data={sustainability_environment_overview} />
        <EnergyEmission data={energyData!} />
        <SustainabilityFacts data={factsData!} />
        <WasteManagement data={wasteData!} />
      </div>
    </>
  );
}
