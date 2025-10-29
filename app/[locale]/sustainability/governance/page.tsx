import { AntiCorruption } from "@/components/features/Sustainability/Governance/AntiCorruption";
import { BusinessEthics } from "@/components/features/Sustainability/Governance/BusinessEthics";
import { CyberSecurity } from "@/components/features/Sustainability/Governance/CyberSecurity";
import { GovernancePerformance } from "@/components/features/Sustainability/Governance/GovernancePerformance";
import { GrievanceMechanism } from "@/components/features/Sustainability/Governance/GrievanceMechanism";
import { Hero } from "@/components/features/Sustainability/Governance/Hero";
import { SecuritySlider } from "@/components/features/Sustainability/Governance/SecuritySlider";
import { SustainableProcurement } from "@/components/features/Sustainability/Governance/SustainableProcurement";
import { governanceService } from "@/services/Sustainability/GovernanceServices";

export default async function Page() {
  const governanceData = await governanceService.getGovernancePageData();

  const {
    sustainability_governance_banner,
    sustainability_governance_overview,
  } = governanceData;

  console.log('sustainability_governance_banner.file_url')
  console.log(sustainability_governance_banner.file_url)

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
        <BusinessEthics data={sustainability_governance_overview} />
        <AntiCorruption />
        <GrievanceMechanism />
        <SustainableProcurement />
        <CyberSecurity />
        <SecuritySlider />
        <GovernancePerformance />
      </div>
    </>
  );
}
