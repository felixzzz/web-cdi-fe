import { InvestorReportApiResponse } from "@/types/Investor/Report";

const API_URL = "https://chandradaya-investasi.com/api/utility/investor";

export async function getReportPageData(): Promise<InvestorReportApiResponse> {
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

    const data: InvestorReportApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export const reportService = {
  getReportPageData,
};
