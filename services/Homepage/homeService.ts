import { HomePageApiResponse } from "@/types/Homepage/home";

const API_URL = "https://chandradaya-investasi.com/api/utility/home";

export async function getHomePageData(): Promise<HomePageApiResponse> {
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

    const data: HomePageApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export const homeService = {
  getHomePageData,
};
