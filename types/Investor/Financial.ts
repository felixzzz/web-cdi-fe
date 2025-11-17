export interface FinancialPageProps {
  params: {
    locale: "en" | "id";
  };
}

interface BaseInvestorSection {
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
  file_url: string;
  title: string | null;
  content: string | null;
}

export interface SimpleInvestorSection extends BaseInvestorSection {
  content_table: null;
  content_table_trans: null;
}

interface LangPair {
  lang_en: string;
  lang_id: string;
}

type ContentTableHeader = LangPair;

type ContentTableDataCell = LangPair & { is_group?: boolean };

interface ContentTableGroupLabel {
    label: LangPair;
    is_group: true;
}

type ContentTableRow = ContentTableDataCell[] | ContentTableGroupLabel;

interface ContentTable {
  headers: ContentTableHeader[] | null;
  tableData: ContentTableRow[] | null;
}

interface TransTableHeader {
  text: string;
}

interface TransTableDataCell {
  text: string | null;
  sub_text: string | null;
  is_group: boolean;
  label: {
    text: string;
  };
}

interface TransTableGroupLabel {
    label: TransTableDataCell;
    is_group: unknown; 
}

type TransTableRow = TransTableDataCell[] | TransTableGroupLabel;

interface ContentTableTrans {
  headers: TransTableHeader[] | null;
  tableData: TransTableRow[] | null;
}

export interface TableInvestorSection extends BaseInvestorSection {
  content_table: ContentTable | null;
  content_table_trans: ContentTableTrans | null;
}

export interface InvestorFinancialApiResponse {
  investor_report_banner: SimpleInvestorSection;
  investor_report_overview: SimpleInvestorSection;
  investor_report_table: TableInvestorSection;
  investor_financial_banner: SimpleInvestorSection;
  investor_share_banner: SimpleInvestorSection;
  investor_share_shareholders_table: TableInvestorSection;
  investor_share_dividend_table: TableInvestorSection;
  investor_share_bonds_table: TableInvestorSection;
  investor_publication_banner: SimpleInvestorSection;
  investor_share_tab_one: SimpleInvestorSection;
  investor_share_tab_two: SimpleInvestorSection;
  investor_share_shareholders_table_show: SimpleInvestorSection;
  investor_share_dividend_table_show: SimpleInvestorSection;
  investor_share_bonds_table_show: SimpleInvestorSection;
  investor_report_table_show: SimpleInvestorSection;
}

interface PaginationLinkParams {
  page: string;
  type?: string;
  year?: string;
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

export interface FileDetails {
  path: string;
  size: string;
  format: string;
}

export interface CalendarEventItem {
  id: number;
  ulid: string;
  type: string;
  name_en: string;
  name_id: string;
  file_en: FileDetails;
  file_id: FileDetails;
  created_at: string;
  updated_at: string;
  datetime: string;
  name: string;
  name_slug: string;
  name_slug_id: string;
  name_slug_en: string;
  file: FileDetails;
  date: string;
  year: number;
}

export interface CalendarYearGroup {
  year: number;
  items: CalendarEventItem[];
}

export interface CalendarApiResponse {
  links: PaginationLink[];
  meta: PaginationMeta;
  items: CalendarYearGroup[];
}