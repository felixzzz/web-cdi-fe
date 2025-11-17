import React from "react";

interface TransTableHeader {
  text: string;
}

interface TransTableDataCell {
  text: string | null;
  sub_text: string | null;
  is_group: boolean;
  label: { text: string };
}

type TransTableData = TransTableDataCell[][];

interface CorporateStructureTableProps {
  title: string | null;
  headers: TransTableHeader[] | null;
  tableData: TransTableData | null;
}

export const CorporateStructureTable: React.FC<
  CorporateStructureTableProps
> = ({ title, headers, tableData }) => {
  return (
    <>
      <h3 className="text-2xl lg:text-[28px] font-medium text-neutral-900 mb-6 mt-16">
        {title || "List of Subsidiaries & Associate Companies"}
      </h3>

<div className="table-main w-full overflow-x-auto">
      {/* <div className="table-main overflow-hidden"> */}
        <table className="w-full text-left">
          <thead className="bg-[#2474A5] text-white border">
            <tr>
              {headers?.map((header) => (
                <th
                  key={header.text}
                  className="py-4 px-6 font-semibold text-left border"
                >
                  {header.text}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white">
            {tableData?.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                className="even:bg-gray-100"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="py-4 px-6 align-top text-neutral-900 border"
                  >
                    {cell.text}
                    {cell.sub_text && (
                      <>
                        <br />
                        <span className="text-neutral-900 font-light text-sm">
                          {cell.sub_text}
                        </span>
                      </>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
