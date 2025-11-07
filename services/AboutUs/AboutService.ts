import { AboutUsWhoWeAreApiResponse, CompanyProfileResponse, HistoryApiResponse, MilestoneApiResponse } from "@/types/AboutUs/About";

const API_URL = "https://chandradaya-investasi.com/api/utility/about-us/who-we-are";
const API_URL_HISTORY = "https://chandradaya-investasi.com/api/utility/our-histories";
const API_URL_MILSTONE = "https://chandradaya-investasi.com/api/utility/milestones";
const API_URL_PROFILE = "https://chandradaya-investasi.com/api/utility/additional-file/company-profile";

export async function getAboutPageData(): Promise<AboutUsWhoWeAreApiResponse> {
  try {
    const res = await fetch(API_URL, {
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

    const data: AboutUsWhoWeAreApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getAboutPageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export async function getHistoryData(): Promise<HistoryApiResponse> {
  try {
    const res = await fetch(API_URL_HISTORY, {
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

    const data: HistoryApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getAboutPageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export async function getMilstoneData(): Promise<MilestoneApiResponse> {
  try {
    const res = await fetch(API_URL_MILSTONE, {
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

    const data: MilestoneApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getAboutPageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export async function getProfileData(): Promise<CompanyProfileResponse> {
  try {
    const res = await fetch(API_URL_PROFILE, {
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