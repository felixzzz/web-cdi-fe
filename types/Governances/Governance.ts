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
  governance_banner: GovernanceSection;
  governance_corporate_secretary_team: GovernanceSection;
  governance_corporate_secretary: GovernanceSection;
  governance_internal_audit_unit: GovernanceSection;
  governance_audit_committe: GovernanceSection;
  governance_audit_committe_member_text: GovernanceSection;
  governance_sustainability_committe: GovernanceSection;
  governance_risk_management: GovernanceSection;
  governance_code_of_conduct: GovernanceSection;
  governance_she_regulation: GovernanceSection;
  governance_policy: GovernanceSection;
  governance_whistleblowing: GovernanceSection;
  governance_whistleblowing_id: GovernanceSection;
  governance_whistleblowing_detail: GovernanceSection;
  governance_audit_committe_show: GovernanceSection;
  governance_audit_committe_member_text_show: GovernanceSection;
  governance_sustainability_committe_show: GovernanceSection;
  governance_risk_management_show: GovernanceSection;
  governance_she_regulation_show: GovernanceSection;
  governance_policy_show: GovernanceSection;
}