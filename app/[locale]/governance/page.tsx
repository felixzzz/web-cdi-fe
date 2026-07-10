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
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { informationService } from "@/services/Global/informationService";
import { governanceService } from "@/services/Governance/GovernanceService";
import { GovernancePageProps } from "@/types/Governances/Governance";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

// ISR: revalidate every 1 hour — serves cached HTML for instant TTFB
export const revalidate = 3600;

export async function generateMetadata({
  params: { locale },
}: GovernancePageProps): Promise<Metadata> {
    const t = await getTranslations('metadata')
  const aboutData = await governanceService.getGovernancePageData(locale);
  const { governance_banner } = aboutData;

  const pagePath = "/governance";

const baseUrl = process.env.NEXT_PUBLIC_URL_LP || "http://localhost:3000";

  const getCanonicalPath = (lang: string) => {
    if (lang === 'id') return `${baseUrl}/${lang}${pagePath}`; 
    return `${baseUrl}/${lang}${pagePath}`;      
  };

  const currentUrl = getCanonicalPath(locale);

  const title = "Chandra Daya Investasi";

  return {
    title: title,
    description: t('description'),
    metadataBase: new URL(`${baseUrl}/${locale}`),

    keywords: [
      "Chandra Daya Investasi",
      "CDI",
      "CDIA",
      "PT Chandra Daya Investasi Tbk",
      "CDI Group",
    ],

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    alternates: {
      canonical: currentUrl,
      languages: {
        en: "/en/governance",
        id: "/id/governance",
        "x-default": "/en/governance",
      },
    },

    openGraph: {
      title: title,
      description: t('description'),
      url: currentUrl,
      siteName: "Chandra Daya Investasi",
      locale: locale,
      type: "website",
      images: [
        {
          url: governance_banner.file_url || "/assets/frontend/favicon.png",
          width: 1200,
          height: 630,
          alt: governance_banner.title || "CDI Banner",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: title,
      description: t('description'),
      images: [governance_banner.file_url || "/assets/frontend/favicon.png"],
    },

    other: {
      "application-url": `${process.env.NEXT_PUBLIC_BASE_URL}`,
      "preview-url": `${process.env.NEXT_PUBLIC_BASE_URL}/file-storage`,
      "download-file": `${process.env.NEXT_PUBLIC_BASE_URL}/file-download`,
      "add-file-preview": `${process.env.NEXT_PUBLIC_BASE_URL}/file/preview`,
      "add-file-download": `${process.env.NEXT_PUBLIC_BASE_URL}/file/download`,
    },
  };
}

export default async function Page({
  params: { locale },
}: GovernancePageProps) {
  const t = await getTranslations("Investor.Governance");
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
    governance_whistleblowing_id,
  } = governanceData;

  const auditCommitteeTab: CommitteeTabData = {
    id: governance_audit_committe.key,
    label: governance_audit_committe.title || "Audit Committee",
    title: governance_audit_committe.title || "Audit Committee",
    contentHtml: governance_audit_committe.content || "",
    files: comiteFiles.map((file) => ({
      id: file.id,
      title: file.name,
      fileSize: file.file.size,
      viewUrl: `${process.env.NEXT_PUBLIC_URL}/file/preview/${locale}/${file.type}/${file.unique_key}/${file.name}`,
      downloadUrl: `${process.env.NEXT_PUBLIC_URL}/file/download/${locale}/${file.type}/${file.unique_key}/`,
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
        viewUrl: `${process.env.NEXT_PUBLIC_URL}/file/preview/${locale}/committe/${tab.title}/`,
        downloadUrl: `${process.env.NEXT_PUBLIC_URL}/file/download/${locale}/committe/${tab.title}/`,
      },
    ],
  }));

  const SECTION_IDS = {
    CORP_SEC: "corporate-secretary",
    INTERNAL_AUDIT: "internal-audit",
    COMMITTEE: "committee",
    RISK_MGMT: "risk-management",
    CODE_CONDUCT: "code-of-conduct",
    POLICY: "policy",
    WHISTLEBLOWING: "whistleblowing",
  };

  const aboutLinks = [
    { text: t("Corporate_Secretary"), targetId: SECTION_IDS.CORP_SEC },
    { text: t("Internal_Audit_Unit"), targetId: SECTION_IDS.INTERNAL_AUDIT },
    { text: t("Committee"), targetId: SECTION_IDS.COMMITTEE },
    { text: t("Risk_Management"), targetId: SECTION_IDS.RISK_MGMT },
    { text: t("Code_of_Conduct"), targetId: SECTION_IDS.CODE_CONDUCT },
    { text: t("Policy"), targetId: SECTION_IDS.POLICY },
    { text: t("Whistleblowing"), targetId: SECTION_IDS.WHISTLEBLOWING },
  ];
  const allTabs = [auditCommitteeTab, ...otherTabs];

  return (
    <main>
      <NavbarThemeTrigger theme="dark" />
      <Hero
        imageSrc={governance_banner.file_url}
        title={governance_banner.title || "About Chandra Daya Investasi"}
        iconSrc="/assets/icons/ic_hero_circle_arrow_down.svg"
      />
      <SubNavbar links={aboutLinks} />
      <CorporateSecretary
        sectionData={governance_corporate_secretary}
        personData={governance_corporate_secretary_team}
        filesData={corporateFiles}
        locale={locale}
      />
      <InternalAudit
        filesData={internalFiles}
        data={governance_internal_audit_unit}
        locale={locale}
      />
      <Committee tabs={allTabs} />
      <RiskManagement data={governance_risk_management} />
      <CodeOfConduct
        filesData={productFiles}
        data={governance_code_of_conduct}
        locale={locale}
      />
      <Policy data={governance_policy} />
      <Whistleblowing data={governance_whistleblowing} image={governance_whistleblowing_id.file_url} locale={locale} />
      <Information
        eyebrow={t("eye_information")}
        title={t("title_information")}
        backgroundImageUrl={`${process.env.NEXT_PUBLIC_URL}/assets/frontend/images/homepage/quick_links.webp`}
        links={quickLinksData}
      />
    </main>
  );
}
