export interface GovernanceParams {
  page?: string;
}

export interface GovernanceLink {
  url: string | null;
  label: string;
  active: boolean;
  page: number | null;
  params: GovernanceParams | null;
}

export interface GovernanceMeta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  range: string;
}

export interface FileDetail {
  path: string;
  size: string;
  format: string;
}

export interface GovernanceItem {
  id: number;
  ulid: string;
  unique_key: string;
  type: string;
  name_en: string;
  name_id: string;
  file_en: FileDetail;
  file_id: FileDetail;
  created_at: string;
  updated_at: string;
  sort: number;
  show_on_governance: number;
  name: string;
  file: FileDetail;
  date: string;
}

export interface GovernanceResponse {
  links: GovernanceLink[];
  meta: GovernanceMeta;
  items: GovernanceItem[];
}


export interface FileDetail {
  path: string;
  size: string;
  format: string;
}

export interface DownloadItem {
  id: number;
  ulid: string;
  unique_key: string;
  type: string;
  name_en: string;
  name_id: string;
  file_en: FileDetail;
  file_id: FileDetail;
  created_at: string;
  updated_at: string;
  sort: number;
  show_on_governance: number;
  name: string;
  date: string;
}

export interface Meta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  range: string;
}

export interface LinkItem {
  url: string | null;
  label: string;
  active: boolean;
  page: number | null;
}

export interface DownloadApiResponse {
  links: LinkItem[];
  meta: Meta;
  items: DownloadItem[];
}
