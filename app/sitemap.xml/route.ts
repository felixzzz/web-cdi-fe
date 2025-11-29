export async function GET(): Promise<Response> {
  let baseUrl = process.env.NEXT_PUBLIC_URL ?? "";
  if (baseUrl.endsWith("/")) {
    baseUrl = baseUrl.slice(0, -1);
  }

  const locales = ["en", "id"];
  
  const sitemapTypes = [
    '/pages',      
    '/news',       
    '/management'  
  ];

  // cSpell:disable-next-line
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  locales.forEach((locale) => {
    sitemapTypes.forEach((type) => {
      xml += `
      <sitemap>
        <loc>${baseUrl}/${locale}${type}.xml</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </sitemap>`;
    });
  });

  xml += `</sitemapindex>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}