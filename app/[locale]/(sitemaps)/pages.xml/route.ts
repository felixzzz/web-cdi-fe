import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: { locale: string } }
): Promise<Response> {
  const { locale } = params;
  const baseUrl = process.env.NEXT_PUBLIC_URL;

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

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  staticPages.forEach((page) => {
    // Handle the root path "/" correctly to avoid double slashes
    const pathSlug = page.path === "/" ? "" : page.path;
    
    xml += `
    <url>
      <loc>${baseUrl}/${locale}${pathSlug}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>${page.priority}</priority>
      <changefreq>monthly</changefreq>
    </url>`;
  });

  xml += `</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}