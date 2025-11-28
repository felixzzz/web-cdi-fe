import { OptionList } from "@/schemas/contactUsSchema";
import { InvestorGovernanceApiResponse } from "@/types/Governances/Governance";

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/utility/governance`;
const API_OPTION = `${process.env.NEXT_PUBLIC_BASE_URL}/utility/whistleblowing-topics`;

export async function getGovernancePageData(locale: string,): Promise<InvestorGovernanceApiResponse> {
  try {
    const res = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        lang: locale
      },
      next: {
        revalidate: 3600,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch home data: ${res.statusText}`);
    }

    const data: InvestorGovernanceApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}


export async function getOptionData(locale: string): Promise<OptionList> {
  try {
    const res = await fetch(API_OPTION, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        lang: locale,
      },
      next: {
        revalidate: 3600,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch home data: ${res.statusText}`);
    }

    const data: OptionList = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}


export const governanceDetailService = {
  getGovernancePageData,
  getOptionData
};
