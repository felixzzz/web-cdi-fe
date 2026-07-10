import { cache } from "react";
// import { ArticleCarousel } from "@/components/features/homepage/ArticleCarousel";
import { NewsDetail } from "@/components/features/Media/Details/Detail";
import { RelatedPosts } from "@/components/features/Media/Details/RelatedPosts";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { mediaService } from "@/services/Media/MediaService";
// import { ArrowLeftCircleIcon } from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { cleanJsonLdString, buildArticleSchema, buildBreadcrumbSchema } from "@/lib/schema-org";
import JsonLd from "@/components/shared/JsonLd";

export type PageProps = {
  params: {
    slug: string;
    locale: string;
  };
};

const getArticleData = cache(async (slug: string, locale: string) => {
  const firstPageData = await mediaService.getMediaPageData(locale, 1);
  let article = firstPageData.items.find(
    (item) => item.slug === slug || item.slug_id === slug,
  );

  const relatedPosts = firstPageData.items;

  if (article) {
    return { article, relatedPosts };
  }

  const lastPage =
    (firstPageData as unknown as { meta?: { last_page?: number } }).meta
      ?.last_page || 1;

  if (lastPage > 1) {
    const promises = [];
    for (let i = 2; i <= lastPage; i++) {
      promises.push(mediaService.getMediaPageData(locale, i));
    }

    const remainingPagesData = await Promise.all(promises);

    for (const pageData of remainingPagesData) {
      if (pageData && pageData.items) {
        article = pageData.items.find(
          (item) => item.slug === slug || item.slug_id === slug,
        );
        if (article) {
          return { article, relatedPosts };
        }
      }
    }
  }

  return { article: null, relatedPosts };
});

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { article } = await getArticleData(params.slug, params.locale);

  if (!article) {
    return {
      title: "News Not Found | Chandra Daya Investasi",
    };
  }

  const articleTitle =
    params.locale === "id" ? article.title_id : article.title_en;

  const title = `${articleTitle} | Chandra Daya Investasi`;
  const description = article?.meta_tag?.description || "";
  const imageUrl = article.image || "/assets/frontend/favicon.png";

  const pagePath = `/media/news/${params.slug}`;
  const baseUrl = process.env.NEXT_PUBLIC_URL_LP || "http://localhost:3000";

  const getCanonicalPath = (lang: string) => {
    return `${baseUrl}/${lang}${pagePath}`;
  };

  const currentUrl = getCanonicalPath(params.locale);

  return {
    title: title,
    description: description,
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL_LP}/${params.locale}`),

    keywords: [
      "Chandra Daya Investasi",
      "CDI",
      "CDIA",
      "PT Chandra Daya Investasi Tbk",
      "CDI Group",
      article?.[`meta_tag${params.locale === "id" ? "_id" : ""}`]?.keyword ||
        "",
    ],

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    alternates: {
      canonical: currentUrl,
      languages: {
        en: getCanonicalPath("en"),
        id: getCanonicalPath("id"),
        "x-default": getCanonicalPath("en"),
      },
    },

    openGraph: {
      title: title,
      description: description,
      url: currentUrl,
      siteName: "Chandra Daya Investasi",
      locale: params.locale,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: articleTitle,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [imageUrl],
    },

    other: {
      "application-url": `${process.env.NEXT_PUBLIC_BASE_URL}`,
      "preview-url": `${process.env.NEXT_PUBLIC_BASE_URL}/file-storage`,
      "download-file": `${process.env.NEXT_PUBLIC_BASE_URL}/file-download`,
      "add-file-preview": `${process.env.NEXT_PUBLIC_BASE_URL}/file/preview`,
      "add-file-download": `${process.env.NEXT_PUBLIC_BASE_URL}/file/download`,
      // Article date signals for SEO
      ...(article?.date ? { "article:published_time": article.date } : {}),
      ...(article?.updated_at ? { "article:modified_time": article.updated_at } : {}),
    },
  };
}

export default async function Page({ params }: PageProps) {
  const t = await getTranslations("Media");

  const { article, relatedPosts } = await getArticleData(
    params.slug,
    params.locale,
  );

  if (!article) {
    notFound();
  }

  const title = params.locale === "id" ? article.title_id : article.title_en;
  const content =
    params.locale === "id" ? article.content_id : article.content_en;

  const breadcrumbs = [
    { href: `/`, label: "Home" },
    { href: `/media/news`, label: t("News") },
  ];

  const shareUrl = encodeURIComponent(
    `${process.env.NEXT_PUBLIC_URL}/${params.locale}/media/news/${params.slug}`,
  );

  const formatDatePublish = (dateString?: string) => {
    if (!dateString) return dateString ?? "";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return dateString;
    }

    return new Intl.DateTimeFormat(params.locale === "id" ? "id-ID" : "en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <main>
      <NavbarThemeTrigger theme="light" />
      <NewsDetail
        breadcrumbs={breadcrumbs}
        articleTitle={title}
        publishDate={formatDatePublish(article.date)}
        rawPublishDate={article.date || ''}
        updatedDate={formatDatePublish(article.updated_at)}
        rawUpdatedDate={article.updated_at || ''}
        shareUrl={shareUrl}
        featureImageUrl={article.image}
        articleContent={content}
      />
      <NavbarThemeTrigger theme="light" />
      <RelatedPosts
        allArticles={relatedPosts}
        currentArticle={article}
        locale={params.locale}
        type="news"
      />
      {/* JSON-LD Structured Data Schema Markup */}
      {cleanJsonLdString(article.json_ld) ? (
        <JsonLd data={cleanJsonLdString(article.json_ld)!} />
      ) : (
        <>
          <JsonLd data={buildArticleSchema({
            headline: title,
            imageUrl: article.image || undefined,
            datePublished: article.date || article.created_at || '',
            dateModified: article.updated_at || article.date || article.created_at || '',
            url: `${process.env.NEXT_PUBLIC_URL_LP || 'https://chandradaya-investasi.com'}/${params.locale}/media/news/${params.slug}`
          })} />
          <JsonLd data={buildBreadcrumbSchema([
            { name: 'Home', item: `${process.env.NEXT_PUBLIC_URL_LP || 'https://chandradaya-investasi.com'}/${params.locale}` },
            { name: t("News"), item: `${process.env.NEXT_PUBLIC_URL_LP || 'https://chandradaya-investasi.com'}/${params.locale}/media/news` },
            { name: title, item: `${process.env.NEXT_PUBLIC_URL_LP || 'https://chandradaya-investasi.com'}/${params.locale}/media/news/${params.slug}` }
          ])} />
        </>
      )}
    </main>
  );
}
