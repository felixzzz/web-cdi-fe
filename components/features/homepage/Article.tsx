"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArticleCarousel } from "./ArticleCarousel";
import { ApiArticle } from "@/types/Homepage/home";

interface ArticleProps {
  articles: ApiArticle[];
}

export const Article: React.FC<ArticleProps> = ({ articles }) => {
  const dynamicCategories = [
    "All",
    ...Array.from(new Set(articles.map((article) => article.category_name))),
  ];

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredArticles = articles.filter((article) =>
    activeCategory === "All" ? true : article.category_name === activeCategory
  );

  return (
    <section
      data-navbar-theme="light"
      className="py-20 bg-white"
      aria-labelledby="article-section-title"
    >
      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
        <div className="flex lg:items-center justify-between mb-2 flex-col md:flex-row">
          <div>
            <p className="text-neutral-500 text-base mb-4">LATEST ARTICLE</p>
            <h2
              id="article-section-title"
              className="text-neutral-900 font-medium text-4xl lg:text-[28px] mb-0 max-w-sm"
            >
              Discover the latest from the energy industry
            </h2>
          </div>
          <div className="flex items-center gap-4 justify-start lg:justify-center mt-4 lg:mt-0">
            <Link
              href="/media/news"
              className="py-2 rounded-full whitespace-nowrap flex items-center gap-2 text-[#2474A5] font-medium"
            >
              See All <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <nav
          aria-label="Article categories"
          className="flex items-center gap-2 mt-10 mb-6 overflow-y-auto"
        >
          <ul className="flex items-center gap-2">
            {dynamicCategories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => setActiveCategory(category)}
                  className={`text-xs lg:text-base cursor-pointer px-6 py-2 rounded-full whitespace-nowrap flex items-center gap-2 transition
                    ${
                      activeCategory === category
                        ? "bg-[#2474A5] text-white border border-[#2474A5]"
                        : "text-[#2474A5] border border-gray-300 hover:bg-blue-50"
                    }
                  `}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <ArticleCarousel key={activeCategory} articles={filteredArticles} />
      </div>
    </section>
  );
};