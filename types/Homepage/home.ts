export interface HomePageSection {
  id: number;
  ulid: string;
  key: string;
  type: string;
  title_en: string;
  title_id: string;
  content_en: string | null;
  content_id: string | null;
  file: string | null;
  created_at: string;
  updated_at: string;
  content_table: unknown | null;
  file_url: string;
  title: string;
  content: string | null;
  content_table_trans: unknown | null;
  video_url: string;
}

export interface HomePageApiResponse {
  home_banner: HomePageSection;
  home_banner_tagline: HomePageSection;
  home_about_section: HomePageSection;
  home_infrastructure_title: HomePageSection;
  home_infrastructure_energy: HomePageSection;
  home_infrastructure_water: HomePageSection;
  home_infrastructure_port_storage: HomePageSection;
  home_infrastructure_logistic: HomePageSection;
  home_discover_title: HomePageSection;
  home_discover_sustainability: HomePageSection;
  home_discover_our_business: HomePageSection;
  home_discover_investor: HomePageSection;
  home_discover_career: HomePageSection;
  home_journey_tagline: HomePageSection;
  home_journey_content: HomePageSection;
  home_journey_info_1: HomePageSection;
  home_journey_info_2: HomePageSection;
  home_journey_info_3: HomePageSection;
}
