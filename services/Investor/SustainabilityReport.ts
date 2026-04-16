import { SustainabilityReportResponse } from "@/types/Investor/SustainabilityReport";

const API_URL_REPORT = `${process.env.NEXT_PUBLIC_URL}/api/sustainability/reports/report`;

export async function getSustainabilityReports(
  locale: string,
  page: number = 1
): Promise<SustainabilityReportResponse> {
  try {
    const url = new URL(API_URL_REPORT);
    url.searchParams.append("page", page.toString());

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        lang: locale,
      },
      next: {
        revalidate: 3600,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch sustainability reports: ${res.statusText}`);
    }

    const data: SustainabilityReportResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getSustainabilityReports:", error);
    throw new Error("Could not fetch sustainability reports data.");
  }
}

export const sustainabilityReportService = {
  getSustainabilityReports,
};