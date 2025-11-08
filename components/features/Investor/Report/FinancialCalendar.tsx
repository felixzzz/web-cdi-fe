"use client";

import { useState, useMemo, useEffect } from "react";
import { clsx } from "clsx";
import { Languages, Search, Loader2 } from "lucide-react";
import Image from "next/image";
import {
  CalendarApiResponse,
  CalendarEventItem,
  PaginationMeta,
} from "@/types/Investor/Report";

interface Report {
  id: number;
  title: string;
  date: string;
  size: string;
  type: string;
  year: number;
  viewUrl: string;
  downloadUrl: string;
}

const formatReportType = (type: string): string => {
  return type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const unformatReportType = (type: string): string => {
  if (type === "All Type") return "";
  return type.toLowerCase().replace(" ", "_");
};

const FILE_PREVIEW_BASE_URL =
  "https://chandradaya-investasi.com/file/preview/default/report/";
const FILE_DOWNLOAD_BASE_URL =
  "https://chandradaya-investasi.com/file/download/default/report/";

const flattenData = (data: CalendarApiResponse): CalendarEventItem[] => {
  return data.items.flatMap((yearGroup) => yearGroup.items);
};

const transformItem = (item: CalendarEventItem): Report => ({
  id: item.id,
  title: item.name,
  date: item.date,
  size: item.file.size,
  type: formatReportType(item.type),
  year: item.year,
  viewUrl: `${FILE_PREVIEW_BASE_URL}${item.ulid}/${item.name_slug}`,
  downloadUrl: `${FILE_DOWNLOAD_BASE_URL}${item.ulid}/${item.name_slug}`,
});


interface FinancialCalendarProps {
  initialData: CalendarApiResponse;
}

export function FinancialCalendar({ initialData }: FinancialCalendarProps) {
  const [reportItems, setReportItems] = useState<CalendarEventItem[]>(
    flattenData(initialData)
  );
  const [pagination, setPagination] = useState<PaginationMeta>(
    initialData.meta
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [activeYear, setActiveYear] = useState<string | number>("All Year");
  const [activeType, setActiveType] = useState<string>("All Type");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const allItemsForFilters = useMemo(
    () => flattenData(initialData),
    [initialData]
  );
  const yearFilters = useMemo(() => {
    const years = Array.from(new Set(allItemsForFilters.map((r) => r.year)));
    return ["All Year", ...years.sort((a, b) => b - a)];
  }, [allItemsForFilters]);

  const typeFilters = useMemo(() => {
    const types = Array.from(
      new Set(allItemsForFilters.map((r) => formatReportType(r.type)))
    );
    return ["All Type", ...types.sort()];
  }, [allItemsForFilters]);

  useEffect(() => {
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

  const displayedReports = useMemo(() => {
    return reportItems.map(transformItem).filter((report) => {
      return report.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [reportItems, searchQuery]);

  const handleYearClick = (year: string | number) => {
    setActiveYear(year);
    setCurrentPage(1); 
  };

  const handleTypeClick = (type: string) => {
    setActiveType(type);
    setCurrentPage(1); 
  };

  const handlePageChange = (page: number) => {
    if (page === currentPage || isLoading) return;
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <section
      aria-labelledby="calendar-heading"
      className="container mx-auto py-20 px-4 md:px-8 lg:px-20 2xl:px-44"
    >
      <h2
        id="calendar-heading"
        className="text-neutral-13 font-medium text-2xl md:text-[38px] md:leading-[44px] mb-3"
      >
        Financial Calendar
      </h2>

      <div className="flex items-center gap-2 rounded-sm bg-[#ECF8FF] border border-light-blue-2 text-[#2474A5] text-xs w-fit p-[6px]">
        <Languages size={16} />
        <span>
          Documents are available in both English and Bahasa Indonesia. Change
          the website language to view them in another language.
        </span>
      </div>

      <nav
        aria-label="Filter by year"
        className="gap-10 flex items-center overflow-y-auto mt-10 border-b-2 border-b-neutral-6"
      >
        {yearFilters.map((year) => (
          <button
            key={year}
            onClick={() => handleYearClick(year)}
            className={clsx(
              "text-base font-normal text-neutral-900 py-3 border-b-2 border-b-transparent cursor-pointer whitespace-nowrap",
              activeYear === year && "!text-[#2474A5] !border-b-[#2474A5]"
            )}
          >
            {year}
          </button>
        ))}
      </nav>

      <div className="grid md:grid-cols-2 gap-4 my-10">
        <nav
          aria-label="Filter by report type"
          className="flex items-center gap-2 flex-wrap"
        >
          {typeFilters.map((type) => (
            <button
              key={type}
              onClick={() => handleTypeClick(type)}
              className={clsx(
                "text-xs md:text-base cursor-pointer px-6 py-2 rounded-full whitespace-nowrap flex items-center gap-2 text-[#2474A5] border border-[#2474A5] hover:text-neutral-100 hover:bg-[#2474A5]  transition",
                activeType === type && "bg-[#2474A5] text-gray-100"
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
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-neutral-7 px-10 py-2 placeholder:text-neutral-7 text-sm outline-none text-neutral-13 focus:ring-2 focus:ring-[#2474A5]"
            placeholder="Search anything..."
          />
        </div>
      </div>

      <section aria-label="Financial reports list" className="min-h-[300px]">
        {isLoading ? (
          <div className="flex justify-center items-center h-full min-h-[300px]">
            <Loader2 className="animate-spin text-[#2474A5]" size={48} />
          </div>
        ) : displayedReports.length > 0 ? (
          displayedReports.map((report) => (
            <article
              key={report.id}
              className="py-8 border-b border-b-neutral-5 flex md:items-center justify-between flex-col md:flex-row gap-y-4 md:gap-y-0"
            >
              <div>
                <h3 className="text-neutral-13 mb-2 text-lg font-medium">
                  {report.title}
                </h3>
                <div className="flex items-center text-base text-neutral-8 gap-3">
                  <p className="flex items-baseline gap-3">
                    <time dateTime={report.date}>{report.date}</time>
                    <span>.</span>
                    <span>{report.size}</span>
                    <span>.</span>
                  </p>
                  <Image
                    src="https://chandradaya-investasi.com/assets/frontend/icons/ic_filepdf.svg"
                    width={28}
                    height={20}
                    alt="See all icon"
                    className="inline-block"
                  />
                </div>
              </div>
              <div className="flex md:items-center gap-8 w-full md:w-fit">
                <a
                  href={report.viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#2474A5] font-medium"
                >
                  <Image
                    src="https://chandradaya-investasi.com/assets/frontend/icons/ic_eye.svg"
                    width={20}
                    height={20}
                    alt="See all icon"
                    className="inline-block"
                  />{" "}
                  View
                </a>
                <a
                  href={report.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#2474A5] font-medium"
                >
                  <Image
                    src="https://chandradaya-investasi.com/assets/frontend/icons/ic_download_file.svg"
                    width={20}
                    height={20}
                    alt="Download icon"
                    className="inline-block"
                  />{" "}
                  Download
                </a>
              </div>
            </article>
          ))
        ) : (
          <p className="text-center text-neutral-8 py-10">
            No reports found matching your criteria.
          </p>
        )}
      </section>

      {pagination.last_page > 1 && (
        <div className="mt-16">
          <div className="flex justify-center gap-2">
            <button
              onClick={() => handlePageChange(pagination.current_page - 1)}
              disabled={pagination.current_page === 1 || isLoading}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {pagination.current_page} of {pagination.last_page}
            </span>
            <button
              onClick={() => handlePageChange(pagination.current_page + 1)}
              disabled={
                pagination.current_page === pagination.last_page || isLoading
              }
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
}