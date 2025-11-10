import { BusinessItem, OurBusinessApiResponse } from "@/types/OurBusiness/Bussines";

const API_URL = "https://chandradaya-investasi.com/api/utility/our-business";
const API_URL_OVERVIEW = "https://chandradaya-investasi.com/api/business/overview-list";

export async function getBusinessPageData(locale: string): Promise<OurBusinessApiResponse> {
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

    const data: OurBusinessApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export async function getOverviewData(locale: string): Promise<BusinessItem[]> {
  try {
    const res = await fetch(API_URL_OVERVIEW, {
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

    const data: BusinessItem[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export const businessService = {
  getBusinessPageData,
  getOverviewData,
};
