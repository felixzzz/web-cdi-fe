import { LogisticsApiResponse } from "@/types/OurBusiness/Logistic";

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/business/detail/logistic`;

// method untuk fetch data page logistic business
export async function getLogisticPageData(locale: string): Promise<LogisticsApiResponse> {
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
