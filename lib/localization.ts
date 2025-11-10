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




export const stripHtml = (html: string | null) =>
    html ? html.replace(/<[^>]+>/g, "") : "";