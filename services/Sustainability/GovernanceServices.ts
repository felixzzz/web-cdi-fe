import {
  ApiContentResponse,
  SustainabilityGovernanceApiResponse,
} from "@/types/Sustainabilitys/Governance";

const API_URL_MAIN = `${process.env.NEXT_PUBLIC_HOSTNAME}/utility/sustainability/governance`;
const API_URL_CONTENT = `${process.env.NEXT_PUBLIC_HOSTNAME}/sustainability/contents/governance`;

export async function getGovernancePageData(locale: string): Promise<SustainabilityGovernanceApiResponse> {
  try {
    const res = await fetch(API_URL_MAIN, {
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

    const data: SustainabilityGovernanceApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export async function getGovernanceContentData(locale: string): Promise<
  ApiContentResponse
> {
  try {
    const res = await fetch(API_URL_CONTENT, {
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

    const data: ApiContentResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export const governanceService = {
  getGovernancePageData,
  getGovernanceContentData,
};
