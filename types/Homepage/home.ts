export interface HomePageProps {
  params: {
    locale: "en" | "id";
  };
}

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

export interface ReportFile {
  path: string;
  size: string;
  format: string;
}

export interface ApiReportItem {
  id: number;
  ulid: string;
  type: string;
  name_en: string;
  name_id: string;
  file_en: ReportFile;
  file_id: ReportFile;
  created_at: string;
  updated_at: string;
  datetime: string;
  file: ReportFile;
  name: string;
  name_slug: string;
  name_slug_id: string;
  name_slug_en: string;
  date: string;
}

export type ReportApiResponse = ApiReportItem[];

export interface ApiQuickLink {
  id: number;
  ulid: string;
  category: number;
  name_en: string;
  name_id: string;
  url: string;
  sort: number;
  created_at: string;
  updated_at: string;
  name: string;
}

export type QuickLinksApiResponse = ApiQuickLink[];

export interface ArticleCategory {
  id: number;
  ulid: string;
  name_en: string;
  name_id: string;
  is_sustainability: number;
  created_at: string;
  updated_at: string;
}

export interface ApiArticle {
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

export type ApiArticleResponse = ApiArticle[];