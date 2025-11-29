import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArticleItem } from "@/types/Media/Media";
import { ArticleCard } from "./ArticleCard";

interface RelatedPostsProps {
  allArticles: ArticleItem[];
  currentArticle: ArticleItem;
  locale: string;
}

export const RelatedPosts = ({
  allArticles,
  currentArticle,
  locale,
}: RelatedPostsProps) => {
  const relatedArticles = allArticles
    .filter(
      (item) =>
        item.article_category_id === currentArticle.article_category_id &&
        item.id !== currentArticle.id
    )
    .slice(0, 3); 

  if (relatedArticles.length === 0) {
    return null;
  }

  const seeAllText = locale === "id" ? "Lihat Semua" : "See All";
  const titleText = locale === "id" ? "Postingan terkait" : "Related posts";

  return (
    <div className="pb-28 pt-12 bg-white">
      <section className="container mx-auto px-4 md:px-4 lg:px-20 xl:px-44 2xl:px-44">
        <p className="capitalize text-neutral-7 mb-4">News</p>
        <div className="flex md:items-center justify-between mb-10 flex-col md:flex-row">
          <div>
            <p className="text-neutral-13 font-medium text-2xl md:text-[38px] md:leading-[44px]">
              {titleText}
            </p>
          </div>
          <div className="flex items-center gap-4 justify-start md:justify-center max-lg:mt-4 text-[#2474A5]">
            <Link
              className="py-2 rounded-full whitespace-nowrap flex items-center gap-2 text-blue-base"
              href={`/${locale}/media/news`}
            >
              {seeAllText} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map((article) => (
            <ArticleCard
              key={article.id}
              locale={locale}
              href={`/${locale}/media/news/${article.slug}`}
              imageUrl={article.image}
              category={
                locale === "id"
                  ? article.article_category.name_id
                  : article.article_category.name_en
              }
              date={article.date}
              title={locale === "id" ? article.title_id : article.title_en}
            />
          ))}
        </div>
      </section>
    </div>
  );
};