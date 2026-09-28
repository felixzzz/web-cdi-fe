interface UtilitySection {
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

export interface ApiCredentialResponse {
  contact_us_main: UtilitySection;
  terms_and_conditions: UtilitySection;
  media_main: UtilitySection;
  privacy_policy: UtilitySection;
  cookies_consent: UtilitySection;
  disclaimer: UtilitySection;
  social_youtube: UtilitySection;
  social_linkedin: UtilitySection;
  social_tiktok: UtilitySection;
  social_x: UtilitySection;
  social_instagram: UtilitySection;
  social_facebook: UtilitySection;
  email_pic_whistleblowing: UtilitySection | null;
}

export interface LlmsApiResponse {
  llms_txt: string;
  llms_full_txt: string;
  raw?: {
    llms_txt: UtilitySection | null;
    llms_full_txt: UtilitySection | null;
  };
}