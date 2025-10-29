import React from "react";
import { TableInvestorSection } from "@/types/Investor/Report"; // 1. Import the type

// 2. Define the props interface
interface FinancialTableProps {
  data: TableInvestorSection;
}

export function FinancialTable({ data }: FinancialTableProps) {
  // 3. Get headers, rows, note, and footnotes from props
  const headers = data.content_table_trans?.headers || [];
  const tableRows = data.content_table_trans?.tableData || [];
  const note = data.title;
  const footnotes = data.content;

  return (
    <section
      aria-labelledby="financial-data-heading"
      className="container mx-auto py-[1rem] px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]"
    >
      {/* 4. Use dynamic note */}
      {note && (
        <p
          id="financial-data-heading"
          className="text-end text-red-6 text-sm mb-2"
        >
          {note}
        </p>
      )}

      <div className="table-main overflow-x-auto rounded-lg border border-neutral-700">
        <table className="w-full">
          <caption className="sr-only">Financial Data Table</caption>

          <thead className="bg-[#2474A5] text-white"> 
            <tr className="border-b border-neutral-700">
              <th></th>
              <th></th>
              <th></th>
              {headers.map((header) => (
                <th
                  scope="col"
                  key={header.text}
                  className={`font-medium py-4 px-6 ${
                    header.text.toLowerCase() === "explanation"
                      ? "text-left"
                      : "text-right"
                  }`}
                >
                  {header.text}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-white">
            {/* 6. Render dynamic table rows */}
            {tableRows.map((row, rowIndex) => {
              // Check if the row is a group header (object with 'label')
              if (
                !Array.isArray(row) &&
                row.label &&
                typeof row.label === "object"
              ) {
                return (
                  <tr key={rowIndex} className="border-b border-neutral-700">
                    <th
                      scope="colgroup"
                      colSpan={headers.length}
                      className="group text-neutral-800 font-bold text-left py-4 px-6"
                    >
                      {row.label.text}
                    </th>
                  </tr>
                );
              }

              // Otherwise, it's a data row (array of cells)
              if (Array.isArray(row)) {
                return (
                  <tr key={rowIndex} className="border-b border-neutral-700">
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`py-4 px-6 text-neutral-900 ${
                          cellIndex === 0 ? "text-left font-normal" : "text-right"
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

      {/* 7. Render dynamic footnotes */}
      {footnotes && (
        <div
          className="content mt-10 !text-neutral-950 primary"
          dangerouslySetInnerHTML={{ __html: footnotes }}
        ></div>
      )}
    </section>
  );
}