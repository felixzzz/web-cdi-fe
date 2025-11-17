import { ApiInstitutionResponse, CalendarApiResponse, InvestorReportApiResponse } from "@/types/Investor/Report";

const API_URL = "https://chandradaya-investasi.com/api/utility/investor";
const API_URL_FINANCIAL = "https://chandradaya-investasi.com/api/investor/calendar/list";
const API_URL_INSTITUTION = "https://chandradaya-investasi.com/api/institutions/list";

export async function getReportPageData(locale: string): Promise<InvestorReportApiResponse> {
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

    const data: InvestorReportApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export async function getInstitutionsData(locale: string): Promise<ApiInstitutionResponse> {
  try {
    const res = await fetch(API_URL_INSTITUTION, {
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

    const data: ApiInstitutionResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

async function getFinancialData(
  locale: string,
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
      headers: { "Content-Type": "application/json", lang: locale },
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
  getInstitutionsData,
  getFinancialData,
};
