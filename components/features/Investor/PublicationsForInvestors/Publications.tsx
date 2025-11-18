"use client";

import React, { useState, useMemo, useEffect } from "react";
import { clsx } from "clsx";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Loader2, // Added loader
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  PublicationApiResponse,
  PublicationItem,
  PaginationMeta,
  PublicationTab,
} from "@/types/Investor/Publication";
import {
  publicationService,
} from "@/services/Investor/PublicationServices";
import { useTranslations } from "next-intl";

// --- Helper types and functions ---
interface TransformedItem {
  id: string; // Use ulid or id
  title: string;
  date: string; // datetime for sorting
  displayDate: string; // date for display
  size: string;
  viewUrl: string;
  downloadUrl: string;
}

// Base URLs for file links (you may need to adjust the path)
const FILE_PREVIEW_BASE_URL =
  "https://chandradaya-investasi.com/file/preview/default/investor-publication/";
const FILE_DOWNLOAD_BASE_URL =
  "https://chandradaya-investasi.com/file/download/default/investor-publication/";

// Transform API item to component item
const transformItem = (item: PublicationItem): TransformedItem => ({
  id: item.ulid,
  title: item.name,
  date: item.datetime,
  displayDate: item.date,
  size: item.file.size,
  // Note: The slug logic might differ per tab; check API response
  viewUrl: `${FILE_PREVIEW_BASE_URL}${item.ulid}/${item.name_slug}`,
  downloadUrl: `${FILE_DOWNLOAD_BASE_URL}${item.ulid}/${item.name_slug}`,
});
// --- End Helpers ---

const navLinks: NavLink[] = [
  {
    id: "prospectus",
    title: "Prospectus",
    href: "/investor/publications-for-investors?tab=prospectus",
  },
  {
    id: "gms",
    title: "General Meeting of Shareholders",
    href: "/investor/publications-for-investors?tab=gms",
  },
  {
    id: "disclosure",
    title: "Public Announcement",
    href: "/investor/publications-for-investors?tab=disclosure",
  },
  {
    id: "earnings",
    title: "Earnings Update",
    href: "/investor/publications-for-investors?tab=earnings",
  },
];

type NavLink = {
  id: PublicationTab;
  title: string;
  href: string;
};

interface PublicationsProps {
  locale: string,
  initialData: PublicationApiResponse;
  initialTab: PublicationTab;
}

export function Publications({ locale, initialData, initialTab }: PublicationsProps) {
  const t = useTranslations('Investor.Publication')
  const [activeTab, setActiveTab] = useState<PublicationTab>(initialTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // State for the raw API items and pagination meta
  const [items, setItems] = useState<PublicationItem[]>(initialData.items);
  const [pagination, setPagination] = useState<PaginationMeta>(
    initialData.meta
  );

  // --- Data Fetching Effect ---
  useEffect(() => {
    // Skip fetch for initial render (data is already passed)
    if (currentPage === 1 && activeTab === initialTab) {
      setItems(initialData.items);
      setPagination(initialData.meta);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await publicationService.getPublicationTabData(
          locale,
          activeTab,
          currentPage
        );
        setItems(data.items);
        setPagination(data.meta);
      } catch (error) {
        console.error("Failed to fetch publication data:", error);
        setItems([]); // Clear items on error
        // Reset pagination to a default state
        setPagination({
          total: 0,
          per_page: 15,
          current_page: 1,
          last_page: 1,
          from: 0,
          to: 0,
          range: "0-0 of 0 items",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeTab, currentPage, initialTab, initialData]);

  // --- Client-side Search & Transformation ---
  const { paginatedItems, totalPages, totalItems } = useMemo(() => {
    const transformed = items.map(transformItem);

    // Client-side search filters the results from the current page
    const filtered = transformed.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return {
      paginatedItems: filtered,
      totalPages: pagination.last_page,
      totalItems: pagination.total,
    };
  }, [items, searchQuery, pagination]);

  const activeLink = navLinks.find((link) => link.id === activeTab);

  // --- Event Handlers ---
  const handleTabClick = (tab: PublicationTab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset page
    setSearchQuery(""); // Reset search
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || isLoading) return;
    setCurrentPage(page);
    setSearchQuery(""); // Reset search on page change
    window.scrollTo(0, 0); // Scroll to top
  };

  return (
    <div
    data-navbar-theme="dark"
    className="py-20">
      <section className="container mx-auto px-4 md:px-8 lg:px-20 2xl:px-44">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <nav
            aria-label="Publications categories"
            className="flex md:flex-col md:items-start w-full max-md:overflow-x-auto max-md:whitespace-nowrap"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleTabClick(link.id)} // Use new handler
                className={clsx(
                  "border-b-[1px] border-b-neutral-100 border-t-[1px] border-t-neutral-100 text-lg text-center p-4 transition md:w-full md:text-start",
                  activeTab === link.id
                    ? "text-neutral-13 font-medium border-l-4 !border-l-[#2474A5]"
                    : "text-neutral-8 font-normal hover:text-neutral-13"
                )}
              >
                {link.title}
              </button>
            ))}
          </nav>

          <div className="md:col-span-4">
            <div className="grid md:grid-cols-2 gap-4 pb-10 border-b border-b-neutral-5">
              <div>
                <h2 className="text-2xl md:text-[28px] font-medium text-neutral-13">
                  {activeLink?.title}
                </h2>
              </div>
              <div className="relative w-full md:w-[264px] md:ms-auto">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-7">
                  <Search size={16} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    // No page reset needed, search is client-side
                  }}
                  className="w-full rounded-full border border-neutral-7 pl-10 pr-4 py-2 placeholder:text-neutral-7 text-sm outline-none text-neutral-13 focus:ring-2 focus:ring-blue-base"
                  placeholder="Search anything..."
                />
              </div>
            </div>

            <section aria-live="polite" className="min-h-[300px]">
              {isLoading ? (
                <div className="flex justify-center items-center h-full min-h-[300px]">
                  <Loader2 className="animate-spin text-[#2474A5]" size={48} />
                </div>
              ) : paginatedItems.length > 0 ? (
                paginatedItems.map((item) => (
                  <article
                    key={item.id}
                    className="py-8 border-b border-b-neutral-5 flex items-center justify-start flex-col gap-y-4 md:gap-y-0"
                  >
                    <div className="flex w-full">
                      <h4 className="text-neutral-13 mb-2 text-lg font-medium">
                        {item.title}
                      </h4>
                    </div>
                    <div className="flex flex-col md:flex-row justify-start md:justify-between w-full">
                      <div className="flex items-center justify-start text-base text-neutral-8 gap-3 w-full">
                        <p className="flex items-baseline gap-3">
                          <time dateTime={item.date}>
                            {item.displayDate}
                          </time>
                          <span>.</span>
                          <span>{item.size}</span>
                          <span>.</span>
                        </p>
                        <Image
                          src="https://chandradaya-investasi.com/assets/frontend/icons/ic_filepdf.svg"
                          width={30}
                          height={24}
                          alt="See all icon"
                          className="inline-block"
                        />
                      </div>
                      <div className="flex items-center justify-start md:justify-end gap-8 w-full">
                        <Link
                          href={item.viewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-base font-medium"
                        >
                          <Image
                            src="https://chandradaya-investasi.com/assets/frontend/icons/ic_eye.svg"
                            width={20}
                            height={20}
                            alt="See all icon"
                            className="inline-block"
                          />{" "}
                          {t('download_view')}
                        </Link>
                        <a
                          href={item.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-base font-medium"
                        >
                          <Image
                            src="https://chandradaya-investasi.com/assets/frontend/icons/ic_download_file.svg"
                            width={20}
                            height={20}
                            alt="Download icon"
                            className="inline-block"
                            />{" "}
                            {t('download_download')}
                        </a>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <p className="text-center text-neutral-8 py-16">
                  {t('help')}
                </p>
              )}
            </section>

            {totalPages > 1 && (
              <nav
                aria-label="Pagination"
                className="mt-5 py-10 flex w-full justify-between items-center gap-4 flex-col md:flex-row"
              >
                <p className="text-neutral-10 text-sm max-lg:hidden">
                  {`${pagination.from || 0}-${
                    pagination.to || 0
                  } of ${totalItems} items`}
                </p>
                <ul className="flex items-center justify-center gap-2">
                  <li>
                    <button
                      onClick={() => handlePageChange(1)}
                      disabled={currentPage === 1 || isLoading}
                      className="pagination-btn"
                      aria-label="First page"
                    >
                      <ChevronsLeft size={16} />
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1 || isLoading}
                      className="pagination-btn"
                      aria-label="Previous page"
                    >
                      <ChevronLeft size={16} />
                    </button>
                  </li>
                  <li className="font-medium px-2">{`Page ${currentPage} of ${totalPages}`}</li>
                  <li>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages || isLoading}
                      className="pagination-btn"
                      aria-label="Next page"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      disabled={currentPage === totalPages || isLoading}
                      className="pagination-btn"
                      aria-label="Last page"
                    >
                      <ChevronsRight size={16} />
                    </button>
                  </li>
                </ul>
                <div className="text-neutral-10 text-sm lg:hidden">
                  {`${pagination.from || 0}-${
                    pagination.to || 0
                  } of ${totalItems} items`}
                </div>
              </nav>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}