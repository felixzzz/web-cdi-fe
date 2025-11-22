import { managementService } from "@/services/AboutUs/ManagementService";
import { mediaService } from "@/services/Media/MediaService";
import { MetadataRoute } from "next";

const baseUrl = "https://cdi-be.cmlabs.dev";

const locales = ["en", "id"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { path: "/", priority: 1.0 },
    { path: "/about-us", priority: 0.8 },
    { path: "/about-us/awards", priority: 0.7 },
    { path: "/about-us/management", priority: 0.7 },
    { path: "/our-business", priority: 0.8 },
    { path: "/our-business/energy", priority: 0.7 },
    { path: "/our-business/logistics", priority: 0.7 },
    { path: "/our-business/ports-and-storage", priority: 0.7 },
    { path: "/our-business/water", priority: 0.7 },
    { path: "/governance", priority: 0.7 },
    { path: "/sustainability", priority: 0.8 },
    { path: "/sustainability/environment", priority: 0.6 },
    { path: "/sustainability/governance", priority: 0.6 },
    { path: "/sustainability/social", priority: 0.6 },
    { path: "/investor/financial-information", priority: 0.6 },
    { path: "/investor/publications-for-investors", priority: 0.6 },
    { path: "/investor/report", priority: 0.6 },
    { path: "/investor/shares-information", priority: 0.6 },
    { path: "/media/news", priority: 0.7 },
    { path: "/contact-us", priority: 0.7 },
    { path: "/disclaimer", priority: 0.5 },
    { path: "/privacy-policy", priority: 0.5 },
    { path: "/cookies-notice", priority: 0.5 },
    { path: "/terms-and-conditions", priority: 0.5 },
  ];

  // Create sitemap entries for each locale for all static pages
  const staticUrls = staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${page.path === "/" ? "" : page.path}`,
      lastModified: new Date().toISOString(),
      priority: page.priority,
    }))
  );

  // 2. Get dynamic news articles
  // We fetch 'id' locale just to get the list of slugs; any locale works
  const mediaData = await mediaService.getMediaPageData("id");
  const newsUrls = mediaData.items.flatMap((article) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/media/news/${article.slug}`,
      lastModified: new Date(
        article.updated_at || article.created_at
      ).toISOString(),
      priority: 0.6, // Slightly lower priority for individual articles
    }))
  );

  // 3. Get dynamic management team pages
  // We fetch both BOD and BOC to get all members
  const [bodList, bocList] = await Promise.all([
    managementService.getManagementBodData("id"),
    managementService.getManagementBocData("id"),
  ]);
  const allMembers = [...bodList, ...bocList];

  const managementUrls = allMembers.flatMap((member) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/about-us/management/team/${member.ulid}`,
      lastModified: new Date(member.updated_at).toISOString(),
      priority: 0.6,
    }))
  );

  // 4. Combine all URLs
  return [...staticUrls, ...newsUrls, ...managementUrls];
}