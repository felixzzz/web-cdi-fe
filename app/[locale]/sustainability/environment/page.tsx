import { EnergyEmission } from "@/components/features/Sustainability/Environment/EnergyEmission";
import { Hero } from "@/components/features/Sustainability/Environment/Hero";
import { EnvironmentalResponsibility } from "@/components/features/Sustainability/Environment/Overview";
import { SustainabilityFacts } from "@/components/features/Sustainability/Environment/SustainabilityFacts";
import { WasteManagement } from "@/components/features/Sustainability/Environment/WasteManagement";
import { environmentService } from "@/services/Sustainability/EnvironmentServices";

export default async function Page() {
  const environmentData = await environmentService.getEnviromentPageData();

  const {
    sustainability_environment_banner,
    sustainability_environment_overview,
  } = environmentData;

  return (
    <>
      <div>
        <Hero
          imageSrc={sustainability_environment_banner.file_url}
          title={
            sustainability_environment_banner.title ||
            "Financial Information for Investors"
          }
          subtitle={sustainability_environment_banner.content_en}
          iconSrc="https://chandradaya-investasi.com/assets/frontend/icons/ic_hero_circle_arrow_down.svg"
        />
        <EnvironmentalResponsibility data={sustainability_environment_overview} />
        <EnergyEmission />
        <SustainabilityFacts />
        <WasteManagement />
      </div>
    </>
  );
}
