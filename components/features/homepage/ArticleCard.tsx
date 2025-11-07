"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

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

  return (
    <Link
      href={href}
      className="group flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden h-full text-gray-800 shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <div className="w-full aspect-video overflow-hidden relative">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-400 ease-in-out group-hover:scale-110"  
        />
      </div>

      <div className="p-6 flex flex-col grow">
        <div className="flex items-center gap-4 mb-4">
          <span className="bg-gray-100 px-3 py-1 text-sm rounded-full text-[#2474A5] font-medium">
            {category}
          </span>
          <span className="text-sm text-gray-500">{date}</span>
        </div>

        <h3 className="text-lg font-medium mb-4 line-clamp-3 flex-grow">
          {title}
        </h3>

        <div className="text-[#2474A5] flex items-center gap-2 mt-auto text-sm font-medium">
          Read full article <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
};