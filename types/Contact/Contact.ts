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

export type OtherCompanyAddressesApiResponse = CompanyContact[];