import { GovernanceResponse } from "@/types/Governances/Policy";

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/governances/files/policy?page=`;

// method untuk fetch data page privacy policy governance
export async function getPolicyPageData(locale: string, currentPage: number): Promise<GovernanceResponse> {
  try {
    const res = await fetch(`${API_URL}${currentPage}`, {
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

    const data: GovernanceResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}


export const policyService = {
  getPolicyPageData,
};
