import {
  AboutUsAwardApiResponse,
  AwardsApiResponse,
  CertificationApiResponse,
  MembershipApiResponse,
} from "@/types/AboutUs/Awards";

const API_URL = `${process.env.NEXT_PUBLIC_HOSTNAME}/utility/about-us/award`;
const API_URL_AWARDS = `${process.env.NEXT_PUBLIC_HOSTNAME}/awards/list`;
const API_URL_CERTIFICATION =
  `${process.env.NEXT_PUBLIC_HOSTNAME}/certificates/list?tab=certification`;
const API_URL_MEMBERSHIP =
  `${process.env.NEXT_PUBLIC_HOSTNAME}/memberships/list?tab=membership`;

export async function getAwardsPageData(
  locale: string
): Promise<AboutUsAwardApiResponse> {
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

    const data: AboutUsAwardApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getAwardsPageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export async function getAwardsTabPageData(
  locale: string
): Promise<AwardsApiResponse> {
  try {
    const res = await fetch(API_URL_AWARDS, {
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

    const data: AwardsApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getAwardsPageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export async function getCertificationTabPageData(
  locale: string
): Promise<CertificationApiResponse> {
  try {
    const res = await fetch(API_URL_CERTIFICATION, {
      method: "GET",
      headers: { "Content-Type": "application/json", lang: locale },
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
    return res.json();
  } catch (error) {
    console.error("Error in getCertificationTabPageData:", error);
    throw new Error("Could not fetch certification tab data.");
  }
}

export async function getMembershipTabPageData(
  locale: string
): Promise<MembershipApiResponse> {
  try {
    const res = await fetch(API_URL_MEMBERSHIP, {
      method: "GET",
      headers: { "Content-Type": "application/json", lang: locale },
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
    return res.json();
  } catch (error) {
    console.error("Error in getMembershipTabPageData:", error);
    throw new Error("Could not fetch membership tab data.");
  }
}

export const awardsService = {
  getAwardsPageData,
  getAwardsTabPageData,
  getCertificationTabPageData,
  getMembershipTabPageData,
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
