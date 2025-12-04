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
  Loader2,
} from "lucide-react";
import Image from "next/image";
import {
  CalendarApiResponse,
  CalendarEventItem,
  PaginationMeta,
} from "@/types/Investor/Financial";
import Link from "next/link";
import { useTranslations } from "next-intl";

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
  `${process.env.NEXT_PUBLIC_URL}/file/preview/default/report/`;
const FILE_DOWNLOAD_BASE_URL =
  `${process.env.NEXT_PUBLIC_URL}/file/download/default/report/`;

const flattenData = (data: CalendarApiResponse): CalendarEventItem[] => {
  return data.items.flatMap((yearGroup) => yearGroup.items);
};

const transformItem = (item: CalendarEventItem): Report => ({
  id: item.id,
  title: item.name,
  date: item.datetime,
  displayDate: item.date,
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
  const t = useTranslations("Investor.Financial");
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

  const yearFilters = useMemo(() => {
    const years = Array.from(
      new Set(flattenData(initialData).map((r) => r.year))
    );
    return ["All Year", ...years.sort((a, b) => b - a)];
  }, [initialData]);

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
          `${process.env.NEXT_PUBLIC_URL}/api/investor/calendar/list?page=${currentPage}&type=${apiType}&year=${apiYear}`
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

  const paginatedAndGroupedReports = useMemo(() => {
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

    return grouped;
  }, [reportItems, searchQuery]);

  const reportKeys = Object.keys(paginatedAndGroupedReports).sort(
    (a, b) => Number(b) - Number(a)
  );

  return (
    <section
      data-navbar-theme="dark"
      id="content-media-section"
      aria-labelledby="calendar-heading"
      className="container mx-auto py-20  "
    >
      <h2
        id="calendar-heading"
        className="text-neutral-800 font-medium text-2xl md:text-[38px] md:leading-[44px] mb-3"
      >
        {t("title")}
      </h2>
      <div className="flex items-center gap-2 rounded-sm bg-[#ECF8FF] border border-light-blue-2 text-[#2474A5] text-xs w-fit p-[6px]">
        <Languages size={16} />
        <span className="text-sm md:text-base leading-normal md:leading-[24px] text-justify">{t("subtitle")}</span>
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
              {t(type)}
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
            placeholder={t("search")}
          />
        </div>
      </div>

      <section aria-label="Financial reports list">
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
                          src="/assets/icons/ic_filepdf.svg"
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
                            src="/assets/icons/ic_eye.svg"
                            width={20}
                            height={20}
                            alt="See all icon"
                            className="inline-block"
                          />{" "}
                          {t("download_view")}
                        </Link>
                        <a
                          href={report.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-base font-medium"
                        >
                          <Image
                            src="/assets/icons/ic_download_file.svg"
                            width={20}
                            height={20}
                            alt="Download icon"
                            className="inline-block"
                          />{" "}
                          {t("download_download")}
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-neutral-8 py-20">{t("not_found")}</p>
        )}
      </section>

      {pagination.last_page > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={pagination.last_page}
          totalItems={pagination.total}
          itemsPerPage={pagination.per_page || 10}
          onPageChange={setCurrentPage}
        />
      )}
    </section>
  );
}

function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}) {
  const t = useTranslations('pagination')
  const [jumpPage, setJumpPage] = useState<string>("");

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handleJumpPage = () => {
    const pageNumber = parseInt(jumpPage);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
      setJumpPage("");
    }
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
        {startItem}-{endItem} {t('of')} {totalItems} {t('items')}
      </p>

      <ul className="flex items-center justify-center gap-2">
        <li>
          <button
            type="button"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className={clsx(
              btnBaseClass,
              currentPage === 1 ? btnDisabled : btnDefault
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
              currentPage === 1 ? btnDisabled : btnDefault
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
                currentPage === page ? btnActive : btnDefault
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
              currentPage === totalPages ? btnDisabled : btnDefault
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
              currentPage === totalPages ? btnDisabled : btnDefault
            )}
            aria-label="Last page"
          >
            <ChevronsRight size={16} />
          </button>
        </li>
      </ul>

      <div className="flex items-center gap-4 justify-center md:justify-between w-full md:w-auto">
        <p className="text-neutral-10 text-sm md:hidden">
          {startItem}-{endItem} {t('of')} {totalItems} {t('items')}
        </p>

        <div className="flex items-center gap-4">
          <p className="text-neutral-10 text-sm whitespace-nowrap">
            {t('jumpToPage')}
          </p>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={jumpPage}
            onChange={(e) => setJumpPage(e.target.value)}
            className="outline-none border border-neutral-5 w-10 h-7 rounded-sm text-center text-sm focus:border-[#2474A5]"
          />
          <button
            onClick={handleJumpPage}
            className="text-[#2474A5] text-xs font-bold cursor-pointer hover:underline"
          >
            {t('go')}
          </button>
        </div>
      </div>
    </section>
  );
}