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

export async function generateMetadata({
  params: { locale },
}: ManagementPageProps): Promise<Metadata> {
  const aboutData = await managementService.getManagementPageData(locale);

  const { about_us_management_banner } = aboutData;

  const pagePath = "/about-us/management";

  const currentPath = locale === "en" ? pagePath : `/${locale}${pagePath}`;

  const title =
    "Management and Organization Structure | Chandra Daya Investasi";

  const description =
    "PT Chandra Daya Investasi Tbk (CDI Group) merupakan bagian dari investasi infrastruktur Chandra Asri Group, penyedia bahan kimia energi dan solusi infrastruktur terkemuka di Asia Tenggara dan ECGO, perusahaan induk yang berfokus pada investasi bisnis ketenagalistrikan di Thailand. Beragam operasi CDI Group mencakup termasuk penyediaan dan pengolahan air, energi, kepelabuhanan & penyimpanan, dan logistik.";

  return {
    title: title,
    description: description,
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),

    keywords: [
      "Chandra Daya Investasi",
      "CDI",
      "CDIA",
      "PT Chandra Daya Investasi Tbk",
      "CDI Group",
      "Infrastructure Investment Indonesia",
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
      canonical: currentPath,
      languages: {
        "en-US": "/en/about-us/management",
        "id-ID": "/id/about-us/management",
      },
    },

    openGraph: {
      title: title,
      description: description,
      url: currentPath,
      siteName: "Chandra Daya Investasi",
      locale: locale,
      type: "website",
      images: [
        {
          url:
            about_us_management_banner?.file_url ||
            "/assets/frontend/favicon.png",
          width: 1200,
          height: 630,
          alt: about_us_management_banner?.title || "CDI Banner",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [
        about_us_management_banner?.file_url || "/assets/frontend/favicon.png",
      ],
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

  const transformedBodData: TeamMember[] = BodData.map((member) => ({
    name: member.name,
    role: member.position,
    imageUrl: `${process.env.NEXT_PUBLIC_URL}/file-storage/${member.image}`,
    href: `/about-us/management/team/${member.ulid}`,
  }));

  const transformedBocData: TeamMember[] = BocData.map((member) => ({
    name: member.name,
    role: member.position,
    imageUrl: `${process.env.NEXT_PUBLIC_URL}/file-storage/${member.image}`,
    href: `/about-us/management/team/${member.ulid}`,
  }));

  const guidelineItems: DownloadItem[] = GuideData.map((guide) => ({
    title: guide.name,
    size: guide.file?.size || "N/A",
    viewUrl: `${process.env.NEXT_PUBLIC_URL}/file/preview/default/${guide.type}/${guide.unique_key}`,
    downloadUrl: `${process.env.NEXT_PUBLIC_URL}/file/download/default/${guide.type}/${guide.unique_key}`,
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
        iconSrc="/assets/icons/ic_hero_circle_arrow_down.svg"
      />
      <SubNavbar links={aboutLinks} />
      <People
        title={
          about_us_management_overview.title || "The People Behind Our Success"
        }
      >
        <div
          className="prose prose-invert prose-base text-neutral-200 text-sm md:text-base leading-relaxed md:leading-loose text-justify"
          // className="text-[12px] leading-[24px] font-normal text-white py-1"
          dangerouslySetInnerHTML={{
            __html: about_us_management_overview.content || "",
          }}
        />
      </People>
      <Stakeholder
        backgroundImageUrl={`${process.env.NEXT_PUBLIC_URL}/assets/frontend/images/about/world_map.webp`}
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
        backgroundImageUrl={`${process.env.NEXT_PUBLIC_URL}/assets/frontend/images/homepage/quick_links.webp`}
        links={quickLinksData}
      />
    </main>
  );
}
