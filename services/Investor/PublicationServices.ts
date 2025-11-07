import { InvestorPublicationApiResponse, PublicationApiResponse, PublicationTab } from "@/types/Investor/Publication";

const API_URL = "https://chandradaya-investasi.com/api/utility/investor";
const API_BASE_URL = "https://chandradaya-investasi.com/api/investor";

export async function getPublicationPageData(): Promise<InvestorPublicationApiResponse> {
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

    const data: InvestorPublicationApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export async function getPublicationTabData(
  tab: PublicationTab,
  page: number = 1
): Promise<PublicationApiResponse> {
  const params = new URLSearchParams();
  params.append("tab", tab);
  params.append("page", page.toString());

  const url = `${API_BASE_URL}/${tab}/list?${params.toString()}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 300 }, 
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch ${tab} data: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error(`Error in getPublicationTabData (${tab}):`, error);
    throw new Error(`Could not fetch ${tab} data.`);
  }
}

export const publicationService = {
  getPublicationPageData,
  getPublicationTabData, 
}