import { InvestorSustainabilityApiResponse } from "@/types/Sustainabilitys/Sustainability";

const API_URL = "https://chandradaya-investasi.com/api/utility/sustainability/overview";

export async function getSustainabilityPageData(): Promise<InvestorSustainabilityApiResponse> {
  try {
    const res = await fetch(API_URL, {
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

    const data: InvestorSustainabilityApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export const sustainabilityService = {
  getSustainabilityPageData,
};
