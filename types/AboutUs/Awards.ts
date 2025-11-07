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

interface PaginationLinkParams {
  page: string;
  tab?: string;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
  params: PaginationLinkParams | null;
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

export interface AwardItem {
  id: number;
  ulid: string;
  date: string;
  name_en: string;
  name_id: string;
  content_en: string;
  content_id: string;
  awarder_en: string;
  awarder_id: string;
  file: string;
  created_at: string;
  updated_at: string;
  name: string;
  content: string;
  awarder: string;
  image: string;
  year: string;
}

export interface AwardsApiResponse {
  links: PaginationLink[];
  meta: PaginationMeta;
  items: AwardItem[];
}

interface Category {
  id: number;
  ulid: string;
  name_en: string;
  name_id: string;
  created_at: string;
  updated_at: string;
}

export interface CertificationItem {
  id: number;
  ulid: string;
  certificate_category_id: number;
  date: string;
  name_en: string;
  name_id: string;
  content_en: string;
  content_id: string;
  awarder_en: string;
  awarder_id: string;
  files: string[];
  created_at: string;
  updated_at: string;
  category_name: string;
  name: string;
  content: string;
  short_content: string;
  awarder: string;
  thumbnail: string;
  category: Category;
}

export interface CertificationApiResponse {
  links: PaginationLink[];
  meta: PaginationMeta;
  items: CertificationItem[];
}

export interface MembershipItem {
  id: number;
  ulid: string;
  certificate_category_id: number;
  date: string;
  name_en: string;
  name_id: string;
  content_en: string;
  content_id: string;
  awarder_en: string;
  awarder_id: string;
  files: string[];
  created_at: string;
  updated_at: string;
  category_name: string;
  name: string;
  content: string;
  short_content: string;
  awarder: string;
  thumbnail: string;
  category: Category;
}

export interface MembershipApiResponse {
  links: PaginationLink[];
  meta: PaginationMeta;
  items: MembershipItem[];
}