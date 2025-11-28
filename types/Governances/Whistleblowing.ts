export interface Category {
  id: number;
  name: string;
}

export type CategoryResponse = Category[];

export interface GovernanceSection {
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

export interface InvestorGovernanceApiResponse {
  governance_whistleblowing: GovernanceSection;
  governance_whistleblowing_id: GovernanceSection;
  governance_whistleblowing_detail: GovernanceSection;
}
