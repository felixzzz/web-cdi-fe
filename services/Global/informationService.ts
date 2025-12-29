import { CompanyLocationResponse } from "@/types/global/footer";
import { ApiCredentialResponse } from "@/types/global/information";
import { QuickLinksApiResponse } from "@/types/Homepage/home";

const API_URL_LINKS = `${process.env.NEXT_PUBLIC_URL}/api/utility/quick-link/home`;
const API_URL_FOOTER = `${process.env.NEXT_PUBLIC_URL}/api/utility/main-office`;
const API_URL_CREDENTIAL = `${process.env.NEXT_PUBLIC_URL}/api/utility/social-media`;

// method untuk fetch data data informasi quick links pada homepage dan management
export async function getHomeQuickLinks(locale: string): Promise<QuickLinksApiResponse> {
  try {
    const res = await fetch(API_URL_LINKS, {
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

    const data: QuickLinksApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

// method untuk fetch data footer company location, etc
export async function getFooterData(locale: string): Promise<CompanyLocationResponse> {
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

// method untuk fetch data credential social media footer
export async function getCredentialData(locale: string): Promise<ApiCredentialResponse> {
  try {
    const res = await fetch(API_URL_CREDENTIAL, {
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

    const data: ApiCredentialResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getHomePageData:", error);
    throw new Error("Could not fetch homepage data.");
  }
}

export const informationService = {
  getHomeQuickLinks,
  getFooterData,
  getCredentialData
};
