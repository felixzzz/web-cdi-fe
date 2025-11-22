import { CountryList, OptionList } from "@/schemas/contactUsSchema";
import { ContactSectionData, OtherCompanyAddressesApiResponse } from "@/types/Contact/Contact";
import { CompanyLocationResponse } from "@/types/global/footer";

const API_URL_FOOTER = `${process.env.NEXT_PUBLIC_HOSTNAME}/utility/main-office`;
const API_URL = `${process.env.NEXT_PUBLIC_HOSTNAME}/utility/other-offices`;
const API_CONTACT_URL = `${process.env.NEXT_PUBLIC_HOSTNAME}/utility/additional-page/contact_us_main`;
const API_COUNTRIES = `${process.env.NEXT_PUBLIC_HOSTNAME}/utility/countries`;
const API_OPTION = `${process.env.NEXT_PUBLIC_HOSTNAME}/utility/contact-us-topics`;
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

export async function getCountriesData(locale: string): Promise<CountryList> {
  try {
    const res = await fetch(API_COUNTRIES, {
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

    const data: CountryList = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export async function getOptionData(locale: string): Promise<OptionList> {
  try {
    const res = await fetch(API_OPTION, {
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

    const data: OptionList = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export const companyAddressService = {
  getCompanyAddressPageData,
  getContactData,
  getContactPageData,
  getCountriesData,
  getOptionData,
};