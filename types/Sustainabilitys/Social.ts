export interface SocialPageProps {
  params: {
    locale: "en" | "id";
  };
}

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

interface FileInformation {
  path: string;
  size: string;
  title: string | null;
  format: string;
}

interface ContentJsonItem {
  title: string;
  description: string;
}

export interface ApiDataItem {
  id: number;
  ulid: string;
  category: string;
  name: string;
  type: string; 
  grid_type: string;
  title_en: string;
  title_id: string;
  content_en: string;
  content_id: string;
  content_json_en: ContentJsonItem[];
  content_json_id: ContentJsonItem[];
  align: string;
  image: string;
  file_information_en: FileInformation | null;
  file_information_id: FileInformation | null;
  background: string;
  grid_direction: string;
  grid_pattern: string;
  sort: number;
  created_at: string; 
  updated_at: string; 
  is_show: number;
  title: string;
  content: string;
  content_json: ContentJsonItem[];
  file_information: FileInformation | null;
}

export type ApiContentResponse = ApiDataItem[];