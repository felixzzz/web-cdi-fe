import { ApiLatestNewsResponse, NewsApiResponse, PressReleaseApiResponse } from "@/types/Media/Media";

const API_URL_MEDIA = "https://chandradaya-investasi.com/api/article/list/news?";
const API_URL_RELEASE = "https://chandradaya-investasi.com/api/press-releases/list";
const API_URL_MEDIA_LATEST = "https://chandradaya-investasi.com/api/article/latest-media";

export async function getMediaPageData(locale: string): Promise<NewsApiResponse> {
  try {
    const res = await fetch(API_URL_MEDIA, {
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


export async function getPressReleasePageData(locale: string): Promise<PressReleaseApiResponse> {
  try {
    const res = await fetch(API_URL_RELEASE, {
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

    const data: PressReleaseApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export async function getLatestNewsData(locale: string): Promise<ApiLatestNewsResponse> {
  try {
    const res = await fetch(API_URL_MEDIA_LATEST, {
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

    const data: ApiLatestNewsResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export const pressReleaseService = {
  getPressReleasePageData,
  getLatestNewsData,
};
