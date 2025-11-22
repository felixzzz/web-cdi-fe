import { MetadataRoute } from "next";

const baseUrl = "https://cdi-be.cmlabs.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}