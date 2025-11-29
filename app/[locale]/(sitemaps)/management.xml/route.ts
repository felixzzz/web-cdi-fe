import { NextRequest } from "next/server";
import { managementService } from "@/services/AboutUs/ManagementService";

interface TeamMember {
  ulid: string;
  updated_at?: string;
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
    const [bodList, bocList] = await Promise.all([
      managementService.getManagementBodData(locale),
      managementService.getManagementBocData(locale),
    ]);
    
    const allMembers = [...(bodList || []), ...(bocList || [])];

    // 2. Apply the interface here instead of ': any'
    allMembers.forEach((member: TeamMember) => {
      xml += `
      <url>
        <loc>${baseUrl}/${locale}/about-us/management/team/${member.ulid}</loc>
        <lastmod>${new Date(member.updated_at || new Date()).toISOString()}</lastmod>
        <priority>0.6</priority>
        <changefreq>monthly</changefreq>
      </url>`;
    });
  } catch (error) {
    console.error("Management Sitemap Error:", error);
  }

  xml += `</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}