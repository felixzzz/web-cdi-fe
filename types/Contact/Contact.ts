export interface ContactPageProps {
  params: {
    locale: "en" | "id";
  };
}

export interface ContactAddress {
  location_name_en: string | null;
  location_name_id: string | null;
  address_en: string;
  address_id: string;
  phone: string | null;
  fax: string | null;
}

export interface LocalizedContactAddress extends ContactAddress {
  location_name: string | null;
  address: string;
}

export interface CompanyContact {
  id: number;
  ulid: string;
  name: string;
  sub_title_en: string | null;
  sub_title_id: string | null;
  main: ContactAddress;
  branchs: ContactAddress[];
  is_main: number;
  created_at: string;
  updated_at: string;
  sub_title: string | null;
  localized_main: LocalizedContactAddress;
  localized_branches: LocalizedContactAddress[];
}

export interface ContactSectionData {
  id: number;
  ulid: string;
  key: string;
  type: string;
  title_en: string;
  title_id: string;
  content_en: string;
  content_id: string;
  file: string;
  created_at: string;
  updated_at: string;
  content_table: unknown | null; 
  file_url: string;
  title: string;
  content: string;
  content_table_trans: unknown | null; 
}

export type OtherCompanyAddressesApiResponse = CompanyContact[];