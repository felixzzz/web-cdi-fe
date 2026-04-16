export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
  page?: number | null;
  params?: {
    page?: string;
  } | null;
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

export interface ReportFile {
  path: string;
  size: string;
  format: string;
}

export interface SustainabilityReportItem {
  id: number;
  ulid: string;
  type: string;
  title_en: string;
  title_id: string;
  description_en: string;
  description_id: string;
  author: string;
  publisher: string;
  release_year: string;
  pages: number;
  format: string;
  image: string;
  file: ReportFile;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
}

export interface SustainabilityReportResponse {
  links: PaginationLink[];
  meta: PaginationMeta;
  items: SustainabilityReportItem[];
}