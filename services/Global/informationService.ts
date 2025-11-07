import { QuickLinksApiResponse } from "@/types/Homepage/home";

const API_URL_LINKS = "https://chandradaya-investasi.com/api/utility/quick-link/home";

export async function getHomeQuickLinks(): Promise<QuickLinksApiResponse> {
  try {
    const res = await fetch(API_URL_LINKS, {
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

    const data: QuickLinksApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export const informationService = {
  getHomeQuickLinks
};
