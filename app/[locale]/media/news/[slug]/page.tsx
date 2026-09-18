import { cache } from "react";
// import { ArticleCarousel } from "@/components/features/homepage/ArticleCarousel";
import { NewsDetail } from "@/components/features/Media/Details/Detail";
import { RelatedPosts } from "@/components/features/Media/Details/RelatedPosts";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { mediaService } from "@/services/Media/MediaService";
// import { ArrowLeftCircleIcon } from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound, redirect } from "next/navigation";
import { cleanJsonLdString, buildArticleSchema, buildBreadcrumbSchema } from "@/lib/schema-org";
import JsonLd from "@/components/shared/JsonLd";
import { formatLocalizedDate, toISODateString } from "@/lib/dateUtils";

export type PageProps = {
  params: {
    slug: string;
    locale: string;
  };
};

const getArticleData = cache(async (slug: string, locale: string) => {
  // 1. Attempt direct detail fetch from backend
  const directArticle = await mediaService.getArticleDetail("news", slug, locale);
  const firstPageData = await mediaService.getMediaPageData(locale, 1);
  const relatedPosts = firstPageData?.items || [];

  if (directArticle) {
    return { article: directArticle, relatedPosts };
  }

  // 2. Search in first page of current locale
  let article = firstPageData?.items?.find(
    (item) =>
      item.slug === slug ||
      item.slug_id === slug ||
      item.slug_en === slug ||
      (item as unknown as { slug_en?: string }).slug_en === slug
  );

  if (article) {
    return { article, relatedPosts };
  }

  // 3. Search remaining pages of current locale
  const lastPage =
    (firstPageData as unknown as { meta?: { last_page?: number } })?.meta
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
          (item) =>
            item.slug === slug ||
            item.slug_id === slug ||
            item.slug_en === slug ||
            (item as unknown as { slug_en?: string }).slug_en === slug
        );
        if (article) {
          return { article, relatedPosts };
        }
      }
    }
  }

  // 4. Cross-locale fallback: check opposite locale in case URL was requested with the other language's slug
  const oppLocale = locale === "en" ? "id" : "en";
  const oppFirstPage = await mediaService.getMediaPageData(oppLocale, 1);
  article = oppFirstPage?.items?.find(
    (item) =>
      item.slug === slug ||
      item.slug_id === slug ||
      item.slug_en === slug ||
      (item as unknown as { slug_en?: string }).slug_en === slug
  );

  if (article) {
    return { article, relatedPosts };
  }

  const oppLastPage =
    (oppFirstPage as unknown as { meta?: { last_page?: number } })?.meta
      ?.last_page || 1;

  if (oppLastPage > 1) {
    const oppPromises = [];
    for (let i = 2; i <= oppLastPage; i++) {
      oppPromises.push(mediaService.getMediaPageData(oppLocale, i));
    }

    const oppRemainingPagesData = await Promise.all(oppPromises);

    for (const pageData of oppRemainingPagesData) {
      if (pageData && pageData.items) {
        article = pageData.items.find(
          (item) =>
            item.slug === slug ||
            item.slug_id === slug ||
            item.slug_en === slug ||
            (item as unknown as { slug_en?: string }).slug_en === slug
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
    params.locale === "id"
      ? article.title_id || article.title_en
      : article.title_en || article.title_id;

  const articleDesc =
    params.locale === "id"
      ? article?.meta_tag_id?.description || article?.meta_tag?.description || ""
      : article?.meta_tag?.description || article?.meta_tag_id?.description || "";

  const title = `${articleTitle} | Chandra Daya Investasi`;
  const description = articleDesc;
  const imageUrl = article.image || "/assets/frontend/favicon.png";

  const baseUrl = (
    process.env.NEXT_PUBLIC_URL_LP ||
    process.env.NEXT_PUBLIC_URL ||
    "https://chandradaya-investasi.com"
  ).replace(/\/+$/, "");

  const enSlug = article.slug_en || article.slug || article.slug_id || params.slug;
  const idSlug = article.slug_id || article.slug_en || article.slug || params.slug;

  const enUrl = `${baseUrl}/en/media/news/${enSlug}`;
  const idUrl = `${baseUrl}/id/media/news/${idSlug}`;
  const currentUrl = params.locale === "id" ? idUrl : enUrl;

  const keyword =
    params.locale === "id"
      ? article?.meta_tag_id?.keyword || article?.meta_tag?.keyword || ""
      : article?.meta_tag?.keyword || article?.meta_tag_id?.keyword || "";

  return {
    title: title,
    description: description,
    metadataBase: new URL(`${baseUrl}/${params.locale}`),

    keywords: [
      "Chandra Daya Investasi",
      "CDI",
      "CDIA",
      "PT Chandra Daya Investasi Tbk",
      "CDI Group",
      keyword,
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
        en: enUrl,
        id: idUrl,
        "x-default": enUrl,
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
          alt:
            params.locale === "id"
              ? article?.thumbnail_alt_id || article?.thumbnail_alt || article?.thumbnail_alt_en || articleTitle
              : article?.thumbnail_alt_en || article?.thumbnail_alt || article?.thumbnail_alt_id || articleTitle,
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
      ...(article?.date ? { "article:published_time": toISODateString(article.date) || article.date } : {}),
      ...(article?.updated_at ? { "article:modified_time": toISODateString(article.updated_at) || article.updated_at } : {}),
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

  // Canonical slug redirect check: if the URL slug does not match the current locale's expected slug, redirect
  const expectedSlug =
    params.locale === "id"
      ? article.slug_id || article.slug_en || article.slug
      : article.slug_en || article.slug || article.slug_id;

  if (expectedSlug && params.slug !== expectedSlug) {
    redirect(`/${params.locale}/media/news/${expectedSlug}`);
  }

  const title = params.locale === "id" ? article.title_id || article.title_en : article.title_en || article.title_id;
  const content =
    params.locale === "id" ? article.content_id || article.content_en : article.content_en || article.content_id;

  const breadcrumbs = [
    { href: `/`, label: "Home" },
    { href: `/media/news`, label: t("News") },
  ];

  const baseUrl = (
    process.env.NEXT_PUBLIC_URL_LP ||
    process.env.NEXT_PUBLIC_URL ||
    "https://chandradaya-investasi.com"
  ).replace(/\/+$/, "");
  const canonicalSlug = expectedSlug || params.slug;
  const shareUrl = `${baseUrl}/${params.locale}/media/news/${canonicalSlug}`;

  const thumbnailAlt =
    params.locale === "id"
      ? article.thumbnail_alt_id || article.thumbnail_alt || article.thumbnail_alt_en || title
      : article.thumbnail_alt_en || article.thumbnail_alt || article.thumbnail_alt_id || title;

  return (
    <main>
      <NavbarThemeTrigger theme="light" />
      <NewsDetail
        breadcrumbs={breadcrumbs}
        articleTitle={title}
        publishDate={formatLocalizedDate(article.date, params.locale)}
        rawPublishDate={toISODateString(article.date) || article.date || ''}
        updatedDate={formatLocalizedDate(article.updated_at, params.locale)}
        rawUpdatedDate={toISODateString(article.updated_at) || article.updated_at || ''}
        shareUrl={shareUrl}
        featureImageUrl={article.image}
        featureImageAlt={thumbnailAlt}
        articleContent={content}
        references={article.references || article.sources}
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
            datePublished: toISODateString(article.date) || article.created_at || '',
            dateModified: toISODateString(article.updated_at) || toISODateString(article.date) || article.created_at || '',
            url: `${baseUrl}/${params.locale}/media/news/${canonicalSlug}`
          })} />
          <JsonLd data={buildBreadcrumbSchema([
            { name: 'Home', item: `${baseUrl}/${params.locale}` },
            { name: t("News"), item: `${baseUrl}/${params.locale}/media/news` },
            { name: title, item: `${baseUrl}/${params.locale}/media/news/${canonicalSlug}` }
          ])} />
        </>
      )}
    </main>
  );
}
