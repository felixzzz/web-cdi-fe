import { InvestorSustainabilityApiResponse, MaterialityResponse } from "@/types/Sustainabilitys/Sustainability";

const API_URL = `${process.env.NEXT_PUBLIC_HOSTNAME}/utility/sustainability/overview`;
const API_URL_FRAMEWORK = `${process.env.NEXT_PUBLIC_HOSTNAME}/sustainability/responsibles`;

export async function getSustainabilityPageData(locale: string): Promise<InvestorSustainabilityApiResponse> {
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

    const data: InvestorSustainabilityApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}


export async function getFrameworkPageData(locale: string): Promise<MaterialityResponse> {
  try {
    const res = await fetch(API_URL_FRAMEWORK, {
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

    const data: MaterialityResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export const sustainabilityService = {
  getSustainabilityPageData,
  getFrameworkPageData
};
