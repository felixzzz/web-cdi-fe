import React from "react";
import { TableInvestorSection } from "@/types/Investor/Report";
import { useTranslations } from "next-intl";

interface FinancialTableProps {
  data: TableInvestorSection;
}

export function FinancialTable({ data }: FinancialTableProps) {
  const t = useTranslations('Investor.Report')
  const headers = data.content_table_trans?.headers || [];
  const tableRows = data.content_table_trans?.tableData || [];
  const note = data.title;
  const footnotes = data.content;
  let dataRowIndex = 1;
  const columnCount = headers.length;

  return (
    <section
    // data-navbar-theme="dark"
      aria-labelledby="financial-data-heading"
      className="container mx-auto py-[1rem] px-4 md:px-10 lg:px-20 xl:px-44 2xl:px-48"
    >
      {note && (
        <p
          id="financial-data-heading"
          className="text-end text-red-600 text-sm mb-2"
        >
          {note}
        </p>
      )}

      <div
      data-navbar-theme="dark"
      className="table-main overflow-x-auto border border-neutral-500">
        <table className="w-full border-collapse">
          <caption className="sr-only">{t('financial_title')}</caption>

          <thead className="bg-[#2474A5] text-white">
            <tr className="border-b border-neutral-500">
              {headers.map((header) => (
                <th
                  scope="col"
                  key={header.text}
                  className={`font-medium py-4 px-6 ${
                    header.text.toLowerCase() === "explanation"
                      ? "text-left"
                      : "text-right border-l border-neutral-300"
                  }`}
                >
                  {header.text}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white">
            {tableRows.map((row, rowIndex) => {
              if (
                !Array.isArray(row) &&
                row.label &&
                typeof row.label === "object"
              ) {
                dataRowIndex = 1;

                return (
                  <tr key={rowIndex} className="border-b border-neutral-500">
                    <th
                      scope="colgroup"
                      colSpan={columnCount}
                      className="group text-neutral-800 font-bold text-left py-4 px-6 italic"
                    >
                      {row.label.text}
                    </th>
                  </tr>
                );
              }

              if (Array.isArray(row)) {
                const isOdd = dataRowIndex % 2 !== 0;
                dataRowIndex++;

                return (
                  <tr
                    key={rowIndex}
                    className={`border-b border-neutral-500 ${
                      isOdd ? "bg-gray-50" : ""
                    }`}
                  >
                    {row.slice(0, columnCount).map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`py-4 px-6 text-neutral-900 ${
                          cellIndex === 0
                            ? "text-left font-normal"
                            : "text-right border-l border-neutral-400"
                        }`}
                      >
                        {cell.text}
                      </td>
                    ))}
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>

      {footnotes && (
        <div
        className="prose prose-invert prose-base text-[11px] md:text-[12px] leading-normal md:leading-[24px] text-justify font-extralight text-gray-900 py-1 space-y-2 mt-6"
          // className="text-[12px] leading-[24px] font-extralight text-gray-600 py-1 space-y-2 mt-6"
          dangerouslySetInnerHTML={{ __html: footnotes }}
        ></div>
      )}
    </section>
  );
}