import { NewsDetail } from "@/components/features/Media/Details/Detail";
import { RelatedPosts } from "@/components/features/Media/Details/RelatedPosts";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { mediaService } from "@/services/Media/MediaService";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export type PageProps = {
  params: {
    slug: string;
    locale: string;
  };
};

const description =
  "PT Chandra Daya Investasi Tbk (CDI Group) merupakan bagian dari investasi infrastruktur Chandra Asri Group, penyedia bahan kimia energi dan solusi infrastruktur terkemuka di Asia Tenggara dan ECGO, perusahaan induk yang berfokus pada investasi bisnis ketenagalistrikan di Thailand. Beragam operasi CDI Group mencakup termasuk penyediaan dan pengolahan air, energi, kepelabuhanan & penyimpanan, dan logistik.";

const baseUrl = "https://cdi-be.cmlabs.dev";

export const metadata: Metadata = {
  title: "Management and Organization Structure | Chandra Daya Investasi",
  description: description,
  keywords: [
    "Chandra Daya Investasi",
    "CDI",
    "CDIA",
    "PT Chandra Daya Investasi Tbk",
    "CDI Group",
  ],

  metadataBase: new URL(baseUrl),

  viewport: {
    width: "device-width",
    initialScale: 1.0,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/contact-us",
  },
  icons: {
    shortcut: "/assets/frontend/favicon.png",
  },

  openGraph: {
    title: "Chandra Daya Investasi",
    description: description,
    url: "/contact-us",
    type: "website",
    siteName: "Chandra Daya Investasi",
  },

  twitter: {
    card: "summary_large_image",
    title: "Chandra Daya Investasi",
    description: description,
  },

  other: {
    "application-url": "https://cdi-be.cmlabs.dev",
    "preview-url": "https://cdi-be.cmlabs.dev/file-storage",
    "download-file": "https://cdi-be.cmlabs.dev/file-download",
    "add-file-preview": "https://cdi-be.cmlabs.dev/file/preview",
    "add-file-download": "https://cdi-be.cmlabs.dev/file/download",
  },
};

export default async function Page({ params }: PageProps) {
  const t = await getTranslations("Media");
  const mediaData = await mediaService.getMediaPageData(params.locale);

  const article = mediaData.items.find((item) => item.slug === params.slug);

  if (!article) {
    notFound();
  }

  const title = params.locale === "id" ? article.title_id : article.title_en;
  const content =
    params.locale === "id" ? article.content_id : article.content_en;

  const breadcrumbs = [
    { href: `/${params.locale}`, label: "Home" },
    { href: `/${params.locale}/media/news`, label: t('News') },
  ];

  const shareUrl = encodeURIComponent(
    `https://cdi-be.cmlabs.dev/${params.locale}/media/news/${params.slug}`
  );

  return (
    <main>
      <NavbarThemeTrigger theme="light" />
      <NewsDetail
        breadcrumbs={breadcrumbs}
        articleTitle={title}
        publishDate={article.date}
        shareUrl={shareUrl}
        featureImageUrl={article.image}
        articleContent={content}
      />
      <NavbarThemeTrigger theme="light" />
      <RelatedPosts
        allArticles={mediaData.items}
        currentArticle={article}
        locale={params.locale}
      />
    </main>
  );
}
