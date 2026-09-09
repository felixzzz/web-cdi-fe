import { NextRequest } from "next/server";
import { mediaService } from "@/services/Media/MediaService";
import { ArticleItem } from "@/types/Media/Media";

export async function GET(
  _request: NextRequest,
  { params }: { params: { locale: string } }
): Promise<Response> {
  const { locale } = params;
  let baseUrl = process.env.NEXT_PUBLIC_URL_LP ?? "https://chandradaya-investasi.com";
  if (baseUrl.endsWith("/")) {
    baseUrl = baseUrl.slice(0, -1);
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="/style.xsl"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  
  try {
    const mediaBlogData = await mediaService.getMediaBlogPageData();
    
    if (mediaBlogData && mediaBlogData.items) {
      mediaBlogData.items.forEach((article: ArticleItem) => {
        const slug = locale === "en" ? (article.slug || article.slug_id) : (article.slug_id || article.slug);
        if (!slug) return;

        xml += `
        <url>
          <loc>${baseUrl}/${locale}/media/blog/${slug}</loc>
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