import { NewsDetail } from "@/components/features/Media/Details/Detail";
import { RelatedPosts } from "@/components/features/Media/Details/RelatedPosts";
import { mediaService } from "@/services/Media/MediaService";
import { notFound } from "next/navigation";

export type PageProps = {
  params: {
    slug: string;
    locale: string;
  };
};

export default async function Page({ params }: PageProps) {
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
    { href: `/${params.locale}/media/news`, label: "Berita" },
  ];

  const shareUrl = encodeURIComponent(
    `https://chandradaya-investasi.com/${params.locale}/media/news/${params.slug}`
  );

  return (
    <>
      <NewsDetail
        breadcrumbs={breadcrumbs}
        articleTitle={title}
        publishDate={article.date}
        shareUrl={shareUrl}
        featureImageUrl={article.image}
        articleContent={content}
      />
      <RelatedPosts
        allArticles={mediaData.items}
        currentArticle={article}
        locale={params.locale}
      />
    </>
  );
}
