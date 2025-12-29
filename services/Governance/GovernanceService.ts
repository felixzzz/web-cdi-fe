import { ApiFileResponse, ApiTabsResponse, InvestorGovernanceApiResponse } from "@/types/Governances/Governance";

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/utility/governance`;
const API_URL_CORPORATE_FILE = `${process.env.NEXT_PUBLIC_BASE_URL}/utility/additional-file/corporate_secretary`;
const API_URL_INTERNAL_FILE = `${process.env.NEXT_PUBLIC_BASE_URL}/utility/additional-file/internal_audit`;
const API_URL_COMITE_FILE = `${process.env.NEXT_PUBLIC_BASE_URL}/utility/additional-file/audit_committe`;
const API_URL_PRODUCT_FILE = `${process.env.NEXT_PUBLIC_BASE_URL}/utility/additional-file/code_of_conduct`;
const API_URL_TAB_GOVERNANCE_FILE = `${process.env.NEXT_PUBLIC_BASE_URL}/utility/governance-committes`;

// method untuk fetch data governance page
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

// method untuk fetch data component file exits pada component profile governance
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

// method untuk fetch data component file exits pada internal audit governance
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

// method untuk fetch data component file exits pada audit comite governance
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

// method untuk fetch data component file exits pada code of conduct governance
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

// method untuk fetch data component file exits pada tab governance
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
