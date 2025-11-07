export interface SustainabilityEnvironmentSection {
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

export interface SustainabilityEnvironmentApiResponse {
  sustainability_environment_banner: SustainabilityEnvironmentSection;
  sustainability_environment_overview: SustainabilityEnvironmentSection;
}

interface ContentJsonItem {
  icon: string;
  title: string | null;
  description: string;
}

export interface ApiDataItem {
  id: number;
  ulid: string;
  category: string;
  name: string;
  type: "content" | "grid";
  grid_type: string;
  title_en: string | null;
  title_id: string | null;
  content_en: string | null;
  content_id: string | null;
  content_json_en: ContentJsonItem[];
  content_json_id: ContentJsonItem[];
  align: "right" | "left";
  image: string;
  file_information_en: unknown | null;
  file_information_id: unknown | null;
  background: string;
  grid_direction: string;
  grid_pattern: string;
  sort: number;
  created_at: string;
  updated_at: string;
  is_show: number;
  title: string | null;
  content: string | null;
  content_json: ContentJsonItem[];
  file_information: unknown | null;
}

export type ApiContentResponse = ApiDataItem[];