import { PortsAndStorageApiResponse } from "@/types/OurBusiness/Ports&Storage";

const API_URL = `${process.env.NEXT_PUBLIC_HOSTNAME}/business/detail/port_storage`;

export async function getPortStoragePageData(locale: string): Promise<PortsAndStorageApiResponse> {
  try {
    const res = await fetch(API_URL, {
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

    const data: PortsAndStorageApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export const portStorageService = {
  getPortStoragePageData,
};
