import {
  AboutUsManagementApiResponse,
  GuidelineApiResponse,
  ManagementApiResponse,
} from "@/types/AboutUs/Management";

const API_URL =
  `${process.env.NEXT_PUBLIC_HOSTNAME}/utility/about-us/management`;
const API_URL_BOD = `${process.env.NEXT_PUBLIC_HOSTNAME}/utility/teams/bod`;
const API_URL_BOC = `${process.env.NEXT_PUBLIC_HOSTNAME}/utility/teams/boc`;
const API_URL_GUIDE = `${process.env.NEXT_PUBLIC_HOSTNAME}/utility/additional-file/guideline`;

export async function getManagementPageData(
  locale: string
): Promise<AboutUsManagementApiResponse> {
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

    const data: AboutUsManagementApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getManagementPageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export async function getManagementBodData(
  locale: string
): Promise<ManagementApiResponse> {
  try {
    const res = await fetch(API_URL_BOD, {
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

    const data: ManagementApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getManagementPageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export async function getManagementBocData(
  locale: string
): Promise<ManagementApiResponse> {
  try {
    const res = await fetch(API_URL_BOC, {
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

    const data: ManagementApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getManagementPageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export async function getManagementGuideData(
  locale: string
): Promise<GuidelineApiResponse> {
  try {
    const res = await fetch(API_URL_GUIDE, {
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

    const data: GuidelineApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getManagementPageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export const managementService = {
  getManagementPageData,
  getManagementBodData,
  getManagementBocData,
  getManagementGuideData,
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
