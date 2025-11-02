export interface SustainabilitySocialSection {
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
export interface ContentItem {
  id: number;
  title: string;
  content: string;
  image: string;
  align: string;
}
export interface SustainabilitySocialApiResponse {
  sustainability_social_banner: SustainabilitySocialSection;
  sustainability_social_overview: SustainabilitySocialSection;
}

export interface SustainabilitySocialTab {
  id: number;
  title: string;
  contents: ContentItem[];
}