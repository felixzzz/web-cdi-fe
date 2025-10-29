"use client";

import React, { useState, useMemo } from "react";
import { clsx } from "clsx";
import {
  Search,
  FileText,
  Eye,
  Download,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const publicationsData = {
  prospectus: [
    {
      id: "prospectus-1",
      title: "Prospectus CDIA",
      date: "2025-07-02",
      displayDate: "02 July 2025",
      size: "3.95 MB",
      viewUrl: "#",
      downloadUrl: "#",
    },
  ],
  gms: [
    {
      id: "gms-1",
      title: "GMS Announcement Q2 2025",
      date: "2025-06-15",
      displayDate: "15 June 2025",
      size: "1.2 MB",
      viewUrl: "#",
      downloadUrl: "#",
    },
  ],
  disclosure: [
    {
      id: "disclosure-1",
      title: "Public Disclosure May 2025",
      date: "2025-05-30",
      displayDate: "30 May 2025",
      size: "0.8 MB",
      viewUrl: "#",
      downloadUrl: "#",
    },
  ],
  earnings: [
    {
      id: "earnings-1",
      title: "Q1 2025 Earnings Update",
      date: "2025-04-28",
      displayDate: "28 April 2025",
      size: "2.5 MB",
      viewUrl: "#",
      downloadUrl: "#",
    },
  ],
};

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

type PublicationTab = keyof typeof publicationsData;

type NavLink = {
  id: PublicationTab;
  title: string;
  href: string;
};

const ITEMS_PER_PAGE = 5;

export function Publications() {
  const [activeTab, setActiveTab] = useState<PublicationTab>("prospectus");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { paginatedItems, totalPages, totalItems } = useMemo(() => {
    const currentItems = publicationsData[activeTab] || [];

    const filtered = currentItems.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const total = filtered.length;
    const pages = Math.ceil(total / ITEMS_PER_PAGE);
    const paginated = filtered.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

    return { paginatedItems: paginated, totalPages: pages, totalItems: total };
  }, [activeTab, searchQuery, currentPage]);

  const activeLink = navLinks.find((link) => link.id === activeTab);

  return (
    <div className="py-20">
      <section className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <nav
            aria-label="Publications categories"
            className="flex lg:flex-col lg:items-start w-full max-md:overflow-x-auto max-md:whitespace-nowrap"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setCurrentPage(1);
                  setSearchQuery("");
                }}
                className={clsx(
                  "border-b-2 border-b-neutral-4 text-lg text-center p-4 transition lg:w-full lg:text-start",
                  activeTab === link.id
                    ? "text-neutral-13 font-medium" // Gaya aktif
                    : "text-neutral-8 font-normal hover:text-neutral-13" // Gaya inaktif
                )}
              >
                {link.title}
              </button>
            ))}
          </nav>

          <div className="lg:col-span-4">
            <div className="grid lg:grid-cols-2 gap-4 pb-10 border-b border-b-neutral-5">
              <div>
                <h2 className="text-2xl lg:text-[28px] font-medium text-neutral-13">
                  {activeLink?.title}
                </h2>
              </div>
              <div className="relative w-full lg:w-[264px] lg:ms-auto">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-7">
                  <Search size={16} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full rounded-full border border-neutral-7 pl-10 pr-4 py-2 placeholder:text-neutral-7 text-sm outline-none text-neutral-13 focus:ring-2 focus:ring-blue-base"
                  placeholder="Search anything..."
                />
              </div>
            </div>

            <section aria-live="polite">
              {paginatedItems.length > 0 ? (
                paginatedItems.map((item) => (
                  <article
                    key={item.id}
                    className="py-8 border-b border-b-neutral-5 flex lg:items-center justify-between flex-col lg:flex-row gap-y-4 lg:gap-y-0"
                  >
                    <div>
                      <h3 className="text-neutral-13 mb-2 text-lg font-medium">
                        {item.title}
                      </h3>
                      <div className="flex items-center text-base text-neutral-8 gap-3">
                        <p className="flex items-baseline gap-3">
                          <time dateTime={item.date}>{item.displayDate}</time>
                          <span>.</span>
                          <span>{item.size}</span>
                          <span>.</span>
                        </p>
                        <FileText size={16} aria-label="PDF Document" />
                      </div>
                    </div>
                    <div className="flex lg:items-center gap-8 w-full lg:w-fit">
                      <a
                        href={item.viewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-neutral-10 font-medium hover:text-neutral-13"
                      >
                        <Eye size={16} /> View
                      </a>
                      <a
                        href={item.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-neutral-10 font-medium hover:text-neutral-13"
                      >
                        <Download size={16} /> Download
                      </a>
                    </div>
                  </article>
                ))
              ) : (
                <p className="text-center text-neutral-8 py-16">
                  No publications found.
                </p>
              )}
            </section>

            {totalPages > 1 && (
              <nav
                aria-label="Pagination"
                className="mt-5 py-10 flex w-full justify-between items-center gap-4 flex-col lg:flex-row"
              >
                <p className="text-neutral-10 text-sm max-lg:hidden">
                  {`${(currentPage - 1) * ITEMS_PER_PAGE + 1}-${Math.min(
                    currentPage * ITEMS_PER_PAGE,
                    totalItems
                  )} of ${totalItems} items`}
                </p>
                <ul className="flex items-center justify-center gap-2">
                  <li>
                    <button
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className="pagination-btn"
                      aria-label="First page"
                    >
                      <ChevronsLeft size={16} />
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setCurrentPage((p) => p - 1)}
                      disabled={currentPage === 1}
                      className="pagination-btn"
                      aria-label="Previous page"
                    >
                      <ChevronLeft size={16} />
                    </button>
                  </li>
                  <li className="font-medium px-2">{`Page ${currentPage} of ${totalPages}`}</li>
                  <li>
                    <button
                      onClick={() => setCurrentPage((p) => p + 1)}
                      disabled={currentPage === totalPages}
                      className="pagination-btn"
                      aria-label="Next page"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className="pagination-btn"
                      aria-label="Last page"
                    >
                      <ChevronsRight size={16} />
                    </button>
                  </li>
                </ul>
                <div className="text-neutral-10 text-sm lg:hidden">
                  {`${(currentPage - 1) * ITEMS_PER_PAGE + 1}-${Math.min(
                    currentPage * ITEMS_PER_PAGE,
                    totalItems
                  )} of ${totalItems} items`}
                </div>
              </nav>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}