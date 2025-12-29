import { ApiContentResponse, SustainabilitySocialApiResponse, SustainabilitySocialTab } from "@/types/Sustainabilitys/Social";

const API_URL_MAIN = `${process.env.NEXT_PUBLIC_BASE_URL}/utility/sustainability/social`;
const API_URL_TAB = `${process.env.NEXT_PUBLIC_BASE_URL}/sustainability/tab-contents/social`;
const API_URL_CONTENT = `${process.env.NEXT_PUBLIC_BASE_URL}/sustainability/contents/social`;

// method untuk fetch data page social sustainability
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

// method untuk fetch data tab page social sustainability
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


// method untuk fetch data content page social sustainability
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