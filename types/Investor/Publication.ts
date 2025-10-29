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

export interface InvestorPublicationApiResponse {
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
