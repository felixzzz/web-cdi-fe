import { ApiLatestNewsResponse, HeroNewsSection, NewsApiResponse, PressReleaseApiResponse } from "@/types/Media/Media";
const API_URL_MEDIA = `${process.env.NEXT_PUBLIC_HOSTNAME}/article/list/news?`;
const API_URL_HERO_MEDIA = `${process.env.NEXT_PUBLIC_HOSTNAME}/utility/additional-page/media_main`;
const API_URL_RELEASE = `${process.env.NEXT_PUBLIC_HOSTNAME}/press-releases/list`;
const API_URL_MEDIA_LATEST = `${process.env.NEXT_PUBLIC_HOSTNAME}/article/latest-media`;

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

export async function getHeroPageData(locale: string): Promise<HeroNewsSection> {
  try {
    const res = await fetch(API_URL_HERO_MEDIA, {
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

    const data: HeroNewsSection = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export const mediaService = {
  getMediaPageData,
  getHeroPageData
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
