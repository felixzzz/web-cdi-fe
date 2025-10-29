export interface SustainabilitySection {
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

export interface InvestorSustainabilityApiResponse {
  sustainability_overview_banner: SustainabilitySection;
  sustainability_overview_content: SustainabilitySection;
  sustainability_overview_policy_framework: SustainabilitySection;
  sustainability_overview_policy_framework_show: SustainabilitySection;
  sustainability_overview_policy_framework_file: SustainabilitySection;
  sustainability_overview_rating: SustainabilitySection;
  sustainability_overview_rating_show: SustainabilitySection;
}
