import { CalendarApiResponse, InvestorFinancialApiResponse } from "@/types/Investor/Financial";

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/utility/investor`;
const API_URL_CALENDAR = `${process.env.NEXT_PUBLIC_BASE_URL}/investor/calendar/list`;

// method untuk fetch data page financial investor
export async function getFinancialPageData(locale: string): Promise<InvestorFinancialApiResponse> {
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

    const data: InvestorFinancialApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

// method untuk fetch data page financial calendar investor
export async function getFinancialCalendarData(
  locale: string,
  page: number = 1,
  type: string = "",
  year: string | number = "",
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
      headers: { "Content-Type": "application/json", lang: locale },
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