import { ApiContentResponse, SustainabilitySocialApiResponse, SustainabilitySocialTab } from "@/types/Sustainabilitys/Social";

const API_URL_MAIN = "https://chandradaya-investasi.com/api/utility/sustainability/social";
const API_URL_TAB = "https://chandradaya-investasi.com/api/sustainability/tab-contents/social";
const API_URL_CONTENT = "https://chandradaya-investasi.com/api/sustainability/contents/social";

export async function getSocialPageData(): Promise<SustainabilitySocialApiResponse> {
  try {
    const res = await fetch(API_URL_MAIN, {
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

    const data: SustainabilitySocialApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export async function getSocialTabData(): Promise<SustainabilitySocialTab[]> {
  try {
    const res = await fetch(API_URL_TAB, {
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

    const data: SustainabilitySocialTab[] = await res.json(); 
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export async function getSocialContentData(): Promise<ApiContentResponse> {
  try {
    const res = await fetch(API_URL_CONTENT, {
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

    const data: ApiContentResponse = await res.json(); 
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export const socialService = {
  getSocialPageData,
  getSocialTabData,
  getSocialContentData
};