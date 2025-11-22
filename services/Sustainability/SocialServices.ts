import { ApiContentResponse, SustainabilitySocialApiResponse, SustainabilitySocialTab } from "@/types/Sustainabilitys/Social";

const API_URL_MAIN = `${process.env.NEXT_PUBLIC_HOSTNAME}/utility/sustainability/social`;
const API_URL_TAB = `${process.env.NEXT_PUBLIC_HOSTNAME}/sustainability/tab-contents/social`;
const API_URL_CONTENT = `${process.env.NEXT_PUBLIC_HOSTNAME}/sustainability/contents/social`;

export async function getSocialPageData(locale: string): Promise<SustainabilitySocialApiResponse> {
  try {
    const res = await fetch(API_URL_MAIN, {
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

    const data: SustainabilitySocialApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export async function getSocialTabData(locale: string): Promise<SustainabilitySocialTab[]> {
  try {
    const res = await fetch(API_URL_TAB, {
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

    const data: SustainabilitySocialTab[] = await res.json(); 
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export async function getSocialContentData(locale: string): Promise<ApiContentResponse> {
  try {
    const res = await fetch(API_URL_CONTENT, {
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