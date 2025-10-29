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
      <h3 className="text-2xl lg:text-[28px] font-medium text-neutral-13 mb-6 mt-16">
        {title || "List of Subsidiaries & Associate Companies"}
      </h3>
      <div className="table-main">
        <table>
          <thead>
            <tr>
              {headers?.map((header) => (
                <td key={header.text}>{header.text}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>
                    {cell.text}
                    {cell.sub_text && (
                      <>
                        <br />
                        <span className="text-neutral-8 font-light">
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