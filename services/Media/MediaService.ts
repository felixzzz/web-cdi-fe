import { NewsApiResponse, PressReleaseApiResponse } from "@/types/Media/Media";

const API_URL_MEDIA = "https://chandradaya-investasi.com/api/article/list/news?";

export async function getMediaPageData(): Promise<NewsApiResponse> {
  try {
    const res = await fetch(API_URL_MEDIA, {
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

    const data: NewsApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export const mediaService = {
  getMediaPageData,
};

const API_URL_RELEASE = "https://chandradaya-investasi.com/api/press-releases/list";

export async function getPressReleasePageData(): Promise<PressReleaseApiResponse> {
  try {
    const res = await fetch(API_URL_RELEASE, {
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

    const data: PressReleaseApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export const pressReleaseService = {
  getPressReleasePageData,
};
