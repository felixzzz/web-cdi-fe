export interface SeoMetaItem {
  id?: number;
  ulid?: string;
  key: string;
  type?: string;
  title?: string;
  content?: string;
  title_en?: string;
  title_id?: string;
  content_en?: string;
  content_id?: string;
}

export type SeoMetaRecord = Record<string, SeoMetaItem>;

class SeoService {
  private getApiUrl(): string {
    const base = process.env.NEXT_PUBLIC_URL || "https://chandradaya-investasi.com";
    return `${base.replace(/\/+$/, "")}/api/utility/seo-metadata`;
  }

  /**
   * Fetch all CMS SEO meta preferences.
   * Cached via Next.js ISR (revalidate every 3600s, tagged 'seo-metadata').
   */
  async getSeoMetadata(locale?: string): Promise<SeoMetaRecord> {
    try {
      const url = this.getApiUrl();
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(locale ? { lang: locale } : {}),
        },
        next: {
          revalidate: 3600,
          tags: ["seo-metadata"],
        },
      });

      if (!res.ok) {
        console.warn(`[seoService] Failed to fetch SEO metadata (${res.status}): ${res.statusText}`);
        return {};
      }

      const data: SeoMetaRecord = await res.json();
      return data || {};
    } catch (error) {
      console.warn("[seoService] Network error fetching SEO metadata:", error);
      return {};
    }
  }

  /**
   * Retrieve title & description for a specific preference key with locale preference.
   */
  async getPageSeoMetadata(
    key: string,
    locale: string
  ): Promise<{ title?: string; description?: string }> {
    const metaMap = await this.getSeoMetadata(locale);
    const item = metaMap?.[key];

    if (!item) {
      return {};
    }

    const isId = locale === "id";
    const rawTitle = isId
      ? item.title_id || item.title || item.title_en
      : item.title_en || item.title || item.title_id;

    const rawDescription = isId
      ? item.content_id || item.content || item.content_en
      : item.content_en || item.content || item.content_id;

    const title = rawTitle && rawTitle.trim() ? rawTitle.trim() : undefined;
    const description = rawDescription && rawDescription.trim() ? rawDescription.trim() : undefined;

    return { title, description };
  }
}

export const seoService = new SeoService();
