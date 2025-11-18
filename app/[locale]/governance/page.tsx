import { CodeOfConduct } from "@/components/features/Governance/CodeOfConduct";
import { Committee } from "@/components/features/Governance/Committee";
import { CommitteeTabData } from "@/components/features/Governance/CommitteeTabPanel";
import { CorporateSecretary } from "@/components/features/Governance/CorporateSecretary";
import { RiskManagement } from "@/components/features/Governance/DecorativeBackground";
import { Hero } from "@/components/features/Governance/Hero";
import { Information } from "@/components/features/Governance/Information";
import { InternalAudit } from "@/components/features/Governance/InternalAudit";
import { Policy } from "@/components/features/Governance/Policy";
import { SubNavbar } from "@/components/features/Governance/SubNavbar";
import { Whistleblowing } from "@/components/features/Governance/Whistleblowing";
import { informationService } from "@/services/Global/informationService";
import { governanceService } from "@/services/Governance/GovernanceService";
import { GovernancePageProps } from "@/types/Governances/Governance";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const aboutLinks = [
  { text: "Corporate Secretary", href: "/about-us" },
  { text: "Internal Audit Unit", href: "/about-us/vision-mission" },
  { text: "Committee", href: "/about-us/history" },
  { text: "Risk Management", href: "/about-us/milestone" },
  { text: "Code of Conduct", href: "/about-us/company-profile" },
  { text: "Policy", href: "/about-us/company-profile" },
  { text: "Whistleblowing", href: "/about-us/company-profile" },
];


const description = "PT Chandra Daya Investasi Tbk (CDI Group) merupakan bagian dari investasi infrastruktur Chandra Asri Group, penyedia bahan kimia energi dan solusi infrastruktur terkemuka di Asia Tenggara dan ECGO, perusahaan induk yang berfokus pada investasi bisnis ketenagalistrikan di Thailand. Beragam operasi CDI Group mencakup termasuk penyediaan dan pengolahan air, energi, kepelabuhanan & penyimpanan, dan logistik.";

const baseUrl = "https://chandradaya-investasi.com";

export const metadata: Metadata = {
  title: "Governance | Chandra Daya Investasi", 
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
    canonical: '/governance', 
  },
  icons: {
    shortcut: '/assets/frontend/favicon.png',
  },

  openGraph: {
    title: "Chandra Daya Investasi", 
    description: description,
    url: '/governance',
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

export default async function Page({
  params: { locale },
}: GovernancePageProps) {
  const t = await getTranslations('Investor.Governance')
  const [
    governanceData,
    corporateFiles,
    internalFiles,
    comiteFiles,
    productFiles,
    tabsData,
    quickLinksData,
  ] = await Promise.all([
    governanceService.getGovernancePageData(locale),
    governanceService.getCorporateFileData(locale),
    governanceService.getInternalFileData(locale),
    governanceService.getComiteFileData(locale),
    governanceService.getProductFileData(locale),
    governanceService.getGovernanceData(locale),
    informationService.getHomeQuickLinks(locale),
  ]);

  const {
    governance_banner,
    governance_corporate_secretary,
    governance_corporate_secretary_team,
    governance_internal_audit_unit,
    governance_risk_management,
    governance_code_of_conduct,
    governance_policy,
    governance_audit_committe,
    governance_whistleblowing,
  } = governanceData;

  const BASE_URL = "https://chandradaya-investasi.com";

  const auditCommitteeTab: CommitteeTabData = {
    id: governance_audit_committe.key,
    label: governance_audit_committe.title || "Audit Committee",
    title: governance_audit_committe.title || "Audit Committee",
    contentHtml: governance_audit_committe.content || "",
    files: comiteFiles.map((file) => ({
      id: file.id,
      title: file.name,
      fileSize: file.file.size,
      viewUrl: `${BASE_URL}/file/preview/default/${file.type}/${file.unique_key}/${file.name}`,
      downloadUrl: `${BASE_URL}/file/download/default/${file.type}/${file.unique_key}/`,
    })),
  };

  const otherTabs: CommitteeTabData[] = tabsData.map((tab) => ({
    id: tab.ulid,
    label: tab.tab_title,
    title: tab.title,
    contentHtml: tab.content,
    files: [
      {
        id: tab.id,
        title: tab.file_name,
        fileSize: tab.file.size,
        viewUrl: `${BASE_URL}/file/preview/default/committe/${tab.file_name}/`,
        downloadUrl: `${BASE_URL}/file/download/default/committe/${tab.file_name}/`,
      },
    ],
  }));

  const allTabs = [auditCommitteeTab, ...otherTabs];

  return (
    <>
      <div>
        <Hero
          imageSrc={governance_banner.file_url}
          title={governance_banner.title || "About Chandra Daya Investasi"}
          iconSrc="https://chandradaya-investasi.com/assets/frontend/icons/ic_hero_circle_arrow_down.svg"
        />
        <SubNavbar links={aboutLinks} />
        <CorporateSecretary
          sectionData={governance_corporate_secretary}
          personData={governance_corporate_secretary_team}
          filesData={corporateFiles}
        />
        <InternalAudit
          filesData={internalFiles}
          data={governance_internal_audit_unit}
        />
        <Committee tabs={allTabs} />
        <RiskManagement data={governance_risk_management} />
        <CodeOfConduct
          filesData={productFiles}
          data={governance_code_of_conduct}
        />
        <Policy data={governance_policy} />
        <Whistleblowing data={governance_whistleblowing} />
        <Information
          eyebrow={t('eye_information')}
          title={t('title_information')}
          backgroundImageUrl="https://chandradaya-investasi.com/assets/frontend/images/homepage/quick_links.webp"
          links={quickLinksData}
        />
      </div>
    </>
  );
}
