import { AntiCorruption } from "@/components/features/Sustainability/Governance/AntiCorruption";
import { BusinessEthics } from "@/components/features/Sustainability/Governance/BusinessEthics";
import { CyberSecurity } from "@/components/features/Sustainability/Governance/CyberSecurity";
import { GovernancePerformance } from "@/components/features/Sustainability/Governance/GovernancePerformance";
import { GrievanceMechanism } from "@/components/features/Sustainability/Governance/GrievanceMechanism";
import { Hero } from "@/components/features/Sustainability/Governance/Hero";
import { Ciso } from "@/components/features/Sustainability/Governance/SecuritySlider";
// import { SecuritySlider } from "@/components/features/Sustainability/Governance/SecuritySlider";
import { SustainableProcurement } from "@/components/features/Sustainability/Governance/SustainableProcurement";
import { governanceService } from "@/services/Sustainability/GovernanceServices";

export default async function Page() {
  const [governanceData, contentData] = await Promise.all([
      governanceService.getGovernancePageData(),
      governanceService.getGovernanceContentData() 
    ]);

  const {
    sustainability_governance_banner,
  } = governanceData;

  const businessEthicsData = contentData.find(
    (item) => item.name === "Business Ethics"
  );

  return (
    <>
      <div>
        <Hero
          imageSrc={sustainability_governance_banner.file_url}
          title={
            sustainability_governance_banner.title ||
            "Financial Information for Investors"
          }
          iconSrc="https://chandradaya-investasi.com/assets/frontend/icons/ic_hero_circle_arrow_down.svg"
        />
        <BusinessEthics data={businessEthicsData} />
          <AntiCorruption />
        <GrievanceMechanism />
        <SustainableProcurement />
        <CyberSecurity />
        <Ciso title="Three fundamental components of information security management" />
        {/* <SecuritySlider /> */}
        <GovernancePerformance />
      </div>
    </>
  );
}
