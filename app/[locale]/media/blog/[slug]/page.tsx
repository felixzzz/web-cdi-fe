import { NewsDetail } from "@/components/features/Media/Details/Detail";
import { RelatedPosts } from "@/components/features/Media/Details/RelatedPosts";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { mediaService } from "@/services/Media/MediaService";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";

export type PageProps = {
  params: {
    slug: string;
    locale: string;
  };
};

const getArticleBySlug = cache(async (slug: string) => {
  const firstPageData = await mediaService.getMediaBlogPageData(1);
  if (!firstPageData?.items) return null;

  let article = firstPageData.items.find(
    (item) => item.slug === slug || item.slug_id === slug,
  );
  
  if (article) return article;

  const lastPage = firstPageData.meta?.last_page || Math.ceil((firstPageData.meta?.total || 0) / (firstPageData.meta?.per_page || 15));

  if (lastPage > 1) {
    const promises = [];
    for (let i = 2; i <= lastPage; i++) {
      promises.push(mediaService.getMediaBlogPageData(i));
    }
    
    const results = await Promise.all(promises);

    for (const res of results) {
      if (res?.items) {
        article = res.items.find(
          (item) => item.slug === slug || item.slug_id === slug,
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
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const articleTitle =
    params.locale === "id" ? article.title_id : article.title_en;

  const articleDesc =
    params.locale === "id"
      ? article?.meta_tag_id?.description
      : article?.meta_tag?.description;

  const title = `${articleTitle} | Chandra Daya Investasi`;
  const description = articleDesc || "";
  const imageUrl = article.image || "/assets/frontend/favicon.png";

  const pagePath = `/media/blog/${params.slug}`;

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
    },
  };
}

export default async function Page({ params }: PageProps) {
  const t = await getTranslations("Media");

  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const expectedSlug = params.locale === "en" ? article.slug : article.slug_id;

  if (params.slug !== expectedSlug) {
    redirect(`/${params.locale}/media/blog/${expectedSlug}`);
  }

  const title = params.locale === "id" ? article.title_id : article.title_en;
  const content =
    params.locale === "id" ? article.content_id : article.content_en;

  const breadcrumbs = [
    { href: `/`, label: "Home" },
    { href: `/media/news`, label: t("blog") },
  ];

  const shareUrl = encodeURIComponent(
    `${process.env.NEXT_PUBLIC_URL}/${params.locale}/media/blog/${params.slug}`,
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

  const firstPageBlogData = await mediaService.getMediaBlogPageData(1);

  return (
    <main>
      <NavbarThemeTrigger theme="light" />
      <NewsDetail
        breadcrumbs={breadcrumbs}
        articleTitle={title}
        publishDate={formatDatePublish(article.date)}
        shareUrl={shareUrl}
        featureImageUrl={article.image}
        articleContent={content}
      />
      <NavbarThemeTrigger theme="light" />
      <RelatedPosts
        allArticles={firstPageBlogData?.items || []}
        currentArticle={article}
        locale={params.locale}
        type="blog"
      />
    </main>
  );
}