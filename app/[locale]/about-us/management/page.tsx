import { CorporateStructure } from "@/components/features/AboutUs/management/CorporateStructure";
import { DownloadItem, Downloads } from "@/components/features/AboutUs/management/Dawnload";
import { Hero } from "@/components/features/AboutUs/management/Hero";
import { OrganizationStructure } from "@/components/features/AboutUs/management/OrganizationStructure";
import { People } from "@/components/features/AboutUs/management/People";
import { Stakeholder } from "@/components/features/AboutUs/management/Stakeholder";
import { SubNavbar } from "@/components/features/AboutUs/management/SubNavbar";
import { TeamMember } from "@/components/features/AboutUs/management/TeamMemberCard";
import { Information } from "@/components/features/Homepage/Information";
import { managementService } from "@/services/AboutUs/ManagementService";
import { TableManagementSection } from "@/types/AboutUs/Management";
import { informationService } from "@/services/Global/informationService";

const aboutLinks = [
  { text: "Company Overview", href: "/about-us" },
  { text: "Vision & Mission", href: "/about-us/vision-mission" },
  { text: "Our History", href: "/about-us/history" },
  { text: "Milestone", href: "/about-us/milestone" },
  { text: "Company Profile", href: "/about-us/company-profile" },
];

export default async function Page() {
  const [managementData, quickLinksData, BodData, BocData, GuideData] = await Promise.all([
    managementService.getManagementPageData(),
    informationService.getHomeQuickLinks(),
    managementService.getManagementBodData(),
    managementService.getManagementBocData(),
    managementService.getManagementGuideData(),
  ]);

  const {
    about_us_management_banner,
    about_us_management_overview,
    about_us_organization_structure,
    about_us_corporate_structure,
    about_us_corporate_structure_table,
    about_us_corporate_structure_table_show,
  } = managementData;

  const tableData =
    about_us_corporate_structure_table as TableManagementSection;

  const IMAGE_BASE_URL = "https://chandradaya-investasi.com/file-storage/";
  const FILE_PREVIEW_BASE_URL =
    "https://chandradaya-investasi.com/file/preview/"; 
  const FILE_DOWNLOAD_BASE_URL =
    "https://chandradaya-investasi.com/file/download/";

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

  return (
    <>
      <div>
        <Hero
          imageSrc={about_us_management_banner.file_url}
          title={
            about_us_management_banner.title || "About Chandra Daya Investasi"
          }
          subtitle={about_us_management_banner.content}
          iconSrc="https://chandradaya-investasi.com/assets/frontend/icons/ic_hero_circle_arrow_down.svg"
        />
        <SubNavbar links={aboutLinks} />
        <People
          title={
            about_us_management_overview.title ||
            "The People Behind Our Success"
          }
        >
          <div
            className="text-[12px] leading-[24px] font-normal text-white py-1"
            dangerouslySetInnerHTML={{
              __html: about_us_management_overview.content || "",
            }}
          />
        </People>
        <Stakeholder
          backgroundImageUrl="https://chandradaya-investasi.com/assets/frontend/images/about/world_map.webp"
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
          id="company-profile"
          title="Curious to learn more about Chandra Daya Investasi?"
          subtitle="Gain deeper insights into our story, growth, and latest achievements by downloading our company profile"
          items={guidelineItems}
        />
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
