import { NewsDetail } from "@/components/features/Media/Details/Detail";
import { RelatedPosts } from "@/components/features/Media/Details/RelatedPosts";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { mediaService } from "@/services/Media/MediaService";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import { cleanJsonLdString, buildArticleSchema, buildBreadcrumbSchema } from "@/lib/schema-org";
import JsonLd from "@/components/shared/JsonLd";
import { formatLocalizedDate, toISODateString } from "@/lib/dateUtils";

export type PageProps = {
  params: {
    slug: string;
    locale: string;
  };
};

const getArticleBySlug = cache(async (slug: string, locale?: string) => {
  // 1. Attempt direct detail fetch from backend
  const directArticle = await mediaService.getArticleDetail("blog", slug, locale);
  if (directArticle) {
    return directArticle;
  }

  // 2. Search in first page of current locale
  const firstPageData = await mediaService.getMediaBlogPageData(1, locale);
  let article = firstPageData?.items?.find(
    (item) =>
      item.slug === slug ||
      item.slug_id === slug ||
      item.slug_en === slug ||
      (item as unknown as { slug_en?: string }).slug_en === slug
  );
  
  if (article) return article;

  // 3. Search remaining pages of current locale
  const lastPage =
    firstPageData?.meta?.last_page ||
    Math.ceil((firstPageData?.meta?.total || 0) / (firstPageData?.meta?.per_page || 15));

  if (lastPage > 1) {
    const promises = [];
    for (let i = 2; i <= lastPage; i++) {
      promises.push(mediaService.getMediaBlogPageData(i, locale));
    }
    
    const results = await Promise.all(promises);

    for (const res of results) {
      if (res?.items) {
        article = res.items.find(
          (item) =>
            item.slug === slug ||
            item.slug_id === slug ||
            item.slug_en === slug ||
            (item as unknown as { slug_en?: string }).slug_en === slug
        );
        if (article) return article;
      }
    }
  }

  // 4. Cross-locale fallback search
  const oppLocale = locale === "en" ? "id" : "en";
  const oppFirstPage = await mediaService.getMediaBlogPageData(1, oppLocale);
  article = oppFirstPage?.items?.find(
    (item) =>
      item.slug === slug ||
      item.slug_id === slug ||
      item.slug_en === slug ||
      (item as unknown as { slug_en?: string }).slug_en === slug
  );

  if (article) return article;

  const oppLastPage =
    oppFirstPage?.meta?.last_page ||
    Math.ceil((oppFirstPage?.meta?.total || 0) / (oppFirstPage?.meta?.per_page || 15));

  if (oppLastPage > 1) {
    const oppPromises = [];
    for (let i = 2; i <= oppLastPage; i++) {
      oppPromises.push(mediaService.getMediaBlogPageData(i, oppLocale));
    }

    const oppResults = await Promise.all(oppPromises);

    for (const res of oppResults) {
      if (res?.items) {
        article = res.items.find(
          (item) =>
            item.slug === slug ||
            item.slug_id === slug ||
            item.slug_en === slug ||
            (item as unknown as { slug_en?: string }).slug_en === slug
        );
        if (article) return article;
      }
    }
  }

  return null;
});

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug, params.locale);

  if (!article) {
    return {
      title: "Blog Not Found | Chandra Daya Investasi",
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

  const enUrl = `${baseUrl}/en/media/blog/${enSlug}`;
  const idUrl = `${baseUrl}/id/media/blog/${idSlug}`;
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
      ...(article?.date ? { "article:published_time": toISODateString(article.date) || article.date } : {}),
      ...(article?.updated_at ? { "article:modified_time": toISODateString(article.updated_at) || article.updated_at } : {}),
    },
  };
}

export default async function Page({ params }: PageProps) {
  const t = await getTranslations("Media");

  const article = await getArticleBySlug(params.slug, params.locale);

  if (!article) {
    notFound();
  }

  // Canonical slug redirect check: if the URL slug does not match the current locale's expected slug, redirect
  const expectedSlug =
    params.locale === "id"
      ? article.slug_id || article.slug_en || article.slug
      : article.slug_en || article.slug || article.slug_id;

  if (expectedSlug && params.slug !== expectedSlug) {
    redirect(`/${params.locale}/media/blog/${expectedSlug}`);
  }

  const title = params.locale === "id" ? article.title_id || article.title_en : article.title_en || article.title_id;
  const content =
    params.locale === "id" ? article.content_id || article.content_en : article.content_en || article.content_id;

  const breadcrumbs = [
    { href: `/`, label: "Home" },
    { href: `/media/news?tab=blog`, label: t("blog") },
  ];

  const baseUrl = (
    process.env.NEXT_PUBLIC_URL_LP ||
    process.env.NEXT_PUBLIC_URL ||
    "https://chandradaya-investasi.com"
  ).replace(/\/+$/, "");
  const canonicalSlug = expectedSlug || params.slug;
  const shareUrl = `${baseUrl}/${params.locale}/media/blog/${canonicalSlug}`;

  const firstPageBlogData = await mediaService.getMediaBlogPageData(1, params.locale);

  return (
    <main>
      <NavbarThemeTrigger theme="light" />
      <NewsDetail
        breadcrumbs={breadcrumbs}
        articleTitle={title}
        publishDate={formatLocalizedDate(article.date, params.locale)}
        rawPublishDate={toISODateString(article.date) || article.date || ""}
        updatedDate={formatLocalizedDate(article.updated_at, params.locale)}
        rawUpdatedDate={toISODateString(article.updated_at) || article.updated_at || ""}
        shareUrl={shareUrl}
        featureImageUrl={article.image}
        articleContent={content}
        references={article.references || article.sources}
      />
      <NavbarThemeTrigger theme="light" />
      <RelatedPosts
        allArticles={firstPageBlogData?.items || []}
        currentArticle={article}
        locale={params.locale}
        type="blog"
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
            url: `${baseUrl}/${params.locale}/media/blog/${canonicalSlug}`
          })} />
          <JsonLd data={buildBreadcrumbSchema([
            { name: 'Home', item: `${baseUrl}/${params.locale}` },
            { name: t("blog"), item: `${baseUrl}/${params.locale}/media/blog` },
            { name: title, item: `${baseUrl}/${params.locale}/media/blog/${canonicalSlug}` }
          ])} />
        </>
      )}
    </main>
  );
}