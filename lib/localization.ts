import { HomePageSection } from "@/types/Homepage/home";

export const getLocalizedField = (
  item: HomePageSection,
  field: "title" | "content",
  locale: "en" | "id"
): string | null => {
  if (locale === "id") {
    return item[`${field}_id`] || item[`${field}_en`] || item[field];
  }
  return item[`${field}_en`] || item[field] || item[`${field}_id`];
};

export interface PageProps {
  params: {
    locale: "en" | "id";
  };
}

// export const l = (item: HomePageSection, field: "title" | "content") =>
//     getLocalizedField(item, field, locale);


export const stripHtml = (html: string | undefined) =>
    html ? html.replace(/<[^>]+>/g, "") : "";


export const formatExternalUrl = (url: string) => {
  if (!url) return "#";

  // Jika data spesifiknya aneh seperti "https.careers..." (typo dari API/Data)
  if (url.startsWith("https.") && !url.startsWith("https://")) {
    return url.replace("https.", "https://");
  }

  // Jika tidak ada protocol sama sekali (misal: "careers.capcx.com")
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `https://${url}`;
  }

  return url;
};