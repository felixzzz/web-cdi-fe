import { CalendarApiResponse, InvestorReportApiResponse } from "@/types/Investor/Report";

const API_URL = "https://chandradaya-investasi.com/api/utility/investor";
const API_URL_FINANCIAL = "https://chandradaya-investasi.com/api/investor/calendar/list";

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

async function getFinancialData(
  page: number = 1,
  type: string = "",
  year: string | number = ""
): Promise<CalendarApiResponse> {
  try {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    if (type) {
      params.append("type", type);
    }
    if (year) {
      params.append("year", year.toString());
    }

    const res = await fetch(`${API_URL_FINANCIAL}?${params.toString()}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch financial data: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error in getFinancialData:", error);
    throw new Error("Could not fetch financial calendar data.");
  }
}

export const reportService = {
  getReportPageData,
  getFinancialData,
};
