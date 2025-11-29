import { NextRequest } from "next/server";
import { mediaService } from "@/services/Media/MediaService";

interface NewsArticle {
  slug: string;
  updated_at?: string;
  created_at?: string;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { locale: string } }
): Promise<Response> {
  const { locale } = params;
  const baseUrl = process.env.NEXT_PUBLIC_URL;

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  try {
    const mediaData = await mediaService.getMediaPageData(locale);
    
    if (mediaData && mediaData.items) {
      mediaData.items.forEach((article: NewsArticle) => {
        xml += `
        <url>
          <loc>${baseUrl}/${locale}/media/news/${article.slug}</loc>
          <lastmod>${new Date(article.updated_at || article.created_at || new Date()).toISOString()}</lastmod>
          <priority>0.6</priority>
          <changefreq>weekly</changefreq>
        </url>`;
      });
    }
  } catch (error) {
    console.error("News Sitemap Error:", error);
  }

  xml += `</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}