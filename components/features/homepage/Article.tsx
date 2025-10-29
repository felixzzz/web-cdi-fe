"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArticleCardProps } from "./ArticleCard";
import { ArticleCarousel } from "./ArticleCarousel";

const categories = ["All", "Sustainability", "Awards", "Corporate"];

const allArticles: ArticleCardProps[] = [
  {
    href: "/media/news/...",
    imageUrl:
      "https://chandradaya-investasi.com/file-storage/SGJlVFhrK3dxUHJOY1htSDFZNnY5WWE5YjZWQUVTVngyQUxzTzA2WERWUW44SUUwdk9WOUxvMjFVSXc5SFozQ2Q0anIvZDVlbnNJb2pXQXlKZXo4elE9PQ.webp",
    category: "Corporate",
    date: "07-10-2025",
    title: "CDI Group Expands Solar Power Portfolio to 11 MWp by November 2025",
  },
  {
    href: "/media/news/...",
    imageUrl:
      "https://chandradaya-investasi.com/file-storage/aUgvQU5nbHVRVGh6MDdpbllIMkhmd25TU3RKbGtUd3BoTzU1anNGNzhYTGFsd1oxTmFJUEJHSVpPa2d2RmpUaWpVMW8rNTZoalZ2T01Vd1FTWjd1RTF6dUJqcU9RbFZRNXMzMmM3N1VuL0U9.webp",
    category: "Corporate",
    date: "25-09-2025",
    title:
      "Chandra Daya Investasi Affirms No Plans for ExxonMobil Indonesia Acquisition",
  },
  {
    href: "/media/news/...",
    imageUrl:
      "https://chandradaya-investasi.com/file-storage/MVMrdDAxSlYxaTFRanBMU29hMUdWczUwd2s3VVNlQ2twcEpuN2lLWnIySVI4Y3U2Rjl6RG9CdXVSTm51eGN0MEFZemZKNkhSSnQyTXQ0WklaLzNCQURoSjVDVEJiaTZQenVvWjg0alI2U2t4WG9sSTdkVXhSNTVyTFZLTkRqOHM.webp",
    category: "Sustainability",
    date: "30-06-2025",
    title:
      "KCE Explores Hydrogen Power Plant Study with HDF Energy and Air Liquide",
  },
];

export const Article = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredArticles = allArticles.filter((article) =>
    activeCategory === "All" ? true : article.category === activeCategory
  );

  return (
    <section data-navbar-theme="light" className="py-20 bg-white" aria-labelledby="article-section-title">
      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
        {/* ... (kode lain tidak berubah) */}
        <div className="flex lg:items-center justify-between mb-2 flex-col lg:flex-row">
          <div>
            <p className="text-neutral-7 text-base mb-4">LATEST ARTICLE</p>
            <h2
              id="article-section-title"
              className="text-neutral-13 font-medium text-2xl lg:text-[28px] mb-0 max-w-sm"
            >
              Discover the latest from the energy industry
            </h2>
          </div>
          <div className="flex items-center gap-4 justify-start lg:justify-center mt-4 lg:mt-0">
            <Link
              href="/media/news"
              className="py-2 rounded-full whitespace-nowrap flex items-center gap-2 text-blue-base"
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
            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => setActiveCategory(category)}
                  className={`text-xs lg:text-base cursor-pointer px-6 py-2 rounded-full whitespace-nowrap flex items-center gap-2 text-blue-base border border-blue-base transition
                    ${
                      activeCategory === category
                        ? "bg-blue-base text-white"
                        : "hover:bg-blue-base hover:text-white"
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
