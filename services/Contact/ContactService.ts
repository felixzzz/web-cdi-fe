import { ContactSectionData, OtherCompanyAddressesApiResponse } from "@/types/Contact/Contact";
import { CompanyLocationResponse } from "@/types/global/footer";

const API_URL_FOOTER = "https://chandradaya-investasi.com/api/utility/main-office";
const API_URL = "https://chandradaya-investasi.com/api/utility/other-offices";
const API_CONTACT_URL = "https://chandradaya-investasi.com/api/utility/additional-page/contact_us_main";

export async function getCompanyAddressPageData(locale: string): Promise<OtherCompanyAddressesApiResponse> {
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

    const data: OtherCompanyAddressesApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export async function getContactPageData(locale: string): Promise<ContactSectionData> {
  try {
    const res = await fetch(API_CONTACT_URL, {
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

    const data: ContactSectionData = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export async function getContactData(locale: string): Promise<CompanyLocationResponse> {
  try {
    const res = await fetch(API_URL_FOOTER, {
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

    const data: CompanyLocationResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export const companyAddressService = {
  getCompanyAddressPageData,
  getContactData,
  getContactPageData
};