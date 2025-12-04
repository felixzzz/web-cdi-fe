import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { clsx } from "clsx";
import { useTranslations } from "next-intl";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage = 6,
  onPageChange,
}) => {
  const t = useTranslations("pagination")
  const [jumpPage, setJumpPage] = useState<string>("");

  const ITEMS_PER_PAGE = itemsPerPage;

  const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

  const handleJumpPage = () => {
    const pageNumber = parseInt(jumpPage);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
      setJumpPage("");
    }
  };

  const btnBaseClass =
    "text-[12px] rounded-md flex items-center justify-center min-w-[32px] h-[32px] border transition-all duration-200 text-white";

  const btnActive = "bg-[#2474A5] text-white border-[#2474A5]";

  const btnDefault =
    "text-neutral-13 border-neutral-700 hover:bg-[#2474A5] text-white hover:border-[#2474A5]";

  const btnDisabled = "!cursor-not-allowed text-neutral-4 border-gray-800";

  return (
    <section className="mt-5 py-10 flex w-full justify-center md:justify-between items-center gap-4 flex-col md:flex-row">
      <p className="text-neutral-50 text-sm max-md:hidden">
        {startItem}-{endItem} {t('of')} {totalItems} {t('items')}
      </p>

      <ul className="flex items-center justify-center gap-2 flex-wrap">
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
            <ChevronsLeft className="text-white" size={16} />
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
            <ChevronRight className="text-white" size={16} />
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
            <ChevronsRight className="text-white" size={16} />
          </button>
        </li>
      </ul>

      <div className="flex items-center gap-4 justify-center md:justify-between w-full md:w-auto">
        <p className="text-neutral-50 text-sm md:hidden">
          {startItem}-{endItem} {t('of')} {totalItems} {t('items')}
        </p>

        <div className="flex items-center gap-4">
          <p className="text-neutral-50 text-sm whitespace-nowrap">{t('jumpToPage')}</p>
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
};
