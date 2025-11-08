"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { clsx } from "clsx";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  NewsApiResponse,
  PressReleaseApiResponse,
  ArticleItem,
  PressReleaseItem,
} from "@/types/Media/Media";

interface NewsProps {
  mediaData: NewsApiResponse;
  pressReleaseData: PressReleaseApiResponse;
}

const ITEMS_PER_PAGE = 6;
const FILE_STORAGE_URL = "https://chandradaya-investasi.com/file-storage/";

export function News({ mediaData, pressReleaseData }: NewsProps) {
  const [activeTab, setActiveTab] = useState("news");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);

  const newsCategories = useMemo(() => {
    const allNewsCategories = mediaData.items.map(
      (item) => item.article_category.name_id
    );
    return ["Semua", ...Array.from(new Set(allNewsCategories))];
  }, [mediaData]);

  const categories = activeTab === "news" ? newsCategories : ["Semua"];

  const { paginatedArticles, totalNewsPages, totalNewsItems } = useMemo(() => {
    const filteredByCategory =
      activeCategory === "Semua"
        ? mediaData.items
        : mediaData.items.filter(
            (item) => item.article_category.name_id === activeCategory
          );

    const total = filteredByCategory.length;
    const pages = Math.ceil(total / ITEMS_PER_PAGE);
    const paginated = filteredByCategory.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

    return {
      paginatedArticles: paginated,
      totalNewsPages: pages,
      totalNewsItems: total,
    };
  }, [activeCategory, currentPage, mediaData.items]);

  const { paginatedPressReleases, totalPressPages, totalPressItems } =
    useMemo(() => {
      const allPressReleases = pressReleaseData.items;

      const total = allPressReleases.length;
      const pages = Math.ceil(total / ITEMS_PER_PAGE);
      const paginated = allPressReleases.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      );

      return {
        paginatedPressReleases: paginated,
        totalPressPages: pages,
        totalPressItems: total,
      };
    }, [currentPage, pressReleaseData.items]);

  const totalPages = activeTab === "news" ? totalNewsPages : totalPressPages;
  const totalItems = activeTab === "news" ? totalNewsItems : totalPressItems;

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setActiveCategory("Semua");
    setCurrentPage(1);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <section
      id="content-media-section"
      className="container mx-auto px-4 md:px-8 lg:px-20 2xl:px-44 py-20 bg-white"
    >
      <nav className="grid grid-cols-2">
        <button
          onClick={() => handleTabClick("news")}
          className={clsx(
            "border-b-2 text-neutral-13 text-lg text-center p-4 hover:border-b-[#2474A5] hover:border-b-4 hover:font-medium transition",
            activeTab === "news"
              ? "border-b-4 !border-b-[#2474A5] font-medium"
              : "border-b-neutral-6"
          )}
        >
          News
        </button>
        <button
          onClick={() => handleTabClick("press-release")}
          className={clsx(
            "border-b-2 text-neutral-13 text-lg text-center p-4 hover:border-b-[#2474A5] hover:border-b-4 hover:font-medium transition",
            activeTab === "press-release"
              ? "border-b-4 !border-b-[#2474A5] font-medium"
              : "border-b-neutral-6"
          )}
        >
          Press Release
        </button>
      </nav>

      <nav className="flex items-center gap-2 mt-10 mb-6 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={clsx(
              "text-xs md:text-base cursor-pointer px-6 py-2 rounded-full whitespace-nowrap flex items-center gap-2 text-[#2474A5] border border-[#2474A5] hover:bg-[#2474A5] hover:text-white transition",
              activeCategory === category && "bg-[#2474A5] text-white"
            )}
            style={{
              display:
                activeTab === "press-release" && categories.length === 1
                  ? "none"
                  : "flex",
            }}
          >
            {category}
          </button>
        ))}
      </nav>

      {activeTab === "news" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {paginatedArticles.map((article: ArticleItem) => (
            <ArticleCard
              key={article.id}
              href={`/media/news/${article.slug}`}
              imageUrl={article.image}
              category={article.article_category.name_id}
              date={article.date}
              title={article.title_id}
            />
          ))}
        </div>
      )}

      {activeTab === "press-release" && (
        <ul className="flex flex-col">
          {paginatedPressReleases.map((press: PressReleaseItem) => (
            <PressReleaseCard key={press.id} item={press} />
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          onPageChange={setCurrentPage}
        />
      )}
    </section>
  );
}

function ArticleCard({
  href,
  imageUrl,
  category,
  date,
  title,
}: {
  href: string;
  imageUrl: string;
  category: string;
  date: string;
  title: string;
}) {
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
            Baca artikel selengkapnya <ChevronRight className="text-2xl" />
          </div>
        </div>
      </article>
    </Link>
  );
}

function PressReleaseCard({ item }: { item: PressReleaseItem }) {
  const viewUrl = `${FILE_STORAGE_URL}${item.file_en.path}`;
  const downloadUrlEn = `${FILE_STORAGE_URL}${item.file_en.path}`;
  const downloadUrlId = `${FILE_STORAGE_URL}${item.file_id.path}`;

  const pdfIcon =
    "https://chandradaya-investasi.com/assets/frontend/icons/ic_filepdf.svg";
  const viewIcon =
    "https://chandradaya-investasi.com/assets/frontend/icons/ic_eye.svg";
  const downloadIcon =
    "https://chandradaya-investasi.com/assets/frontend/icons/ic_download_file.svg";

  return (
    <li
       className="py-8 border-b border-b-neutral-5 flex items-start justify-start flex-col gap-y-4 md:gap-y-0"
    >
      <div className="w-full max-w-3xl">
        <h3 className="text-neutral-13 mb-2 text-lg font-medium line-clamp-2">
          {item.name_id}
        </h3>
      </div>

      <div className="flex flex-col md:flex-row justify-between w-full">
        <div className="flex items-center text-base text-neutral-8 gap-3">
          <div className="flex items-baseline gap-3">
            <span>{item.date}</span>
            <span>.</span>
            <span>{item.file_en.size}</span>
            <span>.</span>
          </div>
          <Image
            src={pdfIcon}
            width={28}
            height={20}
            alt="PDF icon"
            className="inline-block"
          />
        </div>
        <div className="flex flex-row items-center gap-4 sm:gap-8 w-full md:w-fit">
          <Link
            href={viewUrl}
            className="flex items-center gap-2 text-blue-base font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={viewIcon}
              width={24}
              height={24}
              alt="View icon"
              className="inline-block"
            />
            View
          </Link>
          <Link
            href={downloadUrlEn}
            className="flex items-center gap-2 text-blue-base font-medium"
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            <Image
              src={downloadIcon}
              width={24}
              height={24}
              alt="Download icon"
              className="inline-block"
            />
            Download-EN
          </Link>
          <Link
            href={downloadUrlId}
            className="flex items-center gap-2 text-blue-base font-medium"
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            <Image
              src={downloadIcon}
              width={24}
              height={24}
              alt="Download icon"
              className="inline-block"
            />
            Download-ID
          </Link>
        </div>
      </div>
    </li>
  );
}

function Pagination({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number | ((prev: number) => number)) => void;
}) {
  const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

  return (
    <nav
      aria-label="Pagination"
      className="mt-5 py-10 flex w-full justify-between items-center gap-4 flex-col md:flex-row"
    >
      <p className="text-neutral-900 text-sm max-lg:hidden">
        {startItem}-{endItem} dari {totalItems} items
      </p>
      <ul className="flex items-center justify-center gap-2">
        <li>
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="pagination-btn"
            aria-label="First page"
          >
            <ChevronsLeft size={16} />
          </button>
        </li>
        <li>
          <button
            onClick={() => onPageChange((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="pagination-btn"
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>
        </li>
        <li className="font-medium px-2">{`Halaman ${currentPage} dari ${totalPages}`}</li>
        <li>
          <button
            onClick={() => onPageChange((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="pagination-btn"
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </li>
        <li>
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="pagination-btn"
            aria-label="Last page"
          >
            <ChevronsRight size={16} />
          </button>
        </li>
      </ul>
      <div className="text-neutral-900 text-sm lg:hidden">
        {startItem}-{endItem} dari {totalItems} items
      </div>
    </nav>
  );
}
