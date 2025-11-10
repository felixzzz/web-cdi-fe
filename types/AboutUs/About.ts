export interface AboutPageProps {
  params: {
    locale: "en" | "id";
  };
}

export interface AboutUsSection {
  id: number;
  ulid: string;
  key: string;
  type: string;
  title_en: string | null;
  title_id: string | null;
  content_en: string | null;
  content_id: string | null;
  file: string | null;
  created_at: string;
  updated_at: string;
  content_table: unknown | null;
  file_url: string;
  title: string | null;
  content: string | null;
  content_table_trans: unknown | null;
}

export interface AboutUsWhoWeAreApiResponse {
  about_us_banner: AboutUsSection;
  about_us_company_overview_tagline: AboutUsSection;
  about_us_company_overview: AboutUsSection;
  about_us_company_overview_background: AboutUsSection;
  about_us_vision_mission_tagline: AboutUsSection;
  about_us_vision: AboutUsSection;
  about_us_mission: AboutUsSection;
  about_us_milestone: AboutUsSection;
  about_us_company_profile: AboutUsSection;
  about_us_youtube: AboutUsSection;
}


interface HistoryItem {
  id: number;
  ulid: string;
  image: string;
  tagline_en: string;
  tagline_id: string;
  title_en: string;
  title_id: string;
  content_en: string;
  content_id: string;
  created_at: string;
  updated_at: string;
  sort: number;
  title: string;
  tagline: string;
  content: string;
}

export type HistoryApiResponse = HistoryItem[];

interface MilestoneItem {
  id: number;
  ulid: string;
  year: string;
  content_en: string;
  content_id: string;
  created_at: string;
  updated_at: string;
  content: string;
}

export type MilestoneApiResponse = MilestoneItem[];

interface FileDetails {
  path: string;
  size: string;
  format: string;
}

interface CompanyProfileItem {
  id: number;
  ulid: string;
  unique_key: string;
  type: string;
  name_en: string;
  name_id: string;
  file_en: FileDetails;
  file_id: FileDetails;
  created_at: string;
  updated_at: string;
  sort: number;
  show_on_governance: number;
  file: FileDetails;
  name: string;
}

export type CompanyProfileResponse = CompanyProfileItem[];