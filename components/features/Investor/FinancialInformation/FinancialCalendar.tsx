"use client";

import { useState, useMemo } from "react";
import { clsx } from "clsx";
import {
  Languages,
  Search,
  FileText,
  Eye,
  Download,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const allReportsData = [
  {
    id: 1,
    title: "Audited Financial Report - 30 Jun 2025",
    date: "2025-09-15",
    displayDate: "15 September 2025",
    size: "2.1 MB",
    type: "Financial Report",
    year: 2025,
    viewUrl: "#",
    downloadUrl: "#",
  },
  {
    id: 2,
    title: "Audited Report 2024",
    date: "2025-04-14",
    displayDate: "14 April 2025",
    size: "3.59 MB",
    type: "Annual Report",
    year: 2025,
    viewUrl: "#",
    downloadUrl: "#",
  },
  {
    id: 3,
    title: "Q1 Financial Report 2024",
    date: "2024-05-20",
    displayDate: "20 May 2024",
    size: "1.8 MB",
    type: "Financial Report",
    year: 2024,
    viewUrl: "#",
    downloadUrl: "#",
  },
  {
    id: 4,
    title: "Annual Report 2023",
    date: "2024-03-15",
    displayDate: "15 March 2024",
    size: "4.1 MB",
    type: "Annual Report",
    year: 2024,
    viewUrl: "#",
    downloadUrl: "#",
  },
];

const yearFilters = ["All Year", 2025, 2024];
const typeFilters = ["All Type", "Annual Report", "Financial Report"];
const ITEMS_PER_PAGE = 5;

export function FinancialCalendar() {
  const [activeYear, setActiveYear] = useState<string | number>("All Year");
  const [activeType, setActiveType] = useState<string>("All Type");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredReports = useMemo(() => {
    return allReportsData
      .filter((report) => {
        const yearMatch =
          activeYear === "All Year" || report.year === activeYear;
        const typeMatch =
          activeType === "All Type" || report.type === activeType;
        const searchMatch = report.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        return yearMatch && typeMatch && searchMatch;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [activeYear, activeType, searchQuery]);

  const { paginatedAndGroupedReports, totalPages, totalItems } = useMemo(() => {
    const totalItems = filteredReports.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedItems = filteredReports.slice(startIndex, endIndex);

    const grouped = paginatedItems.reduce((acc, report) => {
      const year = report.year;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(report);
      return acc;
    }, {} as Record<number, typeof paginatedItems>);

    return { paginatedAndGroupedReports: grouped, totalPages, totalItems };
  }, [filteredReports, currentPage]);

  const reportKeys = Object.keys(paginatedAndGroupedReports).sort(
    (a, b) => Number(b) - Number(a)
  );

  return (
    <section
      id="content-media-section"
      aria-labelledby="calendar-heading"
      className="container mx-auto py-20 px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]"
    >
      <h2
        id="calendar-heading"
        className="text-neutral-13 font-medium text-2xl lg:text-[38px] lg:leading-[44px] mb-3"
      >
        Financial Calendar
      </h2>
      <div className="flex items-center gap-2 rounded-sm bg-[#ECF8FF] border border-light-blue-2 text-[#2474A5] text-xs w-fit p-[6px]">
        <Languages size={16} />
        <span>
          Documents are available in both English and Bahasa Indonesia.
        </span>
      </div>
      <nav
        aria-label="Filter by year"
        className="gap-10 flex items-center overflow-y-auto mt-10 border-b-2 border-b-neutral-6"
      >
        {yearFilters.map((year) => (
          <button
            key={year}
            onClick={() => {
              setActiveYear(year);
              setCurrentPage(1);
            }}
            className={clsx(
              "text-base font-normal text-neutral-8 py-3 border-b-2 border-b-transparent cursor-pointer whitespace-nowrap",
              activeYear === year && "!text-blue-base !border-b-blue-base"
            )}
          >
            {year}
          </button>
        ))}
      </nav>
      <div className="grid lg:grid-cols-2 gap-4 my-10">
        <nav
          aria-label="Filter by report type"
          className="flex items-center gap-2 flex-wrap"
        >
          {typeFilters.map((type) => (
            <button
              key={type}
              onClick={() => {
                setActiveType(type);
                setCurrentPage(1);
              }}
              className={clsx(
                "text-xs lg:text-base cursor-pointer px-6 py-2 rounded-full whitespace-nowrap flex items-center gap-2 text-blue-base border border-blue-base hover:bg-blue-base hover:text-white transition",
                activeType === type && "bg-blue-base text-white"
              )}
            >
              {type}
            </button>
          ))}
        </nav>
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
            className="w-full rounded-full border border-neutral-7 px-10 py-2 placeholder:text-neutral-7 text-sm outline-none text-neutral-13 focus:ring-2 focus:ring-blue-base"
            placeholder="Search anything..."
          />
        </div>
      </div>

      <section aria-label="Financial reports list">
        {reportKeys.length > 0 ? (
          reportKeys.map((year) => (
            <div key={year} className="flex lg:gap-6 flex-col lg:flex-row mt-5">
              <h3 className="text-blue-base font-medium text-[48px] w-full lg:w-auto">
                {year}
              </h3>
              <div className="w-full">
                {paginatedAndGroupedReports[Number(year)].map((report) => (
                  <article
                    key={report.id}
                    className="py-8 border-b border-b-neutral-5 flex lg:items-center justify-between flex-col lg:flex-row gap-y-4 lg:gap-y-0"
                  >
                    <div>
                      <h4 className="text-neutral-13 mb-2 text-lg font-medium">
                        {report.title}
                      </h4>
                      <div className="flex items-center text-base text-neutral-8 gap-3">
                        <p className="flex items-baseline gap-3">
                          <time dateTime={report.date}>
                            {report.displayDate}
                          </time>
                          <span>.</span>
                          <span>{report.size}</span>
                          <span>.</span>
                        </p>
                        <FileText size={16} aria-label="PDF Document" />
                      </div>
                    </div>
                    <div className="flex lg:items-center gap-8 w-full lg:w-fit">
                      <a
                        href={report.viewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-base font-medium"
                      >
                        <Eye size={16} /> View
                      </a>
                      <a
                        href={report.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-base font-medium"
                      >
                        <Download size={16} /> Download
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-neutral-8 py-20">
            No reports found matching your criteria.
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
              >
                <ChevronsLeft size={16} />
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                <ChevronLeft size={16} />
              </button>
            </li>
            <li className="font-medium">{`Page ${currentPage} of ${totalPages}`}</li>
            <li>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                <ChevronRight size={16} />
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                <ChevronsRight size={16} />
              </button>
            </li>
          </ul>
          <p className="text-neutral-10 text-sm lg:hidden">
            {`${(currentPage - 1) * ITEMS_PER_PAGE + 1}-${Math.min(
              currentPage * ITEMS_PER_PAGE,
              totalItems
            )} of ${totalItems} items`}
          </p>
        </nav>
      )}
    </section>
  );
}
