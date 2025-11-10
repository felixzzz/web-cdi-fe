import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

interface ArticleCardProps {
  href: string;
  imageUrl: string;
  category: string;
  date: string;
  title: string;
  locale: string;
}

export const ArticleCard = ({
  href,
  imageUrl,
  category,
  date,
  title,
  locale,
}: ArticleCardProps) => {
  const readMoreText =
    locale === "id" ? "Baca artikel selengkapnya" : "Read full article";

  return (
    <Link
      href={href}
      className="flex bg-white rounded-xl shadow-article border border-neutral-5 overflow-hidden h-full group"
    >
      <article className="flex flex-col text-neutral-13 w-full">
        <div className="w-full aspect-square overflow-hidden">
          <div className="relative w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110">
            <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
          </div>
        </div>
        <div className="p-6 flex flex-col grow">
          <div className="flex items-center gap-4">
            <span className="bg-neutral-300 px-3 py-1 text-sm rounded-full">
              {category}
            </span>
            <span className="text-sm text-neutral-10">{date}</span>
          </div>
          <h3 className="text-[22px] font-medium mt-4 mb-7 line-clamp-3 grow">
            {title}
          </h3>
          <div className="text-[#2474A5] flex items-center gap-2 cursor-pointer mt-auto">
            {readMoreText} <ChevronRight className="text-2xl" />
          </div>
        </div>
      </article>
    </Link>
  );
};