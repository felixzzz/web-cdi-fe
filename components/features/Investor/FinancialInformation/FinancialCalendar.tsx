"use client";

import { useState, useMemo, useEffect } from "react";
import { clsx } from "clsx";
import {
  Languages,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Loader2, // Import loader icon
} from "lucide-react";
import Image from "next/image";
import {
  CalendarApiResponse,
  CalendarEventItem,
  PaginationMeta,
} from "@/types/Investor/Financial"; // Corrected import path
import Link from "next/link";
import { useTranslations } from "next-intl";

// --- Helper Types & Functions ---

interface Report {
  id: number;
  title: string;
  date: string;
  displayDate: string;
  size: string;
  type: string;
  year: number;
  viewUrl: string;
  downloadUrl: string;
}

// Formats "financial_report" to "Financial Report"
const formatReportType = (type: string): string => {
  return type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Converts "Financial Report" back to "financial_report"
const unformatReportType = (type: string): string => {
  if (type === "All Type") return "";
  return type.toLowerCase().replace(" ", "_");
};

const FILE_PREVIEW_BASE_URL =
  "https://chandradaya-investasi.com/file/preview/default/report/";
const FILE_DOWNLOAD_BASE_URL =
  "https://chandradaya-investasi.com/file/download/default/report/";

// Flattens the API's year-grouped items into a single array
const flattenData = (data: CalendarApiResponse): CalendarEventItem[] => {
  return data.items.flatMap((yearGroup) => yearGroup.items);
};

// Transforms a single API item into the 'Report' shape
const transformItem = (item: CalendarEventItem): Report => ({
  id: item.id,
  title: item.name,
  date: item.datetime, // Use datetime for sorting
  displayDate: item.date, // Use date for display
  size: item.file.size,
  type: formatReportType(item.type),
  year: item.year,
  viewUrl: `${FILE_PREVIEW_BASE_URL}${item.ulid}/${item.name_slug}`,
  downloadUrl: `${FILE_DOWNLOAD_BASE_URL}${item.ulid}/${item.name_slug}`,
});

const typeFilters = ["All Type", "Annual Report", "Financial Report"];

interface FinancialCalendarProps {
  initialData: CalendarApiResponse;
}

export function FinancialCalendar({ initialData }: FinancialCalendarProps) {
  const t = useTranslations('Investor.Financial')
  // State for raw API items, pagination, filters, and loading
  const [reportItems, setReportItems] = useState<CalendarEventItem[]>(
    flattenData(initialData)
  );
  const [pagination, setPagination] = useState<PaginationMeta>(
    initialData.meta
  );
  const [activeYear, setActiveYear] = useState<string | number>("All Year");
  const [activeType, setActiveType] = useState<string>("All Type");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // --- Dynamic Year Filters ---
  const yearFilters = useMemo(() => {
    // Use the first page of data to build the initial year list
    const years = Array.from(
      new Set(flattenData(initialData).map((r) => r.year))
    );
    return ["All Year", ...years.sort((a, b) => b - a)];
  }, [initialData]);

  // --- Data Fetching Effect ---
  // Runs when page, year, or type changes
  useEffect(() => {
    // Don't refetch on the initial render
    if (
      currentPage === 1 &&
      activeYear === "All Year" &&
      activeType === "All Type"
    ) {
      setReportItems(flattenData(initialData));
      setPagination(initialData.meta);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      const apiType = unformatReportType(activeType);
      const apiYear = activeYear === "All Year" ? "" : activeYear;

      try {
        const res = await fetch(
          `https://chandradaya-investasi.com/api/investor/calendar/list?page=${currentPage}&type=${apiType}&year=${apiYear}`
        );
        if (!res.ok) throw new Error("Failed to fetch data");
        const data: CalendarApiResponse = await res.json();

        setReportItems(flattenData(data));
        setPagination(data.meta);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage, activeYear, activeType, initialData]);

  // --- Client-side Search & Grouping (Memoized) ---
  const { paginatedAndGroupedReports, totalItems } = useMemo(() => {
    const transformed = reportItems.map(transformItem);

    const filtered = transformed.filter((report) =>
      report.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const grouped = filtered.reduce((acc, report) => {
      const year = report.year;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(report);
      return acc;
    }, {} as Record<number, Report[]>);

    return {
      paginatedAndGroupedReports: grouped,
      totalItems: pagination.total,
    };
  }, [reportItems, searchQuery, pagination.total]);

  const reportKeys = Object.keys(paginatedAndGroupedReports).sort(
    (a, b) => Number(b) - Number(a)
  );

  return (
    <section
      id="content-media-section"
      aria-labelledby="calendar-heading"
      className="container mx-auto py-20 px-4 md:px-8 lg:px-20 2xl:px-44"
    >
      <h2
        id="calendar-heading"
        className="text-neutral-800 font-medium text-2xl md:text-[38px] md:leading-[44px] mb-3"
      >
        {t('title')}
      </h2>
      <div className="flex items-center gap-2 rounded-sm bg-[#ECF8FF] border border-light-blue-2 text-[#2474A5] text-xs w-fit p-[6px]">
        <Languages size={16} />
        <span>
        {t('subtitle')}
        </span>
      </div>
      <nav
        aria-label="Filter by year"
        className="gap-10 flex items-center overflow-y-auto mt-10 border-b-2 border-b-gray-300"
      >
        {yearFilters.map((year) => (
          <button
            key={year}
            onClick={() => {
              setActiveYear(year);
              setCurrentPage(1);
            }}
            className={clsx(
              "text-base font-normal text-neutral-800 py-3 border-b-2 border-b-transparent cursor-pointer whitespace-nowrap",
              activeYear === year && "!text-[#2474A5] !border-b-[#2474A5]"
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
                "text-xs lg:text-base cursor-pointer px-6 py-2 rounded-full whitespace-nowrap flex items-center gap-2 text-[#2474A5] border border-blue-base hover:bg-blue-base transition",
                activeType === type && "bg-[#2474A5] text-white"
              )}
            >
              {type}
            </button>
          ))}
        </nav>
        <div className="relative w-full md:w-[264px] md:ms-auto">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-7">
            <Search size={16} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="w-full rounded-full border border-neutral-7 px-10 py-2 placeholder:text-neutral-7 text-sm outline-none text-neutral-13 focus:ring-2 focus:ring-blue-base"
            placeholder={t('search')}
          />
        </div>
      </div>

      <section aria-label="Financial reports list" className="min-h-[400px]">
        {isLoading ? (
          <div className="flex justify-center items-center h-full min-h-[400px]">
            <Loader2 className="animate-spin text-[#2474A5]" size={48} />
          </div>
        ) : reportKeys.length > 0 ? (
          reportKeys.map((year) => (
            <div key={year} className="flex md:gap-6 flex-col md:flex-row mt-5">
              <h3 className="text-[#2474A5] font-medium text-[48px] w-full md:w-auto">
                {year}
              </h3>
              <div className="w-full">
                {paginatedAndGroupedReports[Number(year)].map((report) => (
                  <article
                    key={report.id}
                    className="py-8 border-b border-b-neutral-5 flex items-center justify-start flex-col gap-y-4 md:gap-y-0"
                  >
                    <div className="flex w-full">
                      <h4 className="text-neutral-13 mb-2 text-lg font-medium">
                        {report.title}
                      </h4>
                    </div>
                    <div className="flex flex-col md:flex-row justify-start md:justify-between w-full">
                      <div className="flex items-center justify-start text-base text-neutral-8 gap-3 w-full">
                        <p className="flex items-baseline gap-3">
                          <time dateTime={report.date}>
                            {report.displayDate}
                          </time>
                          <span>.</span>
                          <span>{report.size}</span>
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
                          href={report.viewUrl}
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
                          href={report.downloadUrl}
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
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-neutral-8 py-20">
            {t('not_found')}
          </p>
        )}
      </section>

      {pagination.last_page > 1 && (
        <nav
          aria-label="Pagination"
          className="mt-5 py-10 flex w-full justify-between items-center gap-4 flex-col md:flex-row"
        >
          <p className="text-neutral-10 text-sm max-lg:hidden">
            {`${pagination.from}-${pagination.to} of ${totalItems} items`}
          </p>
          <ul className="flex items-center justify-center gap-2">
            <li>
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1 || isLoading}
                className="pagination-btn"
              >
                <ChevronsLeft size={16} />
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1 || isLoading}
                className="pagination-btn"
              >
                <ChevronLeft size={16} />
              </button>
            </li>
            <li className="font-medium">{`Page ${currentPage} of ${pagination.last_page}`}</li>
            <li>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(pagination.last_page, p + 1))
                }
                disabled={currentPage === pagination.last_page || isLoading}
                className="pagination-btn"
              >
                <ChevronRight size={16} />
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage(pagination.last_page)}
                disabled={currentPage === pagination.last_page || isLoading}
                className="pagination-btn"
              >
                <ChevronsRight size={16} />
              </button>
            </li>
          </ul>
          <p className="text-neutral-10 text-sm lg:hidden">
            {`${pagination.from}-${pagination.to} of ${totalItems} items`}
          </p>
        </nav>
      )}
    </section>
  );
}
