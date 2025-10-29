export interface AwardSection {
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
}

export interface AboutUsAwardApiResponse {
  about_us_award_banner: AwardSection;
  about_us_award_overview: AwardSection;
}