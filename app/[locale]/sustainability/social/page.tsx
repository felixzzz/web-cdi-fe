import { EmpoweringCommunities } from "@/components/features/Sustainability/Social/EmpoweringCommunities";
import { HealthAndSafety } from "@/components/features/Sustainability/Social/HealthAndSafety";
import { Hero } from "@/components/features/Sustainability/Social/Hero";
import { HumanRights } from "@/components/features/Sustainability/Social/HumanRights";
import { socialService } from "@/services/Sustainability/SocialServices";
import { SocialPageProps } from "@/types/Sustainabilitys/Social";
import { Metadata } from "next";


const description = "PT Chandra Daya Investasi Tbk (CDI Group) merupakan bagian dari investasi infrastruktur Chandra Asri Group, penyedia bahan kimia energi dan solusi infrastruktur terkemuka di Asia Tenggara dan ECGO, perusahaan induk yang berfokus pada investasi bisnis ketenagalistrikan di Thailand. Beragam operasi CDI Group mencakup termasuk penyediaan dan pengolahan air, energi, kepelabuhanan & penyimpanan, dan logistik.";

const baseUrl = "https://chandradaya-investasi.com";

export const metadata: Metadata = {
  title: "Sustainability Social | Chandra Daya Investasi", 
  description: description,
  keywords: ['Chandra Daya Investasi', 'CDI', 'CDIA', 'PT Chandra Daya Investasi Tbk', 'CDI Group'],
  
  metadataBase: new URL(baseUrl),

  viewport: {
    width: 'device-width',
    initialScale: 1.0,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/sustainability/social', 
  },
  icons: {
    shortcut: '/assets/frontend/favicon.png',
  },

  openGraph: {
    title: "Chandra Daya Investasi", 
    description: description,
    url: '/sustainability/social',
    type: 'website',
    siteName: 'Chandra Daya Investasi',
  },

  twitter: {
    card: 'summary_large_image',
    title: "Chandra Daya Investasi",
    description: description,
  },

  other: {
    'application-url': 'https://chandradaya-investasi.com',
    'preview-url': 'https://chandradaya-investasi.com/file-storage',
    'download-file': 'https://chandradaya-investasi.com/file-download',
    'add-file-preview': 'https://chandradaya-investasi.com/file/preview',
    'add-file-download': 'https://chandradaya-investasi.com/file/download',
  }
};

export default async function Page({params: {locale}}: SocialPageProps) {
  const [sosialData, tabsData, contentData] = await Promise.all([
    socialService.getSocialPageData(locale),
    socialService.getSocialTabData(locale), 
    socialService.getSocialContentData(locale), 
  ]);

  const { sustainability_social_banner, sustainability_social_overview } =
    sosialData;

const empoweringData = {
    ...sustainability_social_overview,
    tabs: tabsData,
  };

  const healthData = contentData.find(
    (item) => item.name === "Health and Safety Culture"
  );
  const humanRightsData = contentData.find(
    (item) => item.name === "Human Rights"
  );

  return (
    <>
      <div>
        <Hero
          imageSrc={sustainability_social_banner.file_url}
          title={
            sustainability_social_banner.title ||
            "Financial Information for Investors"
          }
          subtitle={sustainability_social_banner.content}
          iconSrc="https://chandradaya-investasi.com/assets/frontend/icons/ic_hero_circle_arrow_down.svg"
        />
        <EmpoweringCommunities data={empoweringData} />
        <HealthAndSafety data={healthData!} />
        <HumanRights data={humanRightsData!} />
      </div>
    </>
  );
}
