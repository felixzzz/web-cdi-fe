export interface EnergyPageProps {
  params: {
    locale: "en" | "id";
  };
}

export interface TabContent {
  id: number;
  ulid: string;
  name: string;
  our_business_id: number;
  our_business_tab_id: number;
  heading_en: string | null;
  heading_id: string | null;
  heading_position: string; 
  tagline_en: string | null;
  tagline_id: string | null;
  title_en: string | null;
  title_id: string | null;
  description_en: string | null; 
  description_id: string | null; 
  align: string;
  image: string; 
  sort: number;
  created_at: string;
  updated_at: string;
  heading: string | null;
  tagline: string | null;
  title: string | null;
  description: string | null; 
}

export interface EnergyTab {
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
  sub_title: string | null;
  description: string | null; 
  contents: TabContent[];
}

export interface EnergyApiResponse {
  id: number;
  ulid: string;
  type: string; // "energy"
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
  heading_tab_title_en: string;
  heading_tab_title_id: string;
  link_url: string; 
  link_title_en: string;
  link_title_id: string;
  created_at: string;
  updated_at: string;
  tabs: EnergyTab[];
  title: string;
  description: string; 
  heading_tab_title: string;
  banner_title: string;
  banner_description: string | null;
  overview_title: string;
  overview_description: string; 
  json_ld?: string;
}