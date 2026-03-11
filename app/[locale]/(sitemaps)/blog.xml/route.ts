// app/[locale]/(sitemaps)/news.xml/route.ts

import { NextRequest } from "next/server";
import { mediaService } from "@/services/Media/MediaService";

interface NewsArticle {
  [key: `slug${string}`]: string;
  updated_at?: string;
  created_at?: string;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { locale: string } }
): Promise<Response> {
  const { locale } = params;
  const baseUrl = process.env.NEXT_PUBLIC_URL_LP;

let xml = `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="/style.xsl"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  
  try {
    const mediaBlogData = await mediaService.getMediaBlogPageData(locale);
    
    if (mediaBlogData && mediaBlogData.items) {
      mediaBlogData.items.forEach((article: NewsArticle) => {

        const slugKey = locale === "en" ? "slug" : "slug_id";

        xml += `
        <url>
          <loc>${baseUrl}/${locale}/media/blog/${article[slugKey]}</loc>
          <lastmod>${new Date(article.updated_at || article.created_at || new Date()).toISOString()}</lastmod>
          <priority>0.6</priority>
          <changefreq>weekly</changefreq>
        </url>`;
      });
    }
  } catch (error) {
    console.error("Blog Sitemap Error:", error);
  }

  xml += `</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}