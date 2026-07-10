"use client";

import { Link } from "@/i18n/navigation";
import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

export interface ArticleCardProps {
  href: string;
  imageUrl: string;
  category: string;
  date: string;
  title: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  href,
  imageUrl,
  category,
  date,
  title,
}) => {
  const t = useTranslations('Media')

  return (
    <Link
    title={title}
      href={href}
      className="group flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden h-full text-gray-800 duration-300"
    >
      <div className="w-full aspect-square overflow-hidden relative">
        <Image
          src={imageUrl}
          alt={title}
          title={title}
          fill
          className="object-cover transition-transform duration-400 ease-in-out group-hover:scale-110"
        />
      </div>

      <div className="p-6 flex flex-col grow">
        <div className="flex items-center gap-4 mb-4">
          <span className="bg-gray-300 px-3 py-1 text-sm rounded-full text-neutral-900 font-medium">
            {category}
          </span>
          <span className="text-sm text-gray-500">{date}</span>
        </div>

        <h3 className="text-2xl lg:text-3xl font-medium mb-4 line-clamp-3 flex-grow">
          {title}
        </h3>

        <div className="text-[#2474A5] flex items-center gap-2 mt-auto text-md font-medium">
          {t('read_full')} <ChevronRight size={20} />
        </div>
      </div>
    </Link>
  );
};