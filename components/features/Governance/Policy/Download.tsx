"use client";

import React, { useState, useEffect } from "react";
import { clsx } from "clsx";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { DownloadApiResponse } from "@/types/Governances/Policy";

const navLinks = [
  {
    id: "policy",
    title: "Policy",
    href: "#",
  },
];

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  from: number;
  to: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  totalItems,
  from,
  to,
  onPageChange,
}: PaginationProps) {
  const [jumpPage, setJumpPage] = useState<string>("");

  useEffect(() => {
    setJumpPage("");
  }, [currentPage]);

  const handleJumpPage = () => {
    const pageNumber = parseInt(jumpPage);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  const btnBaseClass =
    "text-[12px] rounded-md flex items-center justify-center min-w-[32px] h-[32px] border transition-all duration-200";
  const btnActive = "bg-[#2474A5] text-white border-[#2474A5]";
  const btnDefault =
    "text-neutral-13 border-neutral-4 bg-white hover:bg-[#2474A5] hover:text-white hover:border-[#2474A5]";
  const btnDisabled =
    "!cursor-not-allowed text-neutral-4 border-neutral-4 bg-transparent";

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <section className="mt-5 py-10 flex w-full justify-center md:justify-between items-center gap-4 flex-col md:flex-row">
      <p className="text-neutral-10 text-sm max-md:hidden">
        {from}-{to} of {totalItems} items
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

        {pageNumbers.map((page) => {
          if (
            totalPages > 7 &&
            Math.abs(page - currentPage) > 2 &&
            page !== 1 &&
            page !== totalPages
          ) {
            if (page === currentPage - 3 || page === currentPage + 3)
              return (
                <li key={page} className="text-xs">
                  ...
                </li>
              );
            return null;
          }

          return (
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
          );
        })}

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
          {from}-{to} of {totalItems} items
        </p>

        <div className="flex items-center gap-4">
          <p className="text-neutral-10 text-sm whitespace-nowrap">Jump Page</p>
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
            Go
          </button>
        </div>
      </div>
    </section>
  );
}

interface DownloadsProps {
  locale: string;
  data: DownloadApiResponse;
}

export const DownloadsPolicy = ({ locale, data }: DownloadsProps) => {
  const t = useTranslations("Investor.Governance.PolicyPage");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const activeTab = "policy";

  const { items, meta } = data;

  const filteredItems = items.filter((item) => {
    const name = locale === "id" ? item.name_id : item.name_en;
    return name?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
      const timer = setTimeout(() => {
        window.dispatchEvent(new Event("finishProgressBar"));
      }, 100);
  
      return () => clearTimeout(timer);
    }, []);

  return (
    <section className="container mx-auto px-4 md:px-4 lg:px-20 xl:px-8 2xl:px-44 py-[5%] lg:py-[8%]">
      <div className="flex gap-1 text-neutral-10 items-center text-sm md:text-base">
        <Link className="text-blue-base hover:underline" href="/governance">
          Governance
        </Link>
        <ChevronRight className="text-lg w-4 h-4" />
        <span className="font-medium">{t('Policy')}</span>
      </div>

      <div className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <nav
            className="flex md:flex-col md:items-start w-full max-md:overflow-x-auto max-md:whitespace-nowrap"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                className={clsx(
                  "text-lg text-center p-4 transition md:w-full md:text-start",
                  activeTab === link.id
                    ? "text-neutral-13 font-medium md:border-b-2 border-b-2 md:border-b-neutral-100 border-b-[#2474A5]  md:border-l-4 md:border-l-[#2474A5]"
                    : "text-neutral-8 font-normal border-t-neutral-100 hover:text-neutral-13 md:border-b-[1px] md:border-b-neutral-100"
                )}
              >
                {link.title}
              </button>
            ))}
          </nav>

          <div className="md:col-span-4">
            <div className="grid lg:grid-cols-2 gap-2 pb-10 border-b border-b-neutral-5">
              <div>
                <p className="text-2xl lg:text-[28px] font-medium text-neutral-13">
                  Policy
                </p>
              </div>
              <div>
                <div className="w-full lg:w-[264px] rounded-full border border-neutral-7 px-4 py-2 flex items-center gap-2 lg:ms-auto focus-within:ring-1 focus-within:ring-blue-base">
                  <Search className="w-5 h-5 text-neutral-7" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full placeholder:text-neutral-7 text-sm outline-none text-neutral-13 bg-transparent"
                    placeholder="Search anything..."
                  />
                </div>
              </div>
            </div>

            <section aria-live="polite">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => {
                  const fileData =
                    locale === "id" ? item.file_id : item.file_en;
                  const fileSize =
                    fileData?.size ||
                    item.file_en?.size ||
                    item.file_id?.size ||
                    "-";
                  const displayName =
                    locale === "id" ? item.name_id : item.name_en;

                  // Construct dynamic links based on API data
                  const viewLink = `https://cdi-be.cmlabs.dev/file/preview/${item.type}/${item.unique_key}/${item.name_en}`;
                  const downloadEnLink = `https://cdi-be.cmlabs.dev/file/download/en/${item.type}/${item.unique_key}/`;
                  const downloadIdLink = `https://cdi-be.cmlabs.dev/file/download/id/${item.type}/${item.unique_key}/`;

                  const pdfIcon =
                    "https://cdi-be.cmlabs.dev/assets/frontend/icons/ic_filepdf.svg";
                  const viewIcon =
                    "https://cdi-be.cmlabs.dev/assets/frontend/icons/ic_eye.svg";
                  const downloadIcon =
                    "https://cdi-be.cmlabs.dev/assets/frontend/icons/ic_download_file.svg";

                  return (
                    <div
                      key={item.id}
                      className="py-8 border-b border-b-neutral-5 flex lg:items-center justify-between flex-col lg:flex-row gap-y-2 lg:gap-y-0"
                    >
                      <div>
                        <p className="text-neutral-13 mb-2 text-lg font-medium">
                          {displayName}
                        </p>
                        <div className="flex flex-col md:flex-row justify-between w-full">
                          <div className="flex items-center text-base text-neutral-8 gap-3">
                            <div className="flex items-baseline gap-3">
                              <time dateTime={item.date}>{item.date}</time>
                              <span>.</span>
                              <span>{fileSize}</span>
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
                        </div>
                      </div>

                      <div className="flex flex-row items-center gap-4 sm:gap-8 w-full md:w-fit mt-4 lg:mt-0">
                        <Link
                          href={viewLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-base font-medium hover:underline"
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
                          href={downloadEnLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-base font-medium hover:underline"
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
                          href={downloadIdLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-base font-medium hover:underline"
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
                  );
                })
              ) : (
                <p className="text-center text-neutral-8 py-16">{t("help")}</p>
              )}
            </section>

            {meta.last_page > 0 && (
              <Pagination
                currentPage={meta.current_page}
                totalPages={meta.last_page}
                totalItems={meta.total}
                from={meta.from}
                to={meta.to}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
