import { ApiInstitutionResponse, CalendarApiResponse, InvestorReportApiResponse } from "@/types/Investor/Report";

import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/utility/investor`;
const API_URL_FINANCIAL = `${process.env.NEXT_PUBLIC_BASE_URL}/investor/calendar/list`;
const API_URL_INSTITUTION = `${process.env.NEXT_PUBLIC_BASE_URL}/institutions/list`;

// method untuk fetch data page report investor
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

// method untuk fetch data list institution report investor
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

// method untuk fetch data page financial calendar investor
async function getFinancialData(
    locale: string,
    page: number = 1,
    type: string = "",
    year: string | number = ""
): Promise<CalendarApiResponse> {
    try {
        const params: Record<string, string> = {
            page: page.toString(),
        };

        if (type) params.type = type;
        if (year) params.year = year.toString();

        const res = await axios.get(API_URL_FINANCIAL, {
            params,
            headers: {
                "Content-Type": "application/json",
                lang: locale,
            },
        });

        return res.data;
    } catch (error: any) {
        console.error("Error in getFinancialData:", error?.response || error);

        throw new Error(
            error?.response?.data?.message ||
            "Could not fetch financial calendar data."
        );
    }
}

export const reportService = {
  getReportPageData,
  getInstitutionsData,
  getFinancialData,
};
