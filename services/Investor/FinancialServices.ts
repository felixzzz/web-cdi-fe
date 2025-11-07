import { CalendarApiResponse, InvestorFinancialApiResponse } from "@/types/Investor/Financial";

const API_URL = "https://chandradaya-investasi.com/api/utility/investor";
const API_URL_CALENDAR =
  "https://chandradaya-investasi.com/api/investor/calendar/list";

export async function getFinancialPageData(): Promise<InvestorFinancialApiResponse> {
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

    const data: InvestorFinancialApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export async function getFinancialCalendarData(
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

    const res = await fetch(`${API_URL_CALENDAR}?${params.toString()}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch financial data: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error in getFinancialCalendarData:", error);
    throw new Error("Could not fetch financial calendar data.");
  }
}

export const financialService = {
  getFinancialPageData,
  getFinancialCalendarData, 
};