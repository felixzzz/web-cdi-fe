import { ApiContentResponse, SustainabilityEnvironmentApiResponse } from "@/types/Sustainabilitys/Environment";

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/utility/sustainability/environment`;
const API_URL_CONTENT = `${process.env.NEXT_PUBLIC_BASE_URL}/sustainability/contents/environment`;

export async function getEnviromentPageData(locale: string): Promise<SustainabilityEnvironmentApiResponse> {
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

    const data: SustainabilityEnvironmentApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export async function getEnviromentContentData(locale: string): Promise<ApiContentResponse> {
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

export const environmentService = {
  getEnviromentPageData,
  getEnviromentContentData,
};
