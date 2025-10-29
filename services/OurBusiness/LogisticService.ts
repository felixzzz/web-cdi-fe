import { LogisticsApiResponse } from "@/types/OurBusiness/Logistic";

const API_URL = "https://chandradaya-investasi.com/api/business/detail/logistic";

export async function getLogisticPageData(): Promise<LogisticsApiResponse> {
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

    const data: LogisticsApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export const logisticService = {
  getLogisticPageData,
};
