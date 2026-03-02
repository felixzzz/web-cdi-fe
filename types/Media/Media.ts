export interface NewsPageProps {
  params: {
    locale: "en" | "id";
  };
}

export interface HeroNewsSection {
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

export interface PaginationParams {
  page: string;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
  params: PaginationParams | null;
}

export interface PaginationMeta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  range: string;
}

export interface ArticleCategory {
  id: number;
  ulid: string;
  name_en: string;
  name_id: string;
  is_sustainability: number;
  created_at: string;
  updated_at: string;
  [key: `name_${string}`]: string;
}

export interface ArticleMetaTag {
  description: string | null;
  keyword: string | null;
}

export interface ArticleItem {
  id: number;
  ulid: string;
  thumbnail: string;
  article_category_id: number;
  category: string;
  slug: string;
  title_en: string;
  title_id: string;
  content_en: string; 
  content_id: string; 
  tags: string[];
  meta_tag: ArticleMetaTag;
  status: number;
  created_at: string;
  updated_at: string;
  datetime: string;
  category_name: string;
  [key: `title_${string}`]: string;
  image: string;
  date: string;
  article_category: ArticleCategory;
}

export interface IReportType {
  id: number;
  ulid: string;
  name_en: string;
  name_id: string;
  is_sustainability: number;
  created_at: string;
  updated_at: string;
  name: string;
  [key: `name_${string}`]: string;
}

export interface NewsApiResponse {
  links: PaginationLink[];
  meta: PaginationMeta;
  items: ArticleItem[];
}

export interface FileDetails {
  path: string;
  size: string;
  format: string;
}

export interface PressReleaseItem {
  id: number;
  ulid: string;
  name_en: string;
  name_id: string;
  file_en: FileDetails;
  file_id: FileDetails;
  status: number;
  created_at: string;
  updated_at: string;
  datetime: string | null;
  name: string;
  name_slug: string;
  name_slug_id: string;
  name_slug_en: string;
  file: FileDetails;
  date: string;
  [key: `name_${string}`]: string;
}

export interface PressReleaseApiResponse {
  links: PaginationLink[];
  meta: PaginationMeta;
  items: PressReleaseItem[];
}

interface MetaTag {
  description: string | null;
  keyword: string | null;
}

interface ArticleData {
  id: number;
  ulid: string;
  thumbnail: string;
  article_category_id: number;
  category: string;
  slug: string;
  title_en: string;
  title_id: string;
  content_en: string;
  content_id: string;
  tags: string[];
  meta_tag: MetaTag;
  status: number;
  created_at: string; 
  updated_at: string; 
  datetime: string;
  category_name: string;
  title: string;
  short_content: string;
  image: string;
  date: string;
  route: string;
  article_category: ArticleCategory;
}

interface ApiResponseItem {
  title: string;
  data: ArticleData;
}

export type ApiLatestNewsResponse = ApiResponseItem[];