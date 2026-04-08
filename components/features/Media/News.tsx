"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { clsx } from "clsx";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ImageOff,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import {
  NewsApiResponse,
  PressReleaseApiResponse,
  ArticleItem,
  PressReleaseItem,
  IReportType,
} from "@/types/Media/Media";
import { useTranslations } from "next-intl";
import { mediaService } from "@/services/Media/MediaService";

interface NewsProps {
  mediaData: NewsApiResponse;
  mediaBlogData: NewsApiResponse;
  pressReleaseData: PressReleaseApiResponse;
  categoryData: IReportType[];
  locale: string;
}

const ITEMS_PER_PAGE = 15;
const FILE_PREVIEW_URL = `${process.env.NEXT_PUBLIC_URL}/file-storage/`;
const FILE_DOWNLOAD_URL = `${process.env.NEXT_PUBLIC_URL}/file-download/`;

export function News({
  mediaData,
  mediaBlogData,
  pressReleaseData,
  categoryData,
  locale,
}: NewsProps) {
  const t = useTranslations("Media");
  const [activeTab, setActiveTab] = useState("news");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const defaultCategoryLabel = locale === "id" ? "Semua" : "Semua";

  const newsCategories = useMemo(() => {
    const categoryNames = categoryData.map((cat) => {
      return cat[`name_${locale}`];
    });

    return [defaultCategoryLabel, ...categoryNames];
  }, [categoryData, locale, defaultCategoryLabel]);

  const categories = activeTab === "news" ? newsCategories : ["Semua"];

  const [blogItems, setBlogItems] = useState<ArticleItem[]>(
    mediaBlogData?.items || [],
  );
  const [totalBlogData, setTotalBlogData] = useState<number>(
    mediaBlogData?.meta?.total || 0,
  );
  const [isLoadingBlog, setIsLoadingBlog] = useState(false);

  const { paginatedArticles, totalNewsPages, totalNewsItems } = useMemo(() => {
    const filteredByCategory =
      activeCategory === defaultCategoryLabel
        ? mediaData.items
        : mediaData.items.filter((item) => {
            const itemCategoryName = item.article_category[`name_${locale}`];

            return itemCategoryName === activeCategory;
          });

    const total = filteredByCategory.length;
    const pages = Math.ceil(total / ITEMS_PER_PAGE);
    const paginated = filteredByCategory.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE,
    );

    return {
      paginatedArticles: paginated,
      totalNewsPages: pages,
      totalNewsItems: total,
    };
  }, [
    activeCategory,
    currentPage,
    mediaData.items,
    locale,
    defaultCategoryLabel,
  ]);

  useEffect(() => {
    if (activeTab === "blog") {
      const fetchBlogData = async () => {
        setIsLoadingBlog(true);
        try {
          const newData = await mediaService.getMediaBlogPageData(currentPage);
          if (newData && newData.items) {
            setBlogItems(newData.items);
            // Update juga totalnya untuk berjaga-jaga jika ada penambahan data real-time
            if (newData.meta?.total) {
              setTotalBlogData(newData.meta.total);
            }
          }
        } catch (error) {
          console.error("Gagal mengambil data blog:", error);
        } finally {
          setIsLoadingBlog(false);
        }
      };

      if (currentPage !== 1) {
        fetchBlogData();
      } else {
        setBlogItems(mediaBlogData?.items || []);
        setTotalBlogData(mediaBlogData?.meta?.total || 0);
      }
    }
  }, [currentPage, activeTab, mediaBlogData]);

  const { paginatedBlog, totalBlogPages, totalBlogItems } = useMemo(() => {
    const total = totalBlogData;

    const pages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));

    return {
      paginatedBlog: blogItems,
      totalBlogPages: pages,
      totalBlogItems: total,
    };
  }, [blogItems, totalBlogData]);

  const { paginatedPressReleases, totalPressPages, totalPressItems } =
    useMemo(() => {
      let filtered = pressReleaseData.items;

      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        filtered = filtered.filter((item) =>
          item[`name_${locale}`].toLowerCase().includes(lowerQuery),
        );
      }

      const total = filtered.length;
      const pages = Math.ceil(total / ITEMS_PER_PAGE);
      const paginated = filtered.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
      );

      return {
        paginatedPressReleases: paginated,
        totalPressPages: pages,
        totalPressItems: total,
      };
    }, [currentPage, pressReleaseData.items, searchQuery, locale]);

  const totalPages =
    activeTab === "news"
      ? totalNewsPages
      : activeTab === "blog"
        ? totalBlogPages
        : totalPressPages;
  const totalItems =
    activeTab === "news"
      ? totalNewsItems
      : activeTab === "blog"
        ? totalBlogItems
        : totalPressItems;

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setActiveCategory(defaultCategoryLabel);
    setCurrentPage(1);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const slugKey = locale === "en" ? "slug" : "slug_id";

  return (
    <section
      data-navbar-theme="light"
      id="content-media-section"
      className="container mx-auto   py-20 bg-white"
    >
      <nav className="grid grid-cols-3">
        <button
          onClick={() => handleTabClick("news")}
          className={clsx(
            "border-b-2 text-neutral-13 text-lg text-center p-4 hover:border-b-[#2474A5] hover:border-b-4 hover:font-medium transition",
            activeTab === "news"
              ? "border-b-4 !border-b-[#2474A5] font-medium"
              : "border-b-neutral-6",
          )}
        >
          {t("News")}
        </button>
        <button
          onClick={() => handleTabClick("press-release")}
          className={clsx(
            "border-b-2 text-neutral-13 text-lg text-center p-4 hover:border-b-[#2474A5] hover:border-b-4 hover:font-medium transition",
            activeTab === "press-release"
              ? "border-b-4 !border-b-[#2474A5] font-medium"
              : "border-b-neutral-6",
          )}
        >
          {t("press_release")}
        </button>
        <button
          onClick={() => handleTabClick("blog")}
          className={clsx(
            "border-b-2 text-neutral-13 text-lg text-center p-4 hover:border-b-[#2474A5] hover:border-b-4 hover:font-medium transition",
            activeTab === "blog"
              ? "border-b-4 !border-b-[#2474A5] font-medium"
              : "border-b-neutral-6",
          )}
        >
          {t("blog")}
        </button>
      </nav>

      <nav className="flex items-center gap-2 mt-10 mb-6 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={clsx(
              "text-xs lg:text-base cursor-pointer px-6 py-2 rounded-full whitespace-nowrap flex items-center gap-2 text-[#2474A5] border border-[#2474A5] hover:bg-[#2474A5] hover:text-white transition",
              activeCategory === category && "bg-[#2474A5] text-white",
            )}
            style={{
              display:
                (activeTab === "press-release" || activeTab === "blog") &&
                categories.length === 1
                  ? "none"
                  : "flex",
            }}
          >
            {category}
          </button>
        ))}
      </nav>

      {activeTab === "news" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {paginatedArticles.length > 0 ? (
            paginatedArticles.map((article: ArticleItem) => (
              <ArticleCard
                key={article.id}
                href={`/media/news/${article[slugKey] == "" ? article.slug : article[slugKey]}`}
                imageUrl={article.image}
                category={article.article_category[`name_${locale}`]}
                date={article.date}
                title={`${article[`title_${locale}`]}`}
                type="news"
              />
            ))
          ) : (
            <div className="col-span-full py-20 flex justify-center items-center">
              <p className="text-neutral-500 text-lg font-medium">
                {t("title_not_found")}
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === "press-release" && (
        <>
          <div className="mt-10 mb-8 flex items-center justify-between flex-col lg:flex-row gap-4">
            <button className="text-xs lg:text-base cursor-pointer px-6 py-2 rounded-full whitespace-nowrap flex items-center gap-2 text-[#2474A5] border border-[#2474A5] hover:bg-[#2474A5] hover:text-white transition">
              Filter <SlidersHorizontal size={18} />
            </button>
            <div className="w-full lg:w-[264px] rounded-full border border-neutral-300 px-4 py-2 flex items-center gap-2">
              <Search className="text-neutral-400" size={20} />
              <input
                type="text"
                className="w-full placeholder:text-neutral-400 text-sm outline-none text-neutral-800"
                placeholder={t("search")}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          {paginatedPressReleases.length > 0 ? (
            <ul className="flex flex-col">
              {paginatedPressReleases.map((press: PressReleaseItem) => (
                <PressReleaseCard key={press.id} item={press} locale={locale} />
              ))}
            </ul>
          ) : (
            <div className="py-20 flex justify-center items-center border-b border-neutral-5">
              <p className="text-neutral-500 text-lg font-medium">
                {t("title_not_found")}
              </p>
            </div>
          )}
        </>
      )}

      {activeTab === "press-release" && (
        <ul className="flex flex-col">
          {paginatedPressReleases.map((press: PressReleaseItem) => (
            <PressReleaseCard key={press.id} item={press} locale={locale} />
          ))}
        </ul>
      )}

      {activeTab === "blog" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {isLoadingBlog ? (
            <div className="col-span-full py-20 flex justify-center items-center">
              <p className="text-neutral-500 text-lg font-medium">
                Memuat data...
              </p>
            </div>
          ) : paginatedBlog.length > 0 ? (
            paginatedBlog.map((article: ArticleItem) => (
              <ArticleCard
                key={article.id}
                href={`/media/blog/${article[slugKey]}`}
                imageUrl={article.image}
                category={article.category_name}
                date={article.date}
                title={`${article[`title_${locale}`]}`}
                type="blog"
              />
            ))
          ) : (
            <div className="col-span-full py-20 flex justify-center items-center">
              <p className="text-neutral-500 text-lg font-medium">
                {t("title_not_found")}
              </p>
            </div>
          )}
        </div>
      )}

      {totalPages > 0 && (
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
  type,
}: {
  href: string;
  imageUrl: string;
  category: string;
  date: string;
  title: string;
  type: string;
}) {
  const t = useTranslations("Media");

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [imageUrl]);

  return (
    <Link
      href={href}
      className="flex bg-white rounded-xl shadow-article border border-neutral-5 overflow-hidden h-full group"
    >
      <article className="flex flex-col text-neutral-13 w-full">
        <div className="w-full aspect-square overflow-hidden">
          <div className="relative w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110">
            {!imageUrl || hasError ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400 gap-2">
                <ImageOff size={48} strokeWidth={1.5} />
              </div>
            ) : (
              <Image
                src={imageUrl}
                alt={title}
                layout="fill"
                objectFit="cover"
                onError={() => setHasError(true)}
              />
            )}
          </div>
        </div>
        <div className="p-6 flex flex-col grow">
          <div className="flex items-center gap-4">
            {type != "blog" && (
              <span className="bg-neutral-300 px-3 py-1 text-sm rounded-full">
                {category}
              </span>
            )}
            <span className="text-sm text-neutral-10">{date}</span>
          </div>
          <h3 className="text-[22px] font-medium mt-4 mb-7 line-clamp-3 grow">
            {title}
          </h3>
          <div className="text-[#2474A5] flex items-center gap-2 cursor-pointer mt-auto">
            {t("read_article_more")} <ChevronRight className="text-2xl" />
          </div>
        </div>
      </article>
    </Link>
  );
}

function PressReleaseCard({
  item,
  locale,
}: {
  item: PressReleaseItem;
  locale: string;
}) {
  const t = useTranslations("Media");

  const viewUrl_id = `${FILE_PREVIEW_URL}${item.file_id.path}`;
  const viewUrl_en = `${FILE_PREVIEW_URL}${item.file_en.path}`;
  const downloadUrlEn = `${FILE_DOWNLOAD_URL}${item.file_en.path}`;
  const downloadUrlId = `${FILE_DOWNLOAD_URL}${item.file_id.path}`;

  const pdfIcon = "/assets/icons/ic_filepdf.svg";
  const viewIcon = "/assets/icons/ic_eye.svg";
  const downloadIcon = "/assets/icons/ic_download_file.svg";

  return (
    <li className="py-8 border-b border-b-neutral-5 flex items-start justify-start flex-col gap-y-4 lg:gap-y-0">
      <div className="w-full max-w-3xl">
        <h3 className="text-neutral-13 mb-2 text-lg font-medium line-clamp-2">
          {item[`name_${locale}`]}
        </h3>
      </div>

      <div className="flex flex-col lg:flex-row justify-between w-full">
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
        <div className="flex flex-row items-center gap-4 sm:gap-8 w-full lg:w-fit">
          <Link
            href={locale == "id" ? viewUrl_id : viewUrl_en}
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
            {t("download_view")}
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
            {t("download_en")}
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
            {t("download_id")}
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
  onPageChange: (page: number) => void;
}) {
  const t = useTranslations("pagination");
  const [jumpPage, setJumpPage] = useState<string>("");

  const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

  const handleJumpPage = () => {
    const pageNumber = parseInt(jumpPage, 10);

    if (!isNaN(pageNumber)) {
      if (pageNumber > totalPages) {
        onPageChange(totalPages);
      } else if (pageNumber < 1) {
        onPageChange(1);
      } else {
        onPageChange(pageNumber);
      }
    }

    setJumpPage("");
  };

  const btnBaseClass =
    "text-[12px] rounded-md flex items-center justify-center min-w-[32px] h-[32px] border transition-all duration-200";

  const btnActive = "bg-[#2474A5] text-white border-[#2474A5]";

  const btnDefault =
    "text-neutral-13 border-neutral-4 bg-white hover:bg-[#2474A5] hover:text-white hover:border-[#2474A5]";

  const btnDisabled =
    "!cursor-not-allowed text-neutral-4 border-neutral-4 bg-transparent";

  return (
    <section className="mt-5 py-10 flex w-full justify-center md:justify-between items-center gap-4 flex-col md:flex-row">
      <p className="text-neutral-10 text-sm max-md:hidden">
        {startItem}-{endItem} {t("of")} {totalItems} {t("items")}
      </p>

      <ul className="flex items-center justify-center gap-2">
        <li>
          <button
            type="button"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className={clsx(
              btnBaseClass,
              currentPage === 1 ? btnDisabled : btnDefault,
            )}
            aria-label="First page"
          >
            <ChevronsLeft size={16} />
          </button>
        </li>

        <li>
          <button
            type="button"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={clsx(
              btnBaseClass,
              currentPage === 1 ? btnDisabled : btnDefault,
            )}
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>
        </li>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li key={page}>
            <button
              type="button"
              onClick={() => onPageChange(page)}
              className={clsx(
                btnBaseClass,
                currentPage === page ? btnActive : btnDefault,
              )}
            >
              {page}
            </button>
          </li>
        ))}

        <li>
          <button
            type="button"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={clsx(
              btnBaseClass,
              currentPage === totalPages ? btnDisabled : btnDefault,
            )}
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </li>

        <li>
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={clsx(
              btnBaseClass,
              currentPage === totalPages ? btnDisabled : btnDefault,
            )}
            aria-label="Last page"
          >
            <ChevronsRight size={16} />
          </button>
        </li>
      </ul>

      <div className="flex items-center gap-4 justify-center md:justify-between w-full md:w-auto">
        <p className="text-neutral-10 text-sm md:hidden">
          {startItem}-{endItem} {t("of")} {totalItems} {t("items")}
        </p>

        <div className="flex items-center gap-4">
          <p className="text-neutral-10 text-sm whitespace-nowrap">
            {t("jumpToPage")}
          </p>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={jumpPage}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleJumpPage();
              }
            }}
            onChange={(e) => setJumpPage(e.target.value)}
            className="outline-none border border-neutral-5 w-10 h-7 rounded-sm text-center text-sm focus:border-[#2474A5]"
          />
          <button
            type="button"
            onClick={handleJumpPage}
            className="text-[#2474A5] text-xs font-bold cursor-pointer hover:underline"
          >
            {t("go")}
          </button>
        </div>
      </div>
    </section>
  );
}