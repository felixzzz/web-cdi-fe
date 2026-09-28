import { buildDefaultLlmsFullTxt, buildDefaultLlmsTxt } from "@/lib/llms";
import { CompanyLocationResponse } from "@/types/global/footer";
import { ApiCredentialResponse, LlmsApiResponse } from "@/types/global/information";
import { QuickLinksApiResponse } from "@/types/Homepage/home";

const API_URL_LINKS = `${process.env.NEXT_PUBLIC_URL}/api/utility/quick-link/home`;
const API_URL_FOOTER = `${process.env.NEXT_PUBLIC_URL}/api/utility/main-office`;
const API_URL_CREDENTIAL = `${process.env.NEXT_PUBLIC_URL}/api/utility/social-media`;
const API_URL_LLMS = `${process.env.NEXT_PUBLIC_URL}/api/utility/llms`;

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

// method untuk fetch data llms.txt dan llms-full.txt dari backend dengan fallback
export async function getLlmsData(): Promise<LlmsApiResponse> {
  try {
    const res = await fetch(API_URL_LLMS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        lang: "en",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch llms data: ${res.statusText}`);
    }

    const data: LlmsApiResponse = await res.json();
    return {
      llms_txt: data?.llms_txt?.trim() ? data.llms_txt : buildDefaultLlmsTxt(),
      llms_full_txt: data?.llms_full_txt?.trim() ? data.llms_full_txt : buildDefaultLlmsFullTxt(),
      raw: data?.raw,
    };
  } catch (error) {
    console.error("Error in getLlmsData:", error);
    return {
      llms_txt: buildDefaultLlmsTxt(),
      llms_full_txt: buildDefaultLlmsFullTxt(),
    };
  }
}

export const informationService = {
  getHomeQuickLinks,
  getFooterData,
  getCredentialData,
  getLlmsData,
};
