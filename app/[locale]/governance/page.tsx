import { CodeOfConduct } from "@/components/features/Governance/CodeOfConduct";
import { Committee } from "@/components/features/Governance/Committee";
import { CorporateSecretary } from "@/components/features/Governance/CorporateSecretary";
import { RiskManagement } from "@/components/features/Governance/DecorativeBackground";
import { Information, QuickLink } from "@/components/features/Governance/Information";
import { InternalAudit } from "@/components/features/Governance/InternalAudit";
import { Policy } from "@/components/features/Governance/Policy";
import { SubNavbar } from "@/components/features/Governance/SubNavbar";
import { Whistleblowing } from "@/components/features/Governance/Whistleblowing";
import { Hero } from "@/components/features/Sustainability/Governance/Hero";
import { governanceService } from "@/services/Governance/GovernanceService";

const aboutLinks = [
  { text: "Company Overview", href: "/about-us" },
  { text: "Vision & Mission", href: "/about-us/vision-mission" },
  { text: "Our History", href: "/about-us/history" },
  { text: "Milestone", href: "/about-us/milestone" },
  { text: "Company Profile", href: "/about-us/company-profile" },
];

const quickLinksData: QuickLink[] = [
  { href: '/about-us', text: 'Who We Are' },
  { href: '/about-us/management', text: 'Management & Structure' },
  { href: '/investor/financial-information', text: 'Financial Information' },
  { href: '/investor/report', text: 'Report' },
  { href: '/governance/policy', text: 'Code of Conduct' },
];

export default async function Page() {
    const governanceData = await governanceService.getGovernancePageData();

    const { governance_banner } = governanceData

  return (
    <>
      <div>
        <Hero
        imageSrc={governance_banner.file_url}
          title={
            governance_banner.title || "About Chandra Daya Investasi"
          }
          iconSrc="https://chandradaya-investasi.com/assets/frontend/icons/ic_hero_circle_arrow_down.svg"
        />
        <SubNavbar links={aboutLinks} />
        <CorporateSecretary />
        <InternalAudit />
        <Committee />
        <RiskManagement />
        <CodeOfConduct />
        <Policy />
        <Whistleblowing />
        <Information
          eyebrow="QUICK LINKS"
          title="Need to access detailed information?"
          backgroundImageUrl="https://chandradaya-investasi.com/assets/frontend/images/homepage/quick_links.webp"
          links={quickLinksData}
        />
      </div>
    </>
  );
}
