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
