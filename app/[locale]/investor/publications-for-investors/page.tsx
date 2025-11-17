import { Hero } from "@/components/features/Investor/PublicationsForInvestors/Hero";
import { Publications } from "@/components/features/Investor/PublicationsForInvestors/Publications";
import { publicationService } from "@/services/Investor/PublicationServices";
import { PublicationPageProps } from "@/types/Investor/Publication";
import { Metadata } from "next";
// import { useTranslations } from "next-intl";


const description = "PT Chandra Daya Investasi Tbk (CDI Group) merupakan bagian dari investasi infrastruktur Chandra Asri Group, penyedia bahan kimia energi dan solusi infrastruktur terkemuka di Asia Tenggara dan ECGO, perusahaan induk yang berfokus pada investasi bisnis ketenagalistrikan di Thailand. Beragam operasi CDI Group mencakup termasuk penyediaan dan pengolahan air, energi, kepelabuhanan & penyimpanan, dan logistik.";

const baseUrl = "https://chandradaya-investasi.com";

export const metadata: Metadata = {
  title: "Publications For Investors | Chandra Daya Investasi", 
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
    canonical: '/investor/publications-for-investors', 
  },
  icons: {
    shortcut: '/assets/frontend/favicon.png',
  },

  openGraph: {
    title: "Chandra Daya Investasi", 
    description: description,
    url: '/investor/publications-for-investors',
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

export default async function Page({ params: { locale } }: PublicationPageProps) {
  // const t = useTranslations("homepage");

  const publicationData = await publicationService.getPublicationPageData(locale);

  const initialTab = "prospectus";
  const initialData = await publicationService.getPublicationTabData(
    locale,
    initialTab,
    1
  );

  const { investor_publication_banner } = publicationData;

  return (
    <main>
      <Hero
        imageSrc={investor_publication_banner.file_url}
        title={
          investor_publication_banner.title ||
          "Financial Information for Investors"
        }
        iconSrc="https://chandradaya-investasi.com/assets/frontend/icons/ic_hero_circle_arrow_down.svg"
      />
      <Publications locale={locale} initialData={initialData} initialTab={initialTab} />
    </main>
  );
}
