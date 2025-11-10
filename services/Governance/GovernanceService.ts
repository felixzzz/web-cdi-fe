import { ApiFileResponse, ApiTabsResponse, InvestorGovernanceApiResponse } from "@/types/Governances/Governance";

const API_URL = "https://chandradaya-investasi.com/api/utility/governance";
const API_URL_CORPORATE_FILE = "https://chandradaya-investasi.com/api/utility/additional-file/corporate_secretary";
const API_URL_INTERNAL_FILE = "https://chandradaya-investasi.com/api/utility/additional-file/internal_audit";
const API_URL_COMITE_FILE = "https://chandradaya-investasi.com/api/utility/additional-file/audit_committe";
const API_URL_PRODUCT_FILE = "https://chandradaya-investasi.com/api/utility/additional-file/code_of_conduct";
const API_URL_TAB_GOVERNANCE_FILE = "https://chandradaya-investasi.com/api/utility/governance-committes";

export async function getGovernancePageData(locale: string): Promise<InvestorGovernanceApiResponse> {
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

    const data: InvestorGovernanceApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export async function getCorporateFileData(locale: string): Promise<ApiFileResponse> {
  try {
    const res = await fetch(API_URL_CORPORATE_FILE, {
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

    const data: ApiFileResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export async function getInternalFileData(locale: string): Promise<ApiFileResponse> {
  try {
    const res = await fetch(API_URL_INTERNAL_FILE, {
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

    const data: ApiFileResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export async function getComiteFileData(locale: string): Promise<ApiFileResponse> {
  try {
    const res = await fetch(API_URL_COMITE_FILE, {
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

    const data: ApiFileResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export async function getProductFileData(locale: string): Promise<ApiFileResponse> {
  try {
    const res = await fetch(API_URL_PRODUCT_FILE, {
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

    const data: ApiFileResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export async function getGovernanceData(locale: string): Promise<ApiTabsResponse> {
  try {
    const res = await fetch(API_URL_TAB_GOVERNANCE_FILE, {
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

    const data: ApiTabsResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export const governanceService = {
  getGovernancePageData,
  getCorporateFileData,
  getInternalFileData,
  getComiteFileData,
  getProductFileData,
  getGovernanceData,
};
