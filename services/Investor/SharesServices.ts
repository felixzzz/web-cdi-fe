import { InvestorSharesApiResponse } from "@/types/Investor/Shares";

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/utility/investor`;

export async function getSharesPageData(locale: string): Promise<InvestorSharesApiResponse> {
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

    const data: InvestorSharesApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export const sharesService = {
  getSharesPageData,
};
