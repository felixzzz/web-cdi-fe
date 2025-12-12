import { ApiArticleResponse, HomePageApiResponse, ReportApiResponse } from "@/types/Homepage/home";

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/utility/home`;
const API_URL_REPORT = `${process.env.NEXT_PUBLIC_BASE_URL}/utility/latest-reports`;
// wconst API_URL_LINKS = "https://cdi-be.cmlabs.dev/api/utility/quick-link/home";
const API_URL_ARTICLE = `${process.env.NEXT_PUBLIC_BASE_URL}/article/latest?category_id=all`

export async function getHomePageData(locale: string): Promise<HomePageApiResponse> {
  try {
    const res = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        lang: locale,
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

export async function getHomeReportData(locale: string): Promise<ReportApiResponse> {
  try {
    const res = await fetch(API_URL_REPORT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        lang: locale,
      },
      next: {
        revalidate: 3600,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch home data: ${res.statusText}`);
    }

    const data: ReportApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export async function getHomeArticle(locale: string): Promise<ApiArticleResponse> {
  try {
    const res = await fetch(API_URL_ARTICLE, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        lang: locale,
      },
      next: {
        revalidate: 3600,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch home data: ${res.statusText}`);
    }

    const data: ApiArticleResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export const homeService = {
  getHomePageData,
  getHomeReportData,
  getHomeArticle
};
