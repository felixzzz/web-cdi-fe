import { AboutUsWhoWeAreApiResponse, CompanyProfileResponse, HistoryApiResponse, MilestoneApiResponse } from "@/types/AboutUs/About";

const API_URL = `${process.env.NEXT_PUBLIC_HOSTNAME}/utility/about-us/who-we-are`;
const API_URL_HISTORY = `${process.env.NEXT_PUBLIC_HOSTNAME}/utility/our-histories`;
const API_URL_MILSTONE = `${process.env.NEXT_PUBLIC_HOSTNAME}/utility/milestones`;
const API_URL_PROFILE = `${process.env.NEXT_PUBLIC_HOSTNAME}/utility/additional-file/company-profile`;

export async function getAboutPageData(locale: string): Promise<AboutUsWhoWeAreApiResponse> {
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

    const data: AboutUsWhoWeAreApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getAboutPageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export async function getHistoryData(locale: string): Promise<HistoryApiResponse> {
  try {
    const res = await fetch(API_URL_HISTORY, {
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

    const data: HistoryApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getAboutPageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export async function getMilstoneData(locale: string): Promise<MilestoneApiResponse> {
  try {
    const res = await fetch(API_URL_MILSTONE, {
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

    const data: MilestoneApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getAboutPageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export async function getProfileData(locale: string): Promise<CompanyProfileResponse> {
  try {
    const res = await fetch(API_URL_PROFILE, {
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

    const data: CompanyProfileResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getAboutPageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export const aboutService = {
  getAboutPageData,
  getHistoryData,
  getMilstoneData,
  getProfileData
};


export const extractYouTubeId = (url: string | null): string => {
  if (!url) return "GMJycZe_zpE"; 
  try {
    const urlObj = new URL(url);
    if (urlObj.pathname.startsWith("/embed/")) {
      return urlObj.pathname.split("/")[2].split("?")[0];
    }
  } catch (e) {
    if (url.includes("embed/")) {
      return url.split("embed/")[1].split("?")[0];
    }
  }
  return "GMJycZe_zpE";
};