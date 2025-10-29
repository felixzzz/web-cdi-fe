import { AboutUsManagementApiResponse } from "@/types/AboutUs/Management";

const API_URL = "https://chandradaya-investasi.com/api/utility/about-us/management";

export async function getManagementPageData(): Promise<AboutUsManagementApiResponse> {
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

    const data: AboutUsManagementApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getManagementPageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export const managementService = {
  getManagementPageData,
};


// export const extractYouTubeId = (url: string | null): string => {
//   if (!url) return "GMJycZe_zpE"; 
//   try {
//     const urlObj = new URL(url);
//     if (urlObj.pathname.startsWith("/embed/")) {
//       return urlObj.pathname.split("/")[2].split("?")[0];
//     }
//   } catch (e) {
//     if (url.includes("embed/")) {
//       return url.split("embed/")[1].split("?")[0];
//     }
//   }
//   return "GMJycZe_zpE";
// };