import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: { locale: string } }
): Promise<Response> {
  const { locale } = params;
  const baseUrl = process.env.NEXT_PUBLIC_URL_LP;

  const staticPages = [
    { path: "/", priority: 1.0 },               
    { path: "/about-us", priority: 0.8 },        
    { path: "/our-business", priority: 0.8 },  
    { path: "/investor", priority: 0.8 },       
    { path: "/governance", priority: 0.8 },      
    { path: "/sustainability", priority: 0.8 },
    { path: "/media/news", priority: 0.8 },     
    { path: "/career", priority: 0.7 },        
    { path: "/contact-us", priority: 0.7 },     
    { path: "/terms-and-conditions", priority: 0.5 },
    { path: "/privacy-policy", priority: 0.5 },  
    { path: "/cookies-notice", priority: 0.5 },  
    { path: "/disclaimer", priority: 0.5 },       
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="/style.xsl"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  staticPages.forEach((page) => {
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

  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}