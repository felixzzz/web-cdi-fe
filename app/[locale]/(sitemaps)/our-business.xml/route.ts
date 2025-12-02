import { NextRequest } from "next/server";

export async function GET(_request: NextRequest, { params }: { params: { locale: string } }): Promise<Response> {
  const { locale } = params;
  const baseUrl = process.env.NEXT_PUBLIC_URL_LP;

  const pages = [
    { path: "/our-business", priority: 0.7 },
    { path: "/our-business/energy", priority: 0.7 },
    { path: "/our-business/water", priority: 0.7 },
    { path: "/our-business/ports-and-storage", priority: 0.7 },
    { path: "/our-business/logistics", priority: 0.7 },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="/style.xsl"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  pages.forEach((page) => {
    xml += `<url><loc>${baseUrl}/${locale}${page.path}</loc><lastmod>${new Date().toISOString()}</lastmod><priority>${page.priority}</priority><changefreq>monthly</changefreq></url>`;
  });
  xml += `</urlset>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}