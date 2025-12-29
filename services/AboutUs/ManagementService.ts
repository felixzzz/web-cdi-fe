import {
  AboutUsManagementApiResponse,
  GuidelineApiResponse,
  ManagementApiResponse,
} from "@/types/AboutUs/Management";

const API_URL =
  `${process.env.NEXT_PUBLIC_BASE_URL}/utility/about-us/management`;
const API_URL_BOD = `${process.env.NEXT_PUBLIC_BASE_URL}/utility/teams/bod`;
const API_URL_BOC = `${process.env.NEXT_PUBLIC_BASE_URL}/utility/teams/boc`;
const API_URL_GUIDE = `${process.env.NEXT_PUBLIC_BASE_URL}/utility/additional-file/guideline`;

// method untuk fetch data page management about us
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

// method untuk fetch component data bod membership page management
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

// method untuk fetch component data boc membership page management
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

// method untuk fetch component guide bod membership page management
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
