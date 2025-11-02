"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { Languages, Search } from "lucide-react";
import Image from "next/image";

const allReportsData = [
  {
    id: 1,
    title: "Audited Financial Report - 30 Jun 2025",
    date: "15 September 2025",
    size: "2.1 MB",
    type: "Financial Report",
    year: 2025,
    viewUrl:
      "https://chandradaya-investasi.com/file/preview/default/report/01k56e7f91xf14e4yx40emaaax/Audited_Financial_Report_30_Jun_2025",
    downloadUrl:
      "https://chandradaya-investasi.com/file/download/default/report/01k56e7f91xf14e4yx40emaaax/Audited_Financial_Report_30_Jun_2025",
  },
  {
    id: 2,
    title: "Audited Report 2024",
    date: "14 April 2025",
    size: "3.59 MB",
    type: "Annual Report",
    year: 2024,
    viewUrl:
      "https://chandradaya-investasi.com/file/preview/default/report/01js16gw15g0kvyev54ybab55t/Audited_Report_2024",
    downloadUrl:
      "https://chandradaya-investasi.com/file/download/default/report/01js16gw15g0kvyev54ybab55t/Audited_Report_2024",
  },
];

const yearFilters = ["All Year", 2025, 2024];
const typeFilters = ["All Type", "Annual Report", "Financial Report"];

export function FinancialCalendar() {
  const [activeYear, setActiveYear] = useState<string | number>("All Year");
  const [activeType, setActiveType] = useState<string>("All Type");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReports = allReportsData.filter((report) => {
    const yearMatch = activeYear === "All Year" || report.year === activeYear;
    const typeMatch = activeType === "All Type" || report.type === activeType;
    const searchMatch = report.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return yearMatch && typeMatch && searchMatch;
  });

  return (
    <section
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
            onClick={() => setActiveYear(year)}
            className={clsx(
              "text-base font-normal text-neutral-900 py-3 border-b-2 border-b-transparent cursor-pointer whitespace-nowrap",
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
              onClick={() => setActiveType(type)}
              className={clsx(
                "text-xs lg:text-base cursor-pointer px-6 py-2 rounded-full whitespace-nowrap flex items-center gap-2 text-[#2474A5] border border-[#2474A5] hover:bg-[#2474A5]  transition",
                activeType === type && "bg-[#2474A5] text-gray-100"
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
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-neutral-7 px-10 py-2 placeholder:text-neutral-7 text-sm outline-none text-neutral-13 focus:ring-2 focus:ring-[#2474A5]"
            placeholder="Search anything..."
          />
        </div>
      </div>

      <section aria-label="Financial reports list">
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <article
              key={report.id}
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
                                  src="https://chandradaya-investasi.com/assets/frontend/icons/ic_filepdf.svg"
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
                  className="flex items-center gap-2 text-[#2474A5] font-medium"
                >
                  <Image
                                  src="https://chandradaya-investasi.com/assets/frontend/icons/ic_eye.svg"
                                  width={20}
                                  height={20}
                                  alt="See all icon"
                                  className="inline-block"
                                /> View
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
                                /> Download
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
    </section>
  );
}
