import { CorporateStructure } from "@/components/features/AboutUs/management/CorporateStructure";
import { Downloads } from "@/components/features/AboutUs/management/Dawnload";
import { Hero } from "@/components/features/AboutUs/management/Hero";
import { OrganizationStructure } from "@/components/features/AboutUs/management/OrganizationStructure";
import { People } from "@/components/features/AboutUs/management/People";
import { Stakeholder } from "@/components/features/AboutUs/management/Stakeholder";
import { SubNavbar } from "@/components/features/AboutUs/management/SubNavbar";
import { TeamMember } from "@/components/features/AboutUs/management/TeamMemberCard";
import { managementService } from "@/services/AboutUs/ManagementService";
import { TableManagementSection } from "@/types/AboutUs/Management";

const aboutLinks = [
  { text: "Company Overview", href: "/about-us" },
  { text: "Vision & Mission", href: "/about-us/vision-mission" },
  { text: "Our History", href: "/about-us/history" },
  { text: "Milestone", href: "/about-us/milestone" },
  { text: "Company Profile", href: "/about-us/company-profile" },
];

const directorsData: TeamMember[] = [
  {
    name: "Fransiskus Ruly Aryawan",
    role: "President Director",
    imageUrl:
      "https://chandradaya-investasi.com/file-storage/Z2MvK2ZtalhtNklaVkJZZGNxMEtQaVF1eUc0V2ZoTnNFcG9jYWIwZ2h2ZDBLQ2c3WWEvZ2hQVHJYenp4VEhWR1hsYnJBVUg5aXlKZEJWbC9BWmc3emc9PQ.webp",
    href: "/about-us/management/team/01jq8vg1w70e49n2b2xrx4fxmz",
  },
  {
    name: "Jonathan Kandinata",
    role: "Director",
    imageUrl:
      "https://chandradaya-investasi.com/file-storage/dEQ1dXNXcXZ4YzNaaDQyUTBRaEcyRzFzMnJRNEhsM1dGSUpIZ25vODI3MkhSWW9WeVAvWVo4dDNhc1YwRUYvR0VlTExQSWNFTDNCQXNMVDV0dnBiYnc9PQ.webp",
    href: "/about-us/management/team/01jq8vg1wmaywxk4hmsmtmmhvx",
  },
];

const commissionersData: TeamMember[] = [
  {
    name: "Erry Riyana Hardjapamekas",
    role: "President Commissioner",
    imageUrl:
      "https://chandradaya-investasi.com/file-storage/N3dzb2k2Y3NKR01lZm5MaHgyWVVoTUxDNS81bzcyME9oREtIb1FBL0M0VStaNkhkMGlxcGtyVUVwMVNYSlNtSDE4MkpEZDdaL2dQRDdBb3dCYzlYOFE9PQ.webp",
    href: "/about-us/management/team/01jq8vg1xcn4q5rwddt6m9tcgw",
  },
  {
    name: "Erwin Ciputra",
    role: "Commissioner",
    imageUrl:
      "https://chandradaya-investasi.com/file-storage/UTVSdzlTV2JpdWJjM2JMYnRzWU1mTzdvdnpOTk0zZGg4TGtjZ0hSQ2Nid1pCWFU2SjZkaW1KTk90YWF2T01JdGJ1L2RHcVlPeTdlYXlBT2ZKRDZTWWc9PQ.webp",
    href: "/about-us/management/team/01jq8vg1xxj48mrc0a40hk4s63",
  },
];

export default async function Page() {
  const managementData = await managementService.getManagementPageData();

  // console.log(managementData);

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
          directors={directorsData}
          commissioners={commissionersData}
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
          itemTitle="Company Profile CDI Group"
          itemSize="2.01 MB"
          itemViewUrl="https://chandradaya-investasi.com/file/preview/default/company_profile/Company_Profile_1018/"
          itemDownloadUrl="https://chandradaya-investasi.com/file/download/default/company_profile/Company_Profile_1018/"
        />
      </div>
    </>
  );
}
