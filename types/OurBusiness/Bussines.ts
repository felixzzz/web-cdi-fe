export interface BussinesPageProps {
  params: {
    locale: "en" | "id";
  };
}

export interface BusinessSection {
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

export interface OurBusinessApiResponse {
  our_business_banner: BusinessSection;
  our_business_overview: BusinessSection;
}

export interface BusinessTab {
  id: number;
  ulid: string;
  our_business_id: number;
  title_en: string;
  title_id: string;
  sub_title_en: string | null;
  sub_title_id: string | null;
  description_en: string | null;
  description_id: string | null;
  image: string;
  sort: number;
  created_at: string;
  updated_at: string;
  title: string;
}

export interface BusinessItem {
  id: number;
  ulid: string;
  type: string;
  title_en: string;
  title_id: string;
  description_en: string;
  description_id: string;
  image: string;
  banner_title_en: string;
  banner_title_id: string;
  banner_description_en: string | null;
  banner_description_id: string | null;
  banner_image: string;
  overview_title_en: string;
  overview_title_id: string;
  overview_description_en: string;
  overview_description_id: string;
  overview_image: string;
  heading_tab_title_en: string | null;
  heading_tab_title_id: string | null;
  link_url: string;
  link_title_en: string;
  link_title_id: string;
  created_at: string;
  updated_at: string;
  tabs: BusinessTab[];
  route: string;
  title: string;
  description: string;
}