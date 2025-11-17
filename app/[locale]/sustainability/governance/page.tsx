import { AntiCorruption } from "@/components/features/Sustainability/Governance/AntiCorruption";
import { BusinessEthics } from "@/components/features/Sustainability/Governance/BusinessEthics";
import { CyberSecurity } from "@/components/features/Sustainability/Governance/CyberSecurity";
import { GovernancePerformance } from "@/components/features/Sustainability/Governance/GovernancePerformance";
import { GrievanceMechanism } from "@/components/features/Sustainability/Governance/GrievanceMechanism";
import { Hero } from "@/components/features/Sustainability/Governance/Hero";
import { Ciso } from "@/components/features/Sustainability/Governance/SecuritySlider";
import { SustainableProcurement } from "@/components/features/Sustainability/Governance/SustainableProcurement";
import { governanceService } from "@/services/Sustainability/GovernanceServices";
import { GovernancePageProps } from "@/types/Sustainabilitys/Governance";
import { Metadata } from "next";


const description = "PT Chandra Daya Investasi Tbk (CDI Group) merupakan bagian dari investasi infrastruktur Chandra Asri Group, penyedia bahan kimia energi dan solusi infrastruktur terkemuka di Asia Tenggara dan ECGO, perusahaan induk yang berfokus pada investasi bisnis ketenagalistrikan di Thailand. Beragam operasi CDI Group mencakup termasuk penyediaan dan pengolahan air, energi, kepelabuhanan & penyimpanan, dan logistik.";

const baseUrl = "https://chandradaya-investasi.com";

export const metadata: Metadata = {
  title: "Sustainability Governance | Chandra Daya Investasi", 
  description: description,
  keywords: ['Chandra Daya Investasi', 'CDI', 'CDIA', 'PT Chandra Daya Investasi Tbk', 'CDI Group'],
  
  metadataBase: new URL(baseUrl),

  viewport: {
    width: 'device-width',
    initialScale: 1.0,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/sustainability/governance', 
  },
  icons: {
    shortcut: '/assets/frontend/favicon.png',
  },

  openGraph: {
    title: "Chandra Daya Investasi", 
    description: description,
    url: '/sustainability/governance',
    type: 'website',
    siteName: 'Chandra Daya Investasi',
  },

  twitter: {
    card: 'summary_large_image',
    title: "Chandra Daya Investasi",
    description: description,
  },

  other: {
    'application-url': 'https://chandradaya-investasi.com',
    'preview-url': 'https://chandradaya-investasi.com/file-storage',
    'download-file': 'https://chandradaya-investasi.com/file-download',
    'add-file-preview': 'https://chandradaya-investasi.com/file/preview',
    'add-file-download': 'https://chandradaya-investasi.com/file/download',
  }
};

export default async function Page({params: {locale}}: GovernancePageProps) {
  const [governanceData, contentData] = await Promise.all([
    governanceService.getGovernancePageData(locale),
    governanceService.getGovernanceContentData(locale),
  ]);

  const { sustainability_governance_banner } = governanceData;

  const businessEthicsData = contentData.find(
    (item) => item.name === "Business Ethics"
  );
  const antiCorruptionData = contentData.find(
    (item) => item.name === "Anti-Corruption and Anti-Bribery"
  );
  const grievanceData = contentData.find(
    (item) => item.name === "Grievance Mechanism"
  );
  const procurementData = contentData.find(
    (item) => item.name === "Sustainable Procurement"
  );
  const cyberSecurityData = contentData.find(
    (item) => item.name === "Cyber Security"
  );
  const cisoData = contentData.find(
    (item) =>
      item.name === "Three fundamental components of information security management"
  );
  const governancePerfData = contentData.find(
    (item) => item.name === "Governance Performance"
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
          subtitle={sustainability_governance_banner.content || ""}
          iconSrc="https://chandradaya-investasi.com/assets/frontend/icons/ic_hero_circle_arrow_down.svg"
        />
        <BusinessEthics data={businessEthicsData!} />
        <AntiCorruption data={antiCorruptionData!} />
        <GrievanceMechanism data={grievanceData!} />
        <SustainableProcurement data={procurementData!} />
        <CyberSecurity data={cyberSecurityData!} />
        <Ciso data={cisoData!} />
        {/* <SecuritySlider /> */}
        <GovernancePerformance data={governancePerfData!} />
      </div>
    </>
  );
}
