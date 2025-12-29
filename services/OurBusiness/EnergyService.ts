import { EnergyApiResponse } from "@/types/OurBusiness/Energy";

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/business/detail/energy`;

// method untuk fetch data page energy business
export async function getEnergyPageData(locale: string): Promise<EnergyApiResponse> {
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

    const data: EnergyApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}


export const energyService = {
  getEnergyPageData,
};
