import {
  SustainabilityContentSection,
  SustainabilityGovernanceApiResponse,
} from "@/types/Sustainabilitys/Governance";

const API_URL_MAIN =
  "https://chandradaya-investasi.com/api/utility/sustainability/governance";
const API_URL_CONTENT =
  "https://chandradaya-investasi.com/api/sustainability/contents/governance";

export async function getGovernancePageData(): Promise<SustainabilityGovernanceApiResponse> {
  try {
    const res = await fetch(API_URL_MAIN, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

export async function getGovernanceContentData(): Promise<
  SustainabilityContentSection[]
> {
  try {
    const res = await fetch(API_URL_CONTENT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 3600,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch home data: ${res.statusText}`);
    }

    const data: SustainabilityContentSection[] = await res.json();
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
