"use client";

import { Link } from "@/i18n/navigation";
import { ChevronRight, ImageOff } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatLocalizedDate } from "@/lib/dateUtils";

interface ArticleCardProps {
  href: string;
  imageUrl: string;
  imageAlt?: string;
  category: string;
  date: string;
  title: string;
  locale: string;
}

export const ArticleCard = ({
  href,
  imageUrl,
  imageAlt,
  category,
  date,
  title,
  locale,
}: ArticleCardProps) => {
  const readMoreText =
    locale === "id" ? "Baca artikel selengkapnya" : "Read full article";

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [imageUrl]);

  return (
    <Link
      title={title}
      href={href}
      className="flex flex-col bg-white rounded-xl shadow-article border border-neutral-5 overflow-hidden h-full group"
    >
      <article className="flex flex-col text-neutral-13 w-full h-full">
        <div className="w-full aspect-video overflow-hidden shrink-0">
          <div className="relative w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110">
            {!imageUrl || hasError ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400 gap-2">
                <ImageOff size={48} strokeWidth={1.5} />
              </div>
            ) : (
              <Image
                src={imageUrl}
                alt={imageAlt || title}
                fill
                className="object-cover"
                onError={() => setHasError(true)}
              />
            )}
            {/* <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" /> */}
          </div>
        </div>
        <div className="p-6 flex flex-col grow">
          <div className="flex items-center gap-4 min-h-[32px]">
            {category && (
              <span className="bg-neutral-300 px-3 py-1 text-sm rounded-full">
                {category}
              </span>
            )}
            <span className="text-sm text-neutral-10">{formatLocalizedDate(date, locale)}</span>
          </div>
          <h3 className="text-[22px] leading-snug font-medium mt-4 mb-7 line-clamp-3 min-h-[5rem] lg:min-h-[5.25rem]">
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
