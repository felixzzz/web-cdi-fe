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
import {
  SustainabilityReportItem,
  SustainabilityReportResponse,
} from "@/types/Investor/SustainabilityReport";
import { useTranslations } from "next-intl";

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

const flattenData = (data: CalendarApiResponse): CalendarEventItem[] => {
  return data.items.flatMap((yearGroup) => yearGroup.items);
};

interface FinancialCalendarProps {
  initialData: CalendarApiResponse;
  sustainabilityData: SustainabilityReportResponse;
  locale: string;
}

const SUSTAINABILITY_TYPE = "Sustainability Report";

export function FinancialCalendar({
  initialData,
  sustainabilityData,
  locale,
}: FinancialCalendarProps) {
  const t = useTranslations("Investor.Report");

  const FILE_PREVIEW_BASE_URL = `${process.env.NEXT_PUBLIC_URL}/file/preview/${locale}/report/`;
  const FILE_DOWNLOAD_BASE_URL = `${process.env.NEXT_PUBLIC_URL}/file/download/${locale}/report/`;

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

  const transformSustainabilityItem = (
    item: SustainabilityReportItem,
  ): Report => {
    const dateObj = new Date(item.created_at);
    const formattedDate = dateObj.toLocaleDateString(
      locale === "id" ? "id-ID" : "en-US",
      { day: "numeric", month: "short", year: "numeric" },
    );

    return {
      id: item.id,
      title: locale === "id" ? item.title_id : item.title_en,
      date: formattedDate,
      size: item.file?.size || "-",
      type: SUSTAINABILITY_TYPE,
      year: parseInt(item.release_year) || dateObj.getFullYear(),
      viewUrl: `${process.env.NEXT_PUBLIC_BASE_PATH || "https://chandradaya-investasi.com"}/file-storage/${item.file?.path}`,
      downloadUrl: `${process.env.NEXT_PUBLIC_BASE_PATH || "https://chandradaya-investasi.com"}/file-download/${item.file?.path}`,
    };
  };

  const [reportItems, setReportItems] = useState<Report[]>(
    flattenData(initialData).map(transformItem),
  );
  const [pagination, setPagination] = useState<PaginationMeta>(
    initialData.meta,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [activeYear, setActiveYear] = useState<string | number>("All Year");
  const [activeType, setActiveType] = useState<string>("All Type");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const yearFilters = useMemo(() => {
    const financialYears = flattenData(initialData).map((r) => r.year);
    const sustainabilityYears = sustainabilityData.items.map(
      (r) => parseInt(r.release_year) || new Date(r.created_at).getFullYear(),
    );

    const years = Array.from(
      new Set([...financialYears, ...sustainabilityYears]),
    );
    return ["All Year", ...years.sort((a, b) => b - a)];
  }, [initialData, sustainabilityData]);

  const typeFilters = useMemo(() => {
    const financialTypes = Array.from(
      new Set(flattenData(initialData).map((r) => formatReportType(r.type))),
    );
    return ["All Type", ...financialTypes.sort(), SUSTAINABILITY_TYPE];
  }, [initialData]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        if (activeType === SUSTAINABILITY_TYPE) {
          if (currentPage === 1 && activeYear === "All Year") {
            setReportItems(
              sustainabilityData.items.map(transformSustainabilityItem),
            );
            setPagination(sustainabilityData.meta);
            setIsLoading(false);
            return;
          }

          const apiYear = activeYear === "All Year" ? "" : activeYear;
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/sustainability/reports/report?page=${currentPage}${
              apiYear ? `&year=${apiYear}` : ""
            }`,
          );
          if (!res.ok) throw new Error("Failed to fetch sustainability data");
          const data: SustainabilityReportResponse = await res.json();

          setReportItems(data.items.map(transformSustainabilityItem));
          setPagination(data.meta);
        } else {
          if (
            currentPage === 1 &&
            activeYear === "All Year" &&
            activeType === "All Type"
          ) {
            setReportItems(flattenData(initialData).map(transformItem));
            setPagination(initialData.meta);
            setIsLoading(false);
            return;
          }

          const apiType = unformatReportType(activeType);
          const apiYear = activeYear === "All Year" ? "" : activeYear;

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/investor/calendar/list?page=${currentPage}&type=${apiType}&year=${apiYear}`,
          );
          if (!res.ok) throw new Error("Failed to fetch data");
          const data: CalendarApiResponse = await res.json();

          setReportItems(flattenData(data).map(transformItem));
          setPagination(data.meta);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [
    currentPage,
    activeYear,
    activeType,
    initialData,
    sustainabilityData,
    locale,
  ]);

  const displayedReports = useMemo(() => {
    return reportItems.filter((report) => {
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
      className="container mx-auto py-20"
      data-navbar-theme="dark"
      aria-labelledby="calendar-heading"
    >
      <h2
        id="calendar-heading"
        className="text-neutral-13 font-medium text-2xl lg:text-[38px] lg:leading-[44px] mb-3"
      >
        {t("calendar_title")}
      </h2>

      <div className="flex items-center gap-2 rounded-sm bg-[#ECF8FF] border border-light-blue-2 text-[#2474A5] text-xs w-fit p-[6px]">
        <Languages size={16} />
        <span className="text-sm lg:text-base leading-normal lg:leading-[24px] text-justify">
          {t("calendar_subtitle")}
        </span>
      </div>

      <nav
        aria-label="Filter by year"
        className="gap-10 flex items-center overflow-y-auto mt-10 border-b-2 border-b-neutral-6 scrollbar-hide"
      >
        {yearFilters.map((year) => (
          <button
            key={year}
            onClick={() => handleYearClick(year)}
            className={clsx(
              "text-base font-normal text-neutral-900 py-3 border-b-2 border-b-transparent cursor-pointer whitespace-nowrap",
              activeYear === year && "!text-[#2474A5] !border-b-[#2474A5]",
            )}
          >
            {year}
          </button>
        ))}
      </nav>

      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 my-10">
        <nav
          aria-label="Filter by report type"
          className="flex items-center gap-3 flex-nowrap overflow-x-auto custom-scrollbar w-full xl:w-[calc(100%-320px)] pb-3"
        >
          {typeFilters.map((type) => (
            <button
              key={type}
              onClick={() => handleTypeClick(type)}
              className={clsx(
                "text-sm lg:text-base cursor-pointer px-8 py-2.5 rounded-full whitespace-nowrap flex-shrink-0 flex items-center gap-2 text-[#2474A5] border border-[#2474A5] hover:text-neutral-100 hover:bg-[#2474A5] transition-colors",
                activeType === type && "bg-[#2474A5] text-gray-100",
              )}
            >
              {type === SUSTAINABILITY_TYPE
                ? t("sustainability_report")
                : t(type)}
            </button>
          ))}
        </nav>

        <div className="flex items-center w-full xl:w-[300px] border border-neutral-7 rounded-full px-4 bg-transparent focus-within:ring-2 focus-within:ring-[#2474A5] transition-shadow flex-shrink-0">
          <Search size={18} className="text-neutral-7 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent py-2.5 pl-3 text-sm outline-none placeholder:text-neutral-7 text-neutral-13"
            placeholder={t("search")}
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
              key={`${report.type}-${report.id}`}
              className="py-8 border-b border-b-neutral-5 flex lg:items-center justify-between flex-col lg:flex-row gap-y-4 lg:gap-y-0"
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
                    title="icon"
                    src="/assets/icons/ic_filepdf.svg"
                    width={28}
                    height={20}
                    alt="See all icon"
                    className="inline-block"
                  />
                </div>
              </div>
              <div className="flex lg:items-center gap-8 w-full lg:w-fit">
                <a
                  href={report.viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#2474A5] font-medium hover:opacity-80 transition"
                >
                  <Image
                    title="icon"
                    src="/assets/icons/ic_eye.svg"
                    width={20}
                    height={20}
                    alt="See all icon"
                    className="inline-block"
                  />{" "}
                  {t("download_view")}
                </a>
                <a
                  href={report.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#2474A5] font-medium hover:opacity-80 transition"
                >
                  <Image
                    title="icon"
                    src="/assets/icons/ic_download_file.svg"
                    width={20}
                    height={20}
                    alt="Download icon"
                    className="inline-block"
                  />{" "}
                  {t("download_download")}
                </a>
              </div>
            </article>
          ))
        ) : (
          <p className="text-center text-neutral-8 py-10">{t("not_found")}</p>
        )}
      </section>

      {pagination.last_page > 1 && (
        <div className="mt-16">
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(pagination.current_page - 1)}
              disabled={pagination.current_page === 1 || isLoading}
              className="px-4 py-2 border rounded text-sm disabled:opacity-50 hover:bg-neutral-50 transition"
            >
              {t("previous")}
            </button>
            <span className="px-4 py-2 text-sm text-neutral-13">
              Page {pagination.current_page} of {pagination.last_page}
            </span>
            <button
              onClick={() => handlePageChange(pagination.current_page + 1)}
              disabled={
                pagination.current_page === pagination.last_page || isLoading
              }
              className="px-4 py-2 border rounded text-sm disabled:opacity-50 hover:bg-neutral-50 transition"
            >
              {t("next")}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
