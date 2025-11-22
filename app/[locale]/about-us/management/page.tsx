import { CorporateStructure } from "@/components/features/AboutUs/management/CorporateStructure";
import { Downloads } from "@/components/features/AboutUs/management/Dawnload";
import { Hero } from "@/components/features/AboutUs/management/Hero";
import { OrganizationStructure } from "@/components/features/AboutUs/management/OrganizationStructure";
import { People } from "@/components/features/AboutUs/management/People";
import { Stakeholder } from "@/components/features/AboutUs/management/Stakeholder";
import { SubNavbar } from "@/components/features/AboutUs/management/SubNavbar";
import { TeamMember } from "@/components/features/AboutUs/management/TeamMemberCard";
import { Information } from "@/components/features/homepage/Information";
import { managementService } from "@/services/AboutUs/ManagementService";
import {
  DownloadItem,
  ManagementPageProps,
  TableManagementSection,
} from "@/types/AboutUs/Management";
import { informationService } from "@/services/Global/informationService";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";

const description =
  "PT Chandra Daya Investasi Tbk (CDI Group) merupakan bagian dari investasi infrastruktur Chandra Asri Group, penyedia bahan kimia energi dan solusi infrastruktur terkemuka di Asia Tenggara dan ECGO, perusahaan induk yang berfokus pada investasi bisnis ketenagalistrikan di Thailand. Beragam operasi CDI Group mencakup termasuk penyediaan dan pengolahan air, energi, kepelabuhanan & penyimpanan, dan logistik.";

const baseUrl = "https://cdi-be.cmlabs.dev";

export const metadata: Metadata = {
  title: "Management and Organization Structure | Chandra Daya Investasi",
  description: description,
  keywords: [
    "Chandra Daya Investasi",
    "CDI",
    "CDIA",
    "PT Chandra Daya Investasi Tbk",
    "CDI Group",
  ],

  metadataBase: new URL(baseUrl),

  viewport: {
    width: "device-width",
    initialScale: 1.0,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/contact-us",
  },
  icons: {
    shortcut: "/assets/frontend/favicon.png",
  },

  openGraph: {
    title: "Chandra Daya Investasi",
    description: description,
    url: "/contact-us",
    type: "website",
    siteName: "Chandra Daya Investasi",
  },

  twitter: {
    card: "summary_large_image",
    title: "Chandra Daya Investasi",
    description: description,
  },

  other: {
    "application-url": "https://cdi-be.cmlabs.dev",
    "preview-url": "https://cdi-be.cmlabs.dev/file-storage",
    "download-file": "https://cdi-be.cmlabs.dev/file-download",
    "add-file-preview": "https://cdi-be.cmlabs.dev/file/preview",
    "add-file-download": "https://cdi-be.cmlabs.dev/file/download",
  },
};

export default async function Page({
  params: { locale },
}: ManagementPageProps) {
  const t = await getTranslations("Management");

  const [managementData, quickLinksData, BodData, BocData, GuideData] =
    await Promise.all([
      managementService.getManagementPageData(locale),
      informationService.getHomeQuickLinks(locale),
      managementService.getManagementBodData(locale),
      managementService.getManagementBocData(locale),
      managementService.getManagementGuideData(locale),
    ]);
  const {
    about_us_management_banner,
    about_us_management_overview,
    about_us_organization_structure,
    about_us_corporate_structure,
    about_us_corporate_structure_table,
    about_us_corporate_structure_table_show,
    about_us_guideline,
  } = managementData;

  const tableData =
    about_us_corporate_structure_table as TableManagementSection;

  const IMAGE_BASE_URL = "https://cdi-be.cmlabs.dev/file-storage/";
  const FILE_PREVIEW_BASE_URL = "https://cdi-be.cmlabs.dev/file/preview/";
  const FILE_DOWNLOAD_BASE_URL = "https://cdi-be.cmlabs.dev/file/download/";

  const transformedBodData: TeamMember[] = BodData.map((member) => ({
    name: member.name,
    role: member.position,
    imageUrl: `${IMAGE_BASE_URL}${member.image}`,
    href: `/about-us/management/team/${member.ulid}`,
  }));

  const transformedBocData: TeamMember[] = BocData.map((member) => ({
    name: member.name,
    role: member.position,
    imageUrl: `${IMAGE_BASE_URL}${member.image}`,
    href: `/about-us/management/team/${member.ulid}`,
  }));

  const guidelineItems: DownloadItem[] = GuideData.map((guide) => ({
    title: guide.name,
    size: guide.file?.size || "N/A",
    viewUrl: `${FILE_PREVIEW_BASE_URL}${guide.file?.path || ""}`,
    downloadUrl: `${FILE_DOWNLOAD_BASE_URL}${guide.file?.path || ""}`,
    format: guide.file?.format || "pdf",
  }));

  const SECTION_IDS = {
    BOARD_DIR: "board-of-directors",
    BOARD_COM: "board-of-commissioners",
    ORG_STRUCT: "organization-structure",
    CORP_STRUCT: "corporate-structure",
    GUIDELINES: "guidelines-of-work",
  };

  const aboutLinks = [
    { text: t("Board_of_Directors"), targetId: SECTION_IDS.BOARD_DIR },
    { text: t("Board_of_Commissioners"), targetId: SECTION_IDS.BOARD_COM },
    { text: t("Organization_Structure"), targetId: SECTION_IDS.ORG_STRUCT },
    { text: t("Corporate_Structure"), targetId: SECTION_IDS.CORP_STRUCT },
    { text: t("Guidelines_of_Work"), targetId: SECTION_IDS.GUIDELINES },
  ];

  return (
    <main>
      <NavbarThemeTrigger theme="dark" />
      <Hero
        imageSrc={about_us_management_banner.file_url}
        title={
          about_us_management_banner.title || "About Chandra Daya Investasi"
        }
        subtitle={about_us_management_banner.content}
        iconSrc="https://cdi-be.cmlabs.dev/assets/frontend/icons/ic_hero_circle_arrow_down.svg"
      />
      <SubNavbar links={aboutLinks} />
      <People
        title={
          about_us_management_overview.title || "The People Behind Our Success"
        }
      >
        <div
          className="prose prose-invert prose-base text-neutral-300"
          // className="text-[12px] leading-[24px] font-normal text-white py-1"
          dangerouslySetInnerHTML={{
            __html: about_us_management_overview.content || "",
          }}
        />
      </People>
      <Stakeholder
        backgroundImageUrl="https://cdi-be.cmlabs.dev/assets/frontend/images/about/world_map.webp"
        directors={transformedBodData}
        commissioners={transformedBocData}
      />
      <OrganizationStructure
        chartImageUrl={about_us_organization_structure.file_url}
        chartImageAlt="Organization Structure Chart"
      />
      <CorporateStructure
        chartImageUrl={about_us_corporate_structure.file_url}
        chartImageAlt={"Corporate Structure Chart"}
        tableTitle={tableData.title}
        tableData={tableData.content_table_trans}
        showTable={about_us_corporate_structure_table_show.content === "show"}
      />
      <Downloads
        id="guidelines-of-work"
        title={about_us_guideline.title || t("download_title")}
        subtitle={about_us_guideline.content || t("download_subtitle")}
        items={guidelineItems}
      />
      <Information
        eyebrow={t("eye_information")}
        title={t("title_information")}
        backgroundImageUrl="https://cdi-be.cmlabs.dev/assets/frontend/images/homepage/quick_links.webp"
        links={quickLinksData}
      />
    </main>
  );
}
