import { NewsDetail } from "@/components/features/Media/Details/Detail";
import { RelatedPosts } from "@/components/features/Media/Details/RelatedPosts";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { mediaService } from "@/services/Media/MediaService";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export type PageProps = {
  params: {
    slug: string;
    locale: string;
  };
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
