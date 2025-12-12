export interface LocationDetails {
  location_name_en: string | null;
  location_name_id: string | null;
  address_en: string;
  address_id: string;
  phone: string;
  fax: string;
}

export interface LocalizedMain extends LocationDetails {
  location_name: string | null;
  address: string;
}

export interface LocalizedBranch {
  phone: string;
  fax: string;
  location_name: string;
  address: string;
}

export interface CompanyLocationResponse {
  id: number;
  ulid: string;
  name: string;
  sub_title_en: string;
  sub_title_id: string;
  main: LocationDetails;
  branchs: LocationDetails[];
  is_main: number;
  created_at: string;
  updated_at: string;
  sub_title: string;
  localized_main: LocalizedMain;
  localized_branches: LocalizedBranch[];
}

