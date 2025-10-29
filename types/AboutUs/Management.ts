interface BaseManagementSection {
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

export interface SimpleManagementSection extends BaseManagementSection {
  content_table: null;
  content_table_trans: null;
}

export interface ContentTableHeader {
  lang_en: string;
  lang_id: string;
}

export interface ContentTableDataCell {
  lang_en: string;
  lang_id: string;
  sub_lang_en: string;
  sub_lang_id: string;
  is_group?: boolean;
}

export interface ContentTable {
  headers: ContentTableHeader[];
  tableData: ContentTableDataCell[][];
}

export interface TransTableHeader {
  text: string;
}

export interface TransTableDataCell {
  text: string;
  sub_text: string;
  is_group: boolean;
  label: {
    text: string;
  };
}

export interface ContentTableTrans {
  headers: TransTableHeader[];
  tableData: TransTableDataCell[][];
}

export interface TableManagementSection extends BaseManagementSection {
  content_table: ContentTable;
  content_table_trans: ContentTableTrans;
}

export interface AboutUsManagementApiResponse {
  about_us_management_banner: SimpleManagementSection;
  about_us_management_overview: SimpleManagementSection;
  about_us_organization_structure: SimpleManagementSection;
  about_us_corporate_structure: SimpleManagementSection;
  about_us_corporate_structure_table: TableManagementSection;
  about_us_guideline: SimpleManagementSection;
  about_us_corporate_structure_table_show: SimpleManagementSection;
}